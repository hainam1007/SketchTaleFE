import lighthouse from 'lighthouse'
import { launch } from 'chrome-launcher'
import { chromium } from '@playwright/test'
import { writeFile, mkdir } from 'node:fs/promises'

await mkdir('artifacts', { recursive: true })
const chrome = await launch({ chromeFlags: ['--headless', '--no-sandbox', '--disable-extensions', '--no-proxy-server', '--proxy-bypass-list=*'], chromePath: process.env.CHROME_PATH || chromium.executablePath() })
try {
  const result = await lighthouse('http://127.0.0.1:4173', { port: chrome.port, output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'] })
  await writeFile('artifacts/lighthouse.html', result.report)
  const summary = {
    scores: Object.fromEntries(Object.entries(result.lhr.categories).map(([key, category]) => [key, category.score])),
    lcp: result.lhr.audits['largest-contentful-paint'].displayValue,
    cls: result.lhr.audits['cumulative-layout-shift'].displayValue,
    date: result.lhr.fetchTime,
    mode: 'Lighthouse mobile simulated throttling, local production preview',
  }
  await writeFile('artifacts/lighthouse-summary.json', JSON.stringify(summary, null, 2))
  console.log(JSON.stringify(summary))
} finally { await chrome.kill() }
