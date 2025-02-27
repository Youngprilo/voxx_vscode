import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/format-number/format-number.component.ts
import { property } from "lit/decorators.js";
var PFormatNumber = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.value = 0;
    this.type = "decimal";
    this.noGrouping = false;
    this.currency = "USD";
    this.currencyDisplay = "symbol";
  }
  render() {
    if (isNaN(this.value)) {
      return "";
    }
    return this.localize.number(this.value, {
      style: this.type,
      currency: this.currency,
      currencyDisplay: this.currencyDisplay,
      useGrouping: !this.noGrouping,
      minimumIntegerDigits: this.minimumIntegerDigits,
      minimumFractionDigits: this.minimumFractionDigits,
      maximumFractionDigits: this.maximumFractionDigits,
      minimumSignificantDigits: this.minimumSignificantDigits,
      maximumSignificantDigits: this.maximumSignificantDigits
    });
  }
};
__decorateClass([
  property({ type: Number })
], PFormatNumber.prototype, "value", 2);
__decorateClass([
  property()
], PFormatNumber.prototype, "type", 2);
__decorateClass([
  property({ attribute: "no-grouping", type: Boolean })
], PFormatNumber.prototype, "noGrouping", 2);
__decorateClass([
  property()
], PFormatNumber.prototype, "currency", 2);
__decorateClass([
  property({ attribute: "currency-display" })
], PFormatNumber.prototype, "currencyDisplay", 2);
__decorateClass([
  property({ attribute: "minimum-integer-digits", type: Number })
], PFormatNumber.prototype, "minimumIntegerDigits", 2);
__decorateClass([
  property({ attribute: "minimum-fraction-digits", type: Number })
], PFormatNumber.prototype, "minimumFractionDigits", 2);
__decorateClass([
  property({ attribute: "maximum-fraction-digits", type: Number })
], PFormatNumber.prototype, "maximumFractionDigits", 2);
__decorateClass([
  property({ attribute: "minimum-significant-digits", type: Number })
], PFormatNumber.prototype, "minimumSignificantDigits", 2);
__decorateClass([
  property({ attribute: "maximum-significant-digits", type: Number })
], PFormatNumber.prototype, "maximumSignificantDigits", 2);

export {
  PFormatNumber
};
