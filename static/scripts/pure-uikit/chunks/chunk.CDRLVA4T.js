import {
  qr_code_styles_default
} from "./chunk.2IHMH66B.js";
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

// src/components/qr-code/qr-code.component.ts
import { html } from "lit";
import { property, query } from "lit/decorators.js";
import { styleMap } from "lit/directives/style-map.js";
import QrCreator from "qr-creator";
var PQrCode = class extends PureElement {
  constructor() {
    super(...arguments);
    this.value = "";
    this.label = "";
    this.size = 128;
    this.fill = "black";
    this.background = "white";
    this.radius = 0;
    this.errorCorrection = "H";
  }
  firstUpdated() {
    this.generate();
  }
  generate() {
    if (!this.hasUpdated) {
      return;
    }
    QrCreator.render(
      {
        text: this.value,
        radius: this.radius,
        ecLevel: this.errorCorrection,
        fill: this.fill,
        background: this.background,
        // We draw the canvas larger and scale its container down to avoid blurring on high-density displays
        size: this.size * 2
      },
      this.canvas
    );
  }
  render() {
    var _a;
    return html`
      <canvas
        part="base"
        class="qr-code"
        role="img"
        aria-label=${((_a = this.label) == null ? void 0 : _a.length) > 0 ? this.label : this.value}
        style=${styleMap({
      width: `${this.size}px`,
      height: `${this.size}px`
    })}
      ></canvas>
    `;
  }
};
PQrCode.styles = [component_styles_default, qr_code_styles_default];
__decorateClass([
  query("canvas")
], PQrCode.prototype, "canvas", 2);
__decorateClass([
  property()
], PQrCode.prototype, "value", 2);
__decorateClass([
  property()
], PQrCode.prototype, "label", 2);
__decorateClass([
  property({ type: Number })
], PQrCode.prototype, "size", 2);
__decorateClass([
  property()
], PQrCode.prototype, "fill", 2);
__decorateClass([
  property()
], PQrCode.prototype, "background", 2);
__decorateClass([
  property({ type: Number })
], PQrCode.prototype, "radius", 2);
__decorateClass([
  property({ attribute: "error-correction" })
], PQrCode.prototype, "errorCorrection", 2);
__decorateClass([
  watch(["background", "errorCorrection", "fill", "radius", "size", "value"])
], PQrCode.prototype, "generate", 1);

export {
  PQrCode
};
