import {
  carousel_item_styles_default
} from "./chunk.NQ44LUGM.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/carousel-item/carousel-item.component.ts
import { html } from "lit";
var PCarouselItem = class extends PureElement {
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "group");
  }
  render() {
    return html` <slot></slot> `;
  }
};
PCarouselItem.styles = [component_styles_default, carousel_item_styles_default];

export {
  PCarouselItem
};
