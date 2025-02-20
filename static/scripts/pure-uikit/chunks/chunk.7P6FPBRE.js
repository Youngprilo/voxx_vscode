import {
  tag_styles_default
} from "./chunk.ZNHXAYQR.js";
import {
  PIconButton
} from "./chunk.DF5OOA4T.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/tag/tag.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property } from "lit/decorators.js";
var PTag = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.variant = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }
  handleRemoveClick() {
    this.emit("p-remove");
  }
  render() {
    return html`
      <span
        part="base"
        class=${classMap({
      tag: true,
      // Types
      "tag--primary": this.variant === "primary",
      "tag--success": this.variant === "success",
      "tag--neutral": this.variant === "neutral",
      "tag--warning": this.variant === "warning",
      "tag--danger": this.variant === "danger",
      "tag--text": this.variant === "text",
      // Sizes
      "tag--small": this.size === "small",
      "tag--medium": this.size === "medium",
      "tag--large": this.size === "large",
      // Modifiers
      "tag--pill": this.pill,
      "tag--removable": this.removable
    })}
      >
        <slot part="content" class="tag__content"></slot>

        ${this.removable ? html`
              <p-icon-button
                part="remove-button"
                exportparts="base:remove-button__base"
                name="x-lg"
                library="system"
                label=${this.localize.term("remove")}
                class="tag__remove"
                @click=${this.handleRemoveClick}
                tabindex="-1"
              ></p-icon-button>
            ` : ""}
      </span>
    `;
  }
};
PTag.styles = [component_styles_default, tag_styles_default];
PTag.dependencies = { "p-icon-button": PIconButton };
__decorateClass([
  property({ reflect: true })
], PTag.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], PTag.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PTag.prototype, "pill", 2);
__decorateClass([
  property({ type: Boolean })
], PTag.prototype, "removable", 2);

export {
  PTag
};
