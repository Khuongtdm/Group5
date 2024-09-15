// src-tauri/src/main.rs

use directories::ProjectDirs;
use rusqlite::{Connection, Result as SqlResult};
use serde::{Deserialize, Serialize};
use std::fs;
use std::path::PathBuf;
use tauri::Manager;

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Subscription {
    id: Option<u32>,
    name: String,
    amount: f64,
    frequency: String,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
struct Transaction {
    id: Option<u32>,
    description: String,
    amount: f64,
    date: String,
    category: String,
}

fn get_db_path() -> PathBuf {
    let proj_dirs = ProjectDirs::from("com", "YourCompany", "FinanceTracker").expect("Failed to get project directories");
    let data_dir = proj_dirs.data_dir();
    fs::create_dir_all(data_dir).expect("Failed to create data directory");
    data_dir.join("finance_tracker.db")
}

fn init_db() -> SqlResult<Connection> {
    let conn = Connection::open(get_db_path())?;
    conn.execute(
        "CREATE TABLE IF NOT EXISTS subscriptions (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            amount REAL NOT NULL,
            frequency TEXT NOT NULL,
            order_index INTEGER NOT NULL DEFAULT 0
        )",
        [],
    )?;

    let columns: Vec<String> = conn.prepare("PRAGMA table_info(subscriptions)")?.query_map([], |row| row.get(1))?.collect::<Result<Vec<String>, _>>()?;

    if !columns.contains(&"order_index".to_string()) {
        conn.execute("ALTER TABLE subscriptions ADD COLUMN order_index INTEGER NOT NULL DEFAULT 0", [])?;

        conn.execute(
            "UPDATE subscriptions SET order_index = (
                SELECT COUNT(*) FROM subscriptions s2 
                WHERE s2.id <= subscriptions.id
            ) - 1",
            [],
        )?;
    }

    Ok(conn)
}

#[tauri::command]
fn add_subscription(subscription: Subscription) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    conn.execute(
        "INSERT INTO subscriptions (name, amount, frequency) VALUES (?1, ?2, ?3)",
        &[&subscription.name, &subscription.amount.to_string(), &subscription.frequency],
    )
    .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn delete_subscription(id: u32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    conn.execute("DELETE FROM subscriptions WHERE id = ?1", &[&id]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn update_subscription_order(id: u32, new_order: u32) -> Result<(), String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    conn.execute("UPDATE subscriptions SET order_index = ?1 WHERE id = ?2", &[&new_order, &id]).map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
fn get_subscriptions() -> Result<Vec<Subscription>, String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT id, name, amount, frequency FROM subscriptions").map_err(|e| e.to_string())?;
    let subs = stmt
        .query_map([], |row| {
            Ok(Subscription {
                id: Some(row.get(0)?),
                name: row.get(1)?,
                amount: row.get(2)?,
                frequency: row.get(3)?,
            })
        })
        .map_err(|e| e.to_string())?;

    subs.collect::<SqlResult<Vec<Subscription>>>().map_err(|e| e.to_string())
}

#[tauri::command]
fn calculate_average_cost() -> Result<f64, String> {
    let conn = init_db().map_err(|e| e.to_string())?;
    let mut stmt = conn.prepare("SELECT amount, frequency FROM subscriptions").map_err(|e| e.to_string())?;
    let subs = stmt.query_map([], |row| Ok((row.get::<_, f64>(0)?, row.get::<_, String>(1)?))).map_err(|e| e.to_string())?;

    let mut total_monthly = 0.0;
    for sub in subs {
        let (amount, frequency) = sub.map_err(|e| e.to_string())?;
        total_monthly += match frequency.to_lowercase().as_str() {
            "monthly" => amount,
            "yearly" => amount / 12.0,
            "weekly" => amount * 4.0,
            _ => amount,
        };
    }

    Ok(total_monthly)
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            #[cfg(target_os = "macos")]
            {
                use window_vibrancy::{apply_vibrancy, NSVisualEffectMaterial};
                apply_vibrancy(&window, NSVisualEffectMaterial::HudWindow, None, None).expect("Unsupported platform! 'apply_vibrancy' is only supported on macOS");
            }

            #[cfg(target_os = "windows")]
            {
                use window_shadows::set_shadow;
                use window_vibrancy::apply_blur;

                set_shadow(&window, true).expect("Unsupported platform!");
                apply_blur(&window, Some((18, 18, 18, 125))).expect("Unsupported platform! 'apply_blur' is only supported on Windows");
                window.set_decorations(true).unwrap();
            }

            window.set_content_protected(true).unwrap();
            window.set_ignore_cursor_events(false).unwrap();

            #[cfg(debug_assertions)]
            {
                window.open_devtools();
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            add_subscription,
            get_subscriptions,
            calculate_average_cost,
            delete_subscription,
            update_subscription_order
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
