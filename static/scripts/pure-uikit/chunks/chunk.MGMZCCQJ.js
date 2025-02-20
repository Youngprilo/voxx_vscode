import {
  PSelect
} from "./chunk.GSVZFYPX.js";
import {
  POption
} from "./chunk.KY5KC4VD.js";
import {
  paginate_styles_default
} from "./chunk.LZPWXC2H.js";
import {
  PFormatNumber
} from "./chunk.6ZIN5VWM.js";
import {
  PButtonGroup
} from "./chunk.QPOP3WN3.js";
import {
  PButton
} from "./chunk.D3FOAHLZ.js";
import {
  LocalizeController
} from "./chunk.OLPLIBBP.js";
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

// src/components/paginate/paginate.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html } from "lit/static-html.js";
import { property } from "lit/decorators.js";
var PPaginate = class extends PureElement {
  constructor() {
    super(...arguments);
    this.localize = new LocalizeController(this);
    this.title = "";
    this.variant = "default";
    this.size = "medium";
    this.disabled = false;
    this.pill = false;
    this.total = 0;
    this.page = 1;
    this.limit = 10;
    this.maxVisiblePages = 3;
    this.pageList = [10, 20, 30, 40, 50];
  }
  getPages() {
    const totalPages = Math.ceil(Number(this.total) / Number(this.limit));
    let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    const page = this.page;
    if (pages.length > this.maxVisiblePages) {
      if (page <= Math.floor(this.maxVisiblePages / 2)) {
        pages = [...pages.slice(0, this.maxVisiblePages), "..."];
      } else if (page >= totalPages - Math.floor(this.maxVisiblePages / 2)) {
        pages = ["...", ...pages.slice(totalPages - this.maxVisiblePages)];
      } else {
        pages = [
          "...",
          ...pages.slice(page - Math.ceil(this.maxVisiblePages / 2), page + Math.floor(this.maxVisiblePages / 2)),
          "..."
        ];
      }
    }
    return pages;
  }
  handleChangeLimit(e) {
    var _a;
    e == null ? void 0 : e.preventDefault();
    e == null ? void 0 : e.stopPropagation();
    this.changeLimit(Number((_a = e.target) == null ? void 0 : _a.value));
  }
  changeLimit(newLimit) {
    this.limit = Number(newLimit);
    this.page = 1;
    this.emit("p-change-limit", {
      detail: { limit: this.limit }
    });
  }
  changePage(newPage) {
    if (newPage === "...")
      return;
    this.page = Number(newPage);
    this.emit("p-change", {
      detail: { page: this.page }
    });
  }
  prevPage() {
    if (this.page > 1) {
      this.changePage(this.page - 1);
    }
  }
  nextPage() {
    const totalPages = Math.ceil(Number(this.total) / Number(this.limit));
    if (Number(this.page) < totalPages) {
      this.changePage(Number(this.page) + 1);
    }
  }
  render() {
    const pages = this.getPages();
    return html`
      <div class="paginate">
        <div class="paginate__summary">
          <p-select
            label=""
            ?disabled="${this.disabled}"
            size=${this.size}
            .value=${String(this.limit)}
            class="paginate__select_limit"
            @p-change="${(e) => this.handleChangeLimit(e)}"
          >
            ${this.pageList.map((page) => {
      return html`<p-option value=${String(page)}>${page} / page</p-option>`;
    })}
          </p-select>
          <span class="paginate__summary-text">
            of total
            <p-format-number value=${this.total}></p-format-number>
            results
          </span>
        </div>
        <p-button-group>
          <p-button
            size=${this.size}
            variant=${this.variant}
            ?disabled="${Number(this.page) === 1 || this.disabled}"
            @click="${this.prevPage}"
            ?circle=${this.pill}
          >
            <slot name="prefix" part="prefix" slot="prefix">
              <p-icon name="arrow-left"></p-icon>
            </slot>
            ${this.localize.term("previousPage")}
          </p-button>
          ${pages.map((page, pIdx) => {
      if (page === "...") {
        if (pIdx === 0) {
          return html`
                  <p-dropdown>
                    <p-button
                      slot="trigger"
                      size=${this.size}
                      variant=${this.variant}
                      ?disabled="${this.disabled}"
                      class=${classMap({
            page: true
          })}
                      ?circle=${this.pill}
                    >
                      ${page}
                    </p-button>
                    <p-button
                      size=${this.size}
                      variant=${this.variant}
                      @click="${() => this.changePage(1)}"
                      ?disabled="${this.disabled}"
                      class=${classMap({
            page: true
          })}
                      ?circle=${this.pill}
                    >
                      ${this.localize.term("firstPage")}
                    </p-button>
                  </p-dropdown>
                `;
        } else if (pIdx === pages.length - 1) {
          return html`
                  <p-dropdown>
                    <p-button
                      slot="trigger"
                      size=${this.size}
                      variant=${this.variant}
                      ?disabled="${this.disabled}"
                      class=${classMap({
            page: true
          })}
                      ?circle=${this.pill}
                    >
                      ${page}
                    </p-button>
                    <p-button
                      size=${this.size}
                      variant=${this.variant}
                      @click="${() => this.changePage(Math.ceil(Number(this.total) / Number(this.limit)))}"
                      ?disabled="${this.disabled}"
                      class=${classMap({
            page: true
          })}
                      ?circle=${this.pill}
                    >
                      ${this.localize.term("lastPage")}
                    </p-button>
                  </p-dropdown>
                `;
        } else {
          return html` <span>${page}</span> `;
        }
      } else {
        return html`
                <p-button
                  size=${this.size}
                  variant=${this.variant}
                  @click="${() => this.changePage(page)}"
                  ?disabled="${this.page === page || this.disabled}"
                  class=${classMap({
          page: true,
          "page--active": Number(this.page) === Number(page) && String(this.page) !== "..."
        })}
                  ?circle=${this.pill}
                >
                  ${page}
                </p-button>
              `;
      }
    })}
          <p-button
            size=${this.size}
            variant=${this.variant}
            ?disabled="${this.page === Math.ceil(Number(this.total) / Number(this.limit)) || this.disabled}"
            @click="${this.nextPage}"
            ?circle=${this.pill}
          >
            <slot slot="suffix" name="suffix" part="suffix">
              <p-icon name="arrow-right"></p-icon>
            </slot>
            ${this.localize.term("nextPage")}
          </p-button>
        </p-button-group>
      </div>
    `;
  }
};
PPaginate.styles = [component_styles_default, paginate_styles_default];
PPaginate.dependencies = {
  "p-icon": PIcon,
  "p-select": PSelect,
  "p-option": POption,
  "p-format-number": PFormatNumber,
  "p-button": PButton,
  "p-button-group": PButtonGroup
};
__decorateClass([
  property()
], PPaginate.prototype, "title", 2);
__decorateClass([
  property({ reflect: true })
], PPaginate.prototype, "variant", 2);
__decorateClass([
  property({ reflect: true })
], PPaginate.prototype, "size", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PPaginate.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PPaginate.prototype, "pill", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PPaginate.prototype, "total", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PPaginate.prototype, "page", 2);
__decorateClass([
  property({ type: Number, reflect: true })
], PPaginate.prototype, "limit", 2);
__decorateClass([
  property({ type: Number, reflect: true, attribute: "max-visible-pages" })
], PPaginate.prototype, "maxVisiblePages", 2);
__decorateClass([
  property({ type: Array, attribute: "page-list" })
], PPaginate.prototype, "pageList", 2);

export {
  PPaginate
};
