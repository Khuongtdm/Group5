import * as child from 'child_process';
import { version, dependencies } from './package.json';

const isCloudflare = process.env.CF_PAGES;
const commitHash = child.execSync('git rev-parse --short HEAD').toString().trim();

const BannerMessage = `
 * @license
 * Copyright (c) ${new Date().getFullYear()} MESA
 * All Rights Reserved.
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   https://opensource.org/license/mit/
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * version [${version}]
 * build [${process.env.NODE_ENV}]
 * hash [${commitHash}]${isCloudflare ? '\n* pages [' + process.env.CF_PAGES_COMMIT_SHA + ']\n' : '\n'}`;

const BannerMessageSmall = `
  * @license
  * Copyright (c) ${new Date().getFullYear()} theMackabu [theMackabu@gmail.com]
  * All Rights Reserved.
  *
  * version [${version}]
  * build [${process.env.NODE_ENV}]
  * hash [${commitHash}]${isCloudflare ? '\n* pages [' + process.env.CF_PAGES_COMMIT_SHA + ']\n' : '\n'}`;

const ReactConfig = {
  babel: {
    plugins: [
      'babel-plugin-macros',
      ['@emotion/babel-plugin-jsx-pragmatic', { export: 'jsx', import: '__cssprop', module: '@emotion/react' }],
      ['@babel/plugin-transform-react-jsx', { pragma: '__cssprop' }, 'twin.macro'],
    ],
  },
};

const HtmlConfig = {
  context: { copyright: BannerMessageSmall },
};

const RenderChunks = (deps: Record<string, string>) => {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (['react', 'react-router-dom', 'react-dom'].includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
};

export { HtmlConfig, BannerMessage, ReactConfig, RenderChunks };
export const helpers = { dependencies, commitHash, isCloudflare };
