// src/components/breadcrumb-item/breadcrumb-item.styles.ts
import { css } from "lit";
var breadcrumb_item_styles_default = css`
  :host {
    display: inline-flex;
  }

  .breadcrumb-item {
    display: inline-flex;
    align-items: center;
    font-family: var(--p-font-sans);
    font-size: var(--p-font-size-small);
    font-weight: var(--p-font-weight-medium);
    color: var(--p-color-neutral-600);
    line-height: var(--p-line-height-normal);
    white-space: nowrap;
    background-color: var(--p-color-primary-50);
    padding: 0.24rem 0.75rem;
    position: relative;
    min-height: 2.5rem;
  }

  :host(:first-child) .breadcrumb-item {
    border-radius: var(--p-border-radius-large) 0 0 var(--p-border-radius-large);
  }

  :host(:last-child) .breadcrumb-item::after {
    content: "";
    display: block;
    height: 100%;
    aspect-ratio: 1 / 2;
    border-radius: 0 var(--p-border-radius-large) var(--p-border-radius-large) 0;
    position: absolute;
    background-color: var(--p-color-primary-50);
    top: 0;
    left: 100%;
  }

  .breadcrumb-item__label {
    display: inline-block;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-decoration: none;
    color: inherit;
    background: none;
    border: none;
    border-radius: var(--p-border-radius-medium);
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: var(--p-transition-fast) --color;
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label {
    color: var(--p-color-primary-600);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:hover {
    color: var(--p-color-primary-500);
  }

  :host(:not(:last-of-type)) .breadcrumb-item__label:active {
    color: var(--p-color-primary-600);
  }

  .breadcrumb-item__label:focus {
    outline: none;
  }

  .breadcrumb-item__label:focus-visible {
    outline: var(--p-focus-ring);
    outline-offset: var(--p-focus-ring-offset);
  }

  .breadcrumb-item__prefix,
  .breadcrumb-item__suffix {
    display: none;
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .breadcrumb-item--has-prefix .breadcrumb-item__prefix {
    display: inline-flex;
    margin-inline-end: var(--p-spacing-x-small);
  }

  .breadcrumb-item--has-suffix .breadcrumb-item__suffix {
    display: inline-flex;
    margin-inline-start: var(--p-spacing-x-small);
  }

  :host(:last-of-type) .breadcrumb-item__separator {
    display: none;
  }

  .breadcrumb-item__separator {
    display: inline-flex;
    align-items: center;
    margin: 0 var(--p-spacing-x-small);
    user-select: none;
    -webkit-user-select: none;
  }
`;

export {
  breadcrumb_item_styles_default
};
