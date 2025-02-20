import {
  option_styles_default
} from "./chunk.5M5NKXKS.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PIcon
} from "./chunk.FVIDRVFQ.js";
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

// src/components/option/option.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
var POption = class extends PureElement {
  constructor() {
    super(...arguments);
    // @ts-expect-error - Controller is currently unused
    this.localize = new LocalizeController(this);
    this.current = false;
    this.selected = false;
    this.hasHover = false;
    this.hidden = false;
    this.value = "";
    this.disabled = false;
  }
  connectedCallback() {
    super.connectedCallback();
    this.setAttribute("role", "option");
    this.setAttribute("aria-selected", "false");
  }
  handleDefaultSlotChange() {
    const textLabel = this.getTextLabel();
    if (typeof this.cachedTextLabel === "undefined") {
      this.cachedTextLabel = textLabel;
      return;
    }
    if (textLabel !== this.cachedTextLabel) {
      this.cachedTextLabel = textLabel;
      this.emit("slotchange", {
        bubbles: true,
        composed: false,
        cancelable: false
      });
    }
  }
  handleMouseEnter() {
    this.hasHover = true;
  }
  handleMouseLeave() {
    this.hasHover = false;
  }
  handleDisabledChange() {
    this.setAttribute("aria-disabled", this.disabled ? "true" : "false");
  }
  handleSelectedChange() {
    this.setAttribute("aria-selected", this.selected ? "true" : "false");
  }
  handleValueChange() {
    if (typeof this.value !== "string") {
      this.value = String(this.value);
    }
  }
  /** Returns a plain text label based on the option's content. */
  getTextLabel() {
    const nodes = this.childNodes;
    let label = "";
    [...nodes].forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (!node.hasAttribute("slot")) {
          label += node.textContent;
        }
      }
      if (node.nodeType === Node.TEXT_NODE) {
        label += node.textContent;
      }
    });
    return label.trim();
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      option: true,
      "option--current": this.current,
      "option--disabled": this.disabled,
      "option--selected": this.selected,
      "option--hover": this.hasHover,
      "option--hidden": this.hidden
    })}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <p-icon part="checked-icon" class="option__check" name="check" library="system" aria-hidden="true"></p-icon>
        <slot part="prefix" name="prefix" class="option__prefix"></slot>
        <slot part="label" class="option__label" @slotchange=${this.handleDefaultSlotChange}></slot>
        <slot part="suffix" name="suffix" class="option__suffix"></slot>
      </div>
    `;
  }
};
POption.styles = [component_styles_default, option_styles_default];
POption.dependencies = { "p-icon": PIcon };
__decorateClass([
  query(".option__label")
], POption.prototype, "defaultSlot", 2);
__decorateClass([
  state()
], POption.prototype, "current", 2);
__decorateClass([
  state()
], POption.prototype, "selected", 2);
__decorateClass([
  state()
], POption.prototype, "hasHover", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], POption.prototype, "hidden", 2);
__decorateClass([
  property({ reflect: true })
], POption.prototype, "value", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], POption.prototype, "disabled", 2);
__decorateClass([
  watch("disabled")
], POption.prototype, "handleDisabledChange", 1);
__decorateClass([
  watch("selected")
], POption.prototype, "handleSelectedChange", 1);
__decorateClass([
  watch("value")
], POption.prototype, "handleValueChange", 1);

export {
  POption
};
