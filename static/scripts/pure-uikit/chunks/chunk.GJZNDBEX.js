import {
  divider_styles_default
} from "./chunk.RAG4XXB3.js";
import {
  watch
} from "./chunk.2FB5TK5H.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/divider/divider.component.ts
import { property } from "lit/decorators.js";
var PDivider = class extends PureElement {
  constructor() {
    super(...arguments);
    this.vertical = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "separator");
  }
  handleVerticalChange() {
    this.setAttribute("aria-orientation", this.vertical ? "vertical" : "horizontal");
  }
};
PDivider.styles = [component_styles_default, divider_styles_default];
__decorateClass([
  property({ type: Boolean, reflect: true })
], PDivider.prototype, "vertical", 2);
__decorateClass([
  watch("vertical")
], PDivider.prototype, "handleVerticalChange", 1);

export {
  PDivider
};
