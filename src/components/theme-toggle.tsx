import * as React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons"

// アイコンの出し分けは CSS (html[data-theme]) で行い、SSR とのハイドレーション不整合を避ける
const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  background: var(--color-surface);
  color: var(--color-text);
  cursor: pointer;
  font-size: var(--fontSize-1);
  transition: color 0.15s ease, border-color 0.15s ease;

  &:hover {
    color: var(--color-accent-strong);
    border-color: var(--color-accent);
  }

  .icon-sun {
    display: none;
  }
  .icon-moon {
    display: inline-block;
  }
  html[data-theme="dark"] & {
    .icon-sun {
      display: inline-block;
    }
    .icon-moon {
      display: none;
    }
  }
`

const ThemeToggle = () => {
  const toggleTheme = () => {
    const root = document.documentElement
    const next = root.dataset.theme === "dark" ? "light" : "dark"
    root.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch (e) {}
  }

  return (
    <ToggleButton
      type="button"
      aria-label="ダークモード切り替え"
      onClick={toggleTheme}
    >
      <FontAwesomeIcon icon={faSun} className="icon-sun" />
      <FontAwesomeIcon icon={faMoon} className="icon-moon" />
    </ToggleButton>
  )
}

export default ThemeToggle
