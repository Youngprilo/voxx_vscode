import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/format-bytes/format-bytes.component.ts
import { property } from "lit/decorators.js";
var PFormatBytes = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.unit = "byte";
    this.display = "short";
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    const bitPrefixes = ["", "kilo", "mega", "giga", "tera"];
    const bytePrefixes = ["", "kilo", "mega", "giga", "tera", "peta"];
    const prefix = this.unit === "bit" ? bitPrefixes : bytePrefixes;
    const index = Math.max(0, Math.min(Math.floor(Math.log10(this.value) / 3), prefix.length - 1));
    const unit = prefix[index] + this.unit;
    const valueToFormat = parseFloat((this.value / Math.pow(1e3, index)).toPrecision(3));
    return this.localize.number(valueToFormat, {
      style: "unit",
      unit,
      unitDisplay: this.display
    });
  }
};
__decorateClass([
  property({ type: Number })
], PFormatBytes.prototype, "value", 2);
__decorateClass([
  property()
], PFormatBytes.prototype, "unit", 2);
__decorateClass([
  property()
], PFormatBytes.prototype, "display", 2);

export {
  PFormatBytes
};
