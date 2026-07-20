// custom typefaces
import "@fontsource-variable/montserrat"
// FontAwesome の CSS はデフォルトでは JS 実行時に注入されるため、
// 初回ペイント時にアイコンが巨大表示→縮小するチラつきが起きる。
// CSS をグローバルバンドルに含めて head に載せ、実行時注入は無効化する。
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

config.autoAddCss = false
