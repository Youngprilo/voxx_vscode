import {
  card_styles_default
} from "./chunk.LN33NH3P.js";
import {
  HasSlotController
} from "./chunk.MLXUTV4G.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/card/card.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
var PCard = class extends PureElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "footer", "header", "image");
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      card: true,
      "card--has-footer": this.hasSlotController.test("footer"),
      "card--has-image": this.hasSlotController.test("image"),
      "card--has-header": this.hasSlotController.test("header")
    })}
      >
        <slot name="image" part="image" class="card__image"></slot>
        <slot name="header" part="header" class="card__header"></slot>
        <slot part="body" class="card__body"></slot>
        <slot name="footer" part="footer" class="card__footer"></slot>
      </div>
    `;
  }
};
PCard.styles = [component_styles_default, card_styles_default];

export {
  PCard
};
