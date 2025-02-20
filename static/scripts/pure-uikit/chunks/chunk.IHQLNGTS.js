import {
  spinner_styles_default
} from "./chunk.R4MSD6JK.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
import {
  PureElement
} from "./chunk.XNOZXR3M.js";
import {
  component_styles_default
} from "./chunk.TUVJKY7S.js";

// src/components/spinner/spinner.component.ts
import { html } from "lit";
var PSpinner = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
  }
  render() {
    return html`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `;
  }
};
PSpinner.styles = [component_styles_default, spinner_styles_default];

export {
  PSpinner
};
