import {
  avatar_styles_default
} from "./chunk.B6I27X24.js";
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

// src/components/avatar/avatar.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit";
import { property, state } from "lit/decorators.js";
var PAvatar = class extends PureElement {
  constructor() {
    super(...arguments);
    this.hasError = false;
    this.image = "";
    this.label = "";
    this.initials = "";
    this.loading = "eager";
    this.shape = "circle";
  }
  handleImageChange() {
    this.hasError = false;
  }
  handleImageLoadError() {
    this.hasError = true;
    this.emit("p-error");
  }
  render() {
    const avatarWithImage = html`
      <img
        part="image"
        class="avatar__image"
        src="${this.image}"
        loading="${this.loading}"
        alt=""
        @error="${this.handleImageLoadError}"
      />
    `;
    let avatarWithoutImage = html``;
    if (this.initials) {
      avatarWithoutImage = html`<div part="initials" class="avatar__initials">${this.initials}</div>`;
    } else {
      avatarWithoutImage = html`
        <div part="icon" class="avatar__icon" aria-hidden="true">
          <slot name="icon">
            <p-icon name="person-fill" library="system"></p-icon>
          </slot>
        </div>
      `;
    }
    return html`
      <div
        part="base"
        class=${classMap({
      avatar: true,
      "avatar--circle": this.shape === "circle",
      "avatar--rounded": this.shape === "rounded",
      "avatar--square": this.shape === "square"
    })}
        role="img"
        aria-label=${this.label}
      >
        ${this.image && !this.hasError ? avatarWithImage : avatarWithoutImage}
      </div>
    `;
  }
};
PAvatar.styles = [component_styles_default, avatar_styles_default];
PAvatar.dependencies = {
  "p-icon": PIcon
};
__decorateClass([
  state()
], PAvatar.prototype, "hasError", 2);
__decorateClass([
  property()
], PAvatar.prototype, "image", 2);
__decorateClass([
  property()
], PAvatar.prototype, "label", 2);
__decorateClass([
  property()
], PAvatar.prototype, "initials", 2);
__decorateClass([
  property()
], PAvatar.prototype, "loading", 2);
__decorateClass([
  property({ reflect: true })
], PAvatar.prototype, "shape", 2);
__decorateClass([
  watch("image")
], PAvatar.prototype, "handleImageChange", 1);

export {
  PAvatar
};
