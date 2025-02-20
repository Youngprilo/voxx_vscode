import {
  skeleton_styles_default
} from "./chunk.WL4OTSF4.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/skeleton/skeleton.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property } from "lit/decorators.js";
var PSkeleton = class extends PureElement {
  constructor() {
    super(...arguments);
    this.effect = "none";
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      skeleton: true,
      "skeleton--pulse": this.effect === "pulse",
      "skeleton--sheen": this.effect === "sheen"
    })}
      >
        <div part="indicator" class="skeleton__indicator"></div>
      </div>
    `;
  }
};
PSkeleton.styles = [component_styles_default, skeleton_styles_default];
__decorateClass([
  property()
], PSkeleton.prototype, "effect", 2);

export {
  PSkeleton
};
