import {
  __decorateClass,
  __spreadValues
} from "./chunk.IFDWM6P4.js";

// src/internal/pure-ui-element.ts
import { LitElement } from "lit";
import { property } from "lit/decorators.js";
var PureElement = class extends LitElement {
  emit(name, options) {
    const event = new CustomEvent(name, __spreadValues({
      bubbles: true,
      cancelable: false,
      composed: true,
      detail: {}
    }, options));
    this.dispatchEvent(event);
    return event;
  }
  /* eslint-enable */
  static define(name, elementConstructor = this, options = {}) {
    const currentlyRegisteredConstructor = customElements.get(name);
    if (!currentlyRegisteredConstructor) {
      try {
        customElements.define(name, elementConstructor, options);
      } catch (_err) {
        customElements.define(name, class extends elementConstructor {
        }, options);
      }
      return;
    }
    let newVersion = " (unknown version)";
    let existingVersion = newVersion;
    if ("version" in elementConstructor && elementConstructor.version) {
      newVersion = " v" + elementConstructor.version;
    }
    if ("version" in currentlyRegisteredConstructor && currentlyRegisteredConstructor.version) {
      existingVersion = " v" + currentlyRegisteredConstructor.version;
    }
    if (newVersion && existingVersion && newVersion === existingVersion) {
      return;
    }
    console.warn(
      `Attempted to register <${name}>${newVersion}, but <${name}>${existingVersion} has already been registered.`
    );
  }
  constructor() {
    super();
    Object.entries(this.constructor.dependencies).forEach(([name, component]) => {
      this.constructor.define(name, component);
    });
  }
};
/* eslint-disable */
// @ts-expect-error This is auto-injected at build time.
PureElement.version = "1.5.13";
PureElement.dependencies = {};
__decorateClass([
  property()
], PureElement.prototype, "dir", 2);
__decorateClass([
  property()
], PureElement.prototype, "lang", 2);

export {
  PureElement
};
