import {
  visually_hidden_styles_default
} from "./chunk.YKKSQ2FG.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/visually-hidden/visually-hidden.component.ts
import { html } from "lit";
var PVisuallyHidden = class extends PureElement {
  render() {
    return html` <slot></slot> `;
  }
};
PVisuallyHidden.styles = [component_styles_default, visually_hidden_styles_default];

export {
  PVisuallyHidden
};
