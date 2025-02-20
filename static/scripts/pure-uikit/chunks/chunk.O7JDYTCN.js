import {
  menu_label_styles_default
} from "./chunk.EESMAN23.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/menu-label/menu-label.component.ts
import { html } from "lit";
var PMenuLabel = class extends PureElement {
  render() {
    return html` <slot part="base" class="menu-label"></slot> `;
  }
};
PMenuLabel.styles = [component_styles_default, menu_label_styles_default];

export {
  PMenuLabel
};
