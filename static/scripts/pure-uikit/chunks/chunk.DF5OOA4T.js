import {
  icon_button_styles_default
} from "./chunk.S6NDCMXS.js";
import {
  PIcon
} from "./chunk.FVIDRVFQ.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/icon-button/icon-button.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html, literal } from "lit/static-html.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, query, state } from "lit/decorators.js";
var PIconButton = class extends PureElement {
  constructor() {
    super(...arguments);
    this.hasFocus = false;
    this.label = "";
    this.disabled = false;
  }
  handleBlur() {
    this.hasFocus = false;
    this.emit("p-blur");
  }
  handleFocus() {
    this.hasFocus = true;
    this.emit("p-focus");
  }
  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  /** Simulates a click on the icon button. */
  click() {
    this.button.click();
  }
  /** Sets focus on the icon button. */
  focus(options) {
    this.button.focus(options);
  }
  /** Removes focus from the icon button. */
  blur() {
    this.button.blur();
  }
  render() {
    const isLink = this.href ? true : false;
    const tag = isLink ? literal`a` : literal`button`;
    return html`
      <${tag}
        part="base"
        class=${classMap({
      "icon-button": true,
      "icon-button--disabled": !isLink && this.disabled,
      "icon-button--focused": this.hasFocus
    })}
        ?disabled=${ifDefined(isLink ? void 0 : this.disabled)}
        type=${ifDefined(isLink ? void 0 : "button")}
        href=${ifDefined(isLink ? this.href : void 0)}
        target=${ifDefined(isLink ? this.target : void 0)}
        download=${ifDefined(isLink ? this.download : void 0)}
        rel=${ifDefined(isLink && this.target ? "noreferrer noopener" : void 0)}
        role=${ifDefined(isLink ? void 0 : "button")}
        aria-disabled=${this.disabled ? "true" : "false"}
        aria-label="${this.label}"
        tabindex=${this.disabled ? "-1" : "0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <p-icon
          class="icon-button__icon"
          name=${ifDefined(this.name)}
          library=${ifDefined(this.library)}
          src=${ifDefined(this.src)}
          aria-hidden="true"
        ></p-icon>
      </${tag}>
    `;
  }
};
PIconButton.styles = [component_styles_default, icon_button_styles_default];
PIconButton.dependencies = { "p-icon": PIcon };
__decorateClass([
  query(".icon-button")
], PIconButton.prototype, "button", 2);
__decorateClass([
  state()
], PIconButton.prototype, "hasFocus", 2);
__decorateClass([
  property()
], PIconButton.prototype, "name", 2);
__decorateClass([
  property()
], PIconButton.prototype, "library", 2);
__decorateClass([
  property()
], PIconButton.prototype, "src", 2);
__decorateClass([
  property()
], PIconButton.prototype, "href", 2);
__decorateClass([
  property()
], PIconButton.prototype, "target", 2);
__decorateClass([
  property()
], PIconButton.prototype, "download", 2);
__decorateClass([
  property()
], PIconButton.prototype, "label", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PIconButton.prototype, "disabled", 2);

export {
  PIconButton
};
