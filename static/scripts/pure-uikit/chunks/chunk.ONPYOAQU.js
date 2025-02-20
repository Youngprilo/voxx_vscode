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
  animated_image_styles_default
} from "./chunk.TNAQ3EBO.js";
import {
  __decorateClass
} from "./chunk.IFDWM6P4.js";

// src/components/animated-image/animated-image.component.ts
import { html } from "lit";
import { property, query, state } from "lit/decorators.js";
var PAnimatedImage = class extends PureElement {
  constructor() {
    super(...arguments);
    this.isLoaded = false;
  }
  handleClick() {
    this.play = !this.play;
  }
  handleLoad() {
    const canvas = document.createElement("canvas");
    const { width, height } = this.animatedImage;
    canvas.width = width;
    canvas.height = height;
    canvas.getContext("2d").drawImage(this.animatedImage, 0, 0, width, height);
    this.frozenFrame = canvas.toDataURL("image/gif");
    if (!this.isLoaded) {
      this.emit("p-load");
      this.isLoaded = true;
    }
  }
  handleError() {
    this.emit("p-error");
  }
  handlePlayChange() {
    if (this.play) {
      this.animatedImage.src = "";
      this.animatedImage.src = this.src;
    }
  }
  handleSrcChange() {
    this.isLoaded = false;
  }
  render() {
    return html`
      <div class="animated-image">
        <img
          class="animated-image__animated"
          src=${this.src}
          alt=${this.alt}
          crossorigin="anonymous"
          aria-hidden=${this.play ? "false" : "true"}
          @click=${this.handleClick}
          @load=${this.handleLoad}
          @error=${this.handleError}
        />

        ${this.isLoaded ? html`
              <img
                class="animated-image__frozen"
                src=${this.frozenFrame}
                alt=${this.alt}
                aria-hidden=${this.play ? "true" : "false"}
                @click=${this.handleClick}
              />

              <div part="control-box" class="animated-image__control-box">
                <slot name="play-icon"><p-icon name="play-fill" library="system"></p-icon></slot>
                <slot name="pause-icon"><p-icon name="pause-fill" library="system"></p-icon></slot>
              </div>
            ` : ""}
      </div>
    `;
  }
};
PAnimatedImage.styles = [component_styles_default, animated_image_styles_default];
PAnimatedImage.dependencies = { "p-icon": PIcon };
__decorateClass([
  query(".animated-image__animated")
], PAnimatedImage.prototype, "animatedImage", 2);
__decorateClass([
  state()
], PAnimatedImage.prototype, "frozenFrame", 2);
__decorateClass([
  state()
], PAnimatedImage.prototype, "isLoaded", 2);
__decorateClass([
  property()
], PAnimatedImage.prototype, "src", 2);
__decorateClass([
  property()
], PAnimatedImage.prototype, "alt", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PAnimatedImage.prototype, "play", 2);
__decorateClass([
  watch("play", { waitUntilFirstUpdate: true })
], PAnimatedImage.prototype, "handlePlayChange", 1);
__decorateClass([
  watch("src")
], PAnimatedImage.prototype, "handleSrcChange", 1);

export {
  PAnimatedImage
};
