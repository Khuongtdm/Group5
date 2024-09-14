export const classNames = (...classes: Array<any>) => classes.filter(Boolean).join(' ');
export const toPascalCase = (str: string) => (str.match(/[a-zA-Z0-9]+/g) || []).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join('');
