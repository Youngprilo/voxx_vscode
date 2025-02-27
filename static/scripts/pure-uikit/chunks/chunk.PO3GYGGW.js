// src/components/menu/menu.styles.ts
import { css } from "lit";
var menu_styles_default = css`
  :host {
    display: block;
    position: relative;
    background: var(--p-panel-background-color);
    border: solid var(--p-panel-border-width) var(--p-panel-border-color);
    border-radius: var(--p-border-radius-large);
    padding: var(--p-spacing-x-small) 0;
    overflow: auto;
    overscroll-behavior: none;
  }

  ::slotted(p-divider) {
    --spacing: var(--p-spacing-x-small);
  }
`;

export {
  menu_styles_default
};
