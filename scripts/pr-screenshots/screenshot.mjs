// 選定ページをスマホ/PCの2ビューポートで撮影する
// usage: node screenshot.mjs <base-url> <out-dir> <path...>
// env: PW_EXECUTABLE_PATH でChromium実行ファイルを上書き可能(ローカル検証用)
import { chromium } from "playwright-core"
import { mkdirSync } from "node:fs"

const [baseUrl, outDir, ...paths] = process.argv.slice(2)
if (!baseUrl || !outDir || paths.length === 0) {
  console.error("usage: node screenshot.mjs <base-url> <out-dir> <path...>")
  process.exit(1)
}
mkdirSync(outDir, { recursive: true })

const VIEWPORTS = [
  { label: "mobile", width: 390, height: 844 },
  { label: "desktop", width: 1280, height: 900 },
]

const browser = await chromium.launch({
  executablePath: process.env.PW_EXECUTABLE_PATH || undefined,
})
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
  })
  for (const p of paths) {
    const name = p === "/" ? "top" : p.replace(/^\//, "").replace(/\//g, "_")
    await page.goto(baseUrl + p, { waitUntil: "networkidle" })
    await page.screenshot({ path: `${outDir}/${vp.label}-${name}.png` })
    console.log(`${vp.label}-${name}.png`)
  }
  await page.close()
}
await browser.close()
