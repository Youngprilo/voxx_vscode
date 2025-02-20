import {
  file_upload_item_styles_default
} from "./chunk.JSOEIAWM.js";
import {
  getAnimation,
  setDefaultAnimation
} from "./chunk.CRLRFWGI.js";
import {
  waitForEvent
} from "./chunk.B4BZKR24.js";
import {
  animateTo,
  stopAnimations
} from "./chunk.LHI6QEL2.js";
import {
  HasSlotController
} from "./chunk.MLXUTV4G.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
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

// src/components/file-upload-item/file-upload-item.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, query } from "lit/decorators.js";
var PFileUploadItem = class extends PureElement {
  constructor() {
    super(...arguments);
    this.hasSlotController = new HasSlotController(this, "image", "suffix");
    this.localize = new LocalizeController(this);
    this.loading = false;
    this.warning = false;
    this.closable = false;
    this.value = "";
    this.hidden = false;
  }
  firstUpdated() {
    this.base.hidden = this.hidden;
  }
  async handleHiddenChange() {
    if (!this.hidden) {
      this.emit("p-show");
      await stopAnimations(this.base);
      this.base.hidden = false;
      const { keyframes, options } = getAnimation(this, "file-upload-item.show", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.emit("p-after-show");
    } else {
      this.emit("p-hide");
      await stopAnimations(this.base);
      const { keyframes, options } = getAnimation(this, "file-upload-item.hide", { dir: this.localize.dir() });
      await animateTo(this.base, keyframes, options);
      this.base.hidden = true;
      this.emit("p-after-hide");
    }
  }
  /** Shows the item. */
  async show() {
    if (!this.hidden) {
      return void 0;
    }
    this.hidden = false;
    return waitForEvent(this, "p-after-show");
  }
  /** Hides the item */
  async hide() {
    if (this.hidden) {
      return void 0;
    }
    this.hidden = true;
    return waitForEvent(this, "p-after-hide");
  }
  handleCloseClick() {
    this.hide();
  }
  handleTriggerKeyUp(event) {
    if (event.key === "\xA0 ") {
      event.preventDefault();
    }
  }
  render() {
    return html`
      <div
        part="base"
        class=${classMap({
      "file-upload-item": true,
      "file-upload-item--hidden": this.hidden,
      "file-upload-item--closable": this.closable,
      "file-upload-item--warning": this.warning,
      "file-upload-item--has-size": this.size,
      "file-upload-item--is-loading": this.loading,
      "file-upload-item--has-image": this.hasSlotController.test("image")
    })}
      >
        <span class="file-upload-item__content">
          <span part="image" class="file-upload-item__image">
            <slot name="image"></slot>
          </span>
          <span part="label" class="file-upload-item__label">
            <slot></slot>
            ${this.size ? html`<p-format-bytes value="${this.size}" class="file-upload-item__label__size"></p-format-bytes>` : ""}
          </span>
          ${this.loading ? html`
                <span class="file-upload-item__progress-bar__container">
                  <p-progress-bar
                    class="file-upload-item__progress-bar"
                    ?indeterminate=${this.progress === void 0}
                    value=${ifDefined(this.progress)}
                    label=${ifDefined(this.label)}
                  ></p-progress-bar>
                </span>
              ` : ""}
        </span>
        ${this.closable ? html`
              <span
                class="file-upload-item__close-button"
                @click=${this.handleCloseClick}
                @keyup=${this.handleTriggerKeyUp}
              >
                <slot name="close-button">
                  <p-icon-button part="close-button" name="x" exportparts="base:close-button__base"></p-icon-button>
                </slot>
              </span>
            ` : ""}
      </div>
    `;
  }
};
PFileUploadItem.styles = [component_styles_default, file_upload_item_styles_default];
__decorateClass([
  query('[part="base"]')
], PFileUploadItem.prototype, "base", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUploadItem.prototype, "loading", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PFileUploadItem.prototype, "progress", 2);
__decorateClass([
  property()
], PFileUploadItem.prototype, "label", 2);
__decorateClass([
  property()
], PFileUploadItem.prototype, "lang", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUploadItem.prototype, "warning", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUploadItem.prototype, "closable", 2);
__decorateClass([
  property()
], PFileUploadItem.prototype, "value", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PFileUploadItem.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUploadItem.prototype, "hidden", 2);
__decorateClass([
  watch("hidden", { waitUntilFirstUpdate: true })
], PFileUploadItem.prototype, "handleHiddenChange", 1);
setDefaultAnimation("file-upload-item.show", {
  keyframes: [
    { opacity: 0, transform: "scale(0.8)" },
    { opacity: 1, transform: "scale(1)" }
  ],
  options: { duration: 250, easing: "ease" }
});
setDefaultAnimation("file-upload-item.hide", {
  keyframes: [
    { opacity: 1, transform: "scale(1)" },
    { opacity: 0, transform: "scale(0.8)" }
  ],
  options: { duration: 250, easing: "ease" }
});

export {
  PFileUploadItem
};
