import {
  badge_styles_default
} from "./chunk.NPVRNAM6.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/badge/badge.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property } from "lit/decorators.js";
var PBadge = class extends PureElement {
  constructor() {
    super(...arguments);
    this.variant = "primary";
    this.pill = false;
    this.pulse = false;
  }
  render() {
    return html`
      <span
        part="base"
        class=${classMap({
      badge: true,
      "badge--primary": this.variant === "primary",
      "badge--success": this.variant === "success",
      "badge--neutral": this.variant === "neutral",
      "badge--warning": this.variant === "warning",
      "badge--danger": this.variant === "danger",
      "badge--pill": this.pill,
      "badge--pulse": this.pulse
    })}
        role="status"
      >
        <slot></slot>
      </span>
    `;
  }
};
PBadge.styles = [component_styles_default, badge_styles_default];
__decorateClass([
  property({ reflect: true })
], PBadge.prototype, "variant", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PBadge.prototype, "pill", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PBadge.prototype, "pulse", 2);

export {
  PBadge
};
