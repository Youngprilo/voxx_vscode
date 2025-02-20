import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/format-date/format-date.component.ts
import { html } from "lit";
import { property } from "lit/decorators.js";
var PFormatDate = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.date = /* @__PURE__ */ new Date();
    this.hourFormat = "auto";
  }
  render() {
    const date = new Date(this.date);
    const hour12 = this.hourFormat === "auto" ? void 0 : this.hourFormat === "12";
    if (isNaN(date.getMilliseconds())) {
      return void 0;
    }
    return html`
      <time datetime=${date.toISOString()}>
        ${this.localize.date(date, {
      weekday: this.weekday,
      era: this.era,
      year: this.year,
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
      second: this.second,
      timeZoneName: this.timeZoneName,
      timeZone: this.timeZone,
      hour12
    })}
      </time>
    `;
  }
};
__decorateClass([
  property()
], PFormatDate.prototype, "date", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "weekday", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "era", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "year", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "month", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "day", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "hour", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "minute", 2);
__decorateClass([
  property()
], PFormatDate.prototype, "second", 2);
__decorateClass([
  property({ attribute: "time-zone-name" })
], PFormatDate.prototype, "timeZoneName", 2);
__decorateClass([
  property({ attribute: "time-zone" })
], PFormatDate.prototype, "timeZone", 2);
__decorateClass([
  property({ attribute: "hour-format" })
], PFormatDate.prototype, "hourFormat", 2);

export {
  PFormatDate
};
