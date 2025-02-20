import {
  PProgressBar
} from "./chunk.6GLCZJBQ.js";
import {
  file_upload_styles_default
} from "./chunk.DMYITK6M.js";
import {
  hasValidFileSize,
  hasValidFileType
} from "./chunk.OC75CHDN.js";
import {
  PFileUploadItem
} from "./chunk.IL5P5JMD.js";
import {
  FormControlController
} from "./chunk.QI65WEA7.js";
import {
  PIconButton
} from "./chunk.DF5OOA4T.js";
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

// src/components/file-upload/file-upload.component.ts
import { classMap } from "lit/directives/class-map.js";
import { html, nothing } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { property, query, state } from "lit/decorators.js";
var PFileUpload = class extends PureElement {
  constructor() {
    super(...arguments);
    this.formControlController = new FormControlController(this, {
      assumeInteractionOn: ["p-change", "p-remove"]
    });
    this.localize = new LocalizeController(this);
    this.isDragover = false;
    this.files = [];
    this.disabled = false;
    this.noButton = false;
    this.buttonOnly = false;
    this.noFileList = false;
    this.accept = "*";
    this.multiple = false;
  }
  get value() {
    if (Array.isArray(this.files)) {
      return this.files.map((file) => file.file);
    }
    return "";
  }
  set value(file) {
    if (Array.isArray(file)) {
      this.files = file.map((f) => ({ file: f }));
      return;
    }
    if (file instanceof File) {
      this.files = [{ file }];
      return;
    }
    this.files = [];
  }
  /** Gets the validity state object */
  get validity() {
    return this.fileInput.validity;
  }
  /** Gets the validation message */
  get validationMessage() {
    return this.fileInput.validationMessage;
  }
  /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
  checkValidity() {
    return this.fileInput.checkValidity();
  }
  /** Gets the associated form, if one exists. */
  getForm() {
    return this.formControlController.getForm();
  }
  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.fileInput.reportValidity();
  }
  /** Sets a custom validation message. Pass an empty string to restore validity. */
  setCustomValidity(message) {
    this.fileInput.setCustomValidity(message);
    this.formControlController.updateValidity();
  }
  addFile(file) {
    if (this.maxFiles && this.files.length >= this.maxFiles) {
      this.warning = this.localize.term("maxFiles");
      return;
    }
    const fileInfo = {
      file
    };
    if (!hasValidFileType(file, this.accept)) {
      fileInfo.accepted = false;
      fileInfo.warning = this.localize.term("fileTypeNotAccepted");
    } else if (!hasValidFileSize(file, this.maxFileSize)) {
      fileInfo.accepted = false;
      fileInfo.warning = this.localize.term("fileSizeExceeded");
    } else {
      fileInfo.accepted = true;
    }
    this.files = this.multiple ? [...this.files, fileInfo] : [fileInfo];
  }
  handleFiles(fileList) {
    if (!fileList || fileList.length === 0) {
      return;
    }
    this.warning = void 0;
    if (!this.multiple && fileList.length > 1) {
      this.warning = this.localize.term("noMultipleFiles");
      return;
    }
    Object.values(fileList).forEach((file) => this.addFile(file));
    this.emit("p-change", { detail: this.files });
  }
  onDragLeave() {
    this.isDragover = false;
  }
  onDragOver(event) {
    event.preventDefault();
    if (!event.dataTransfer) {
      return;
    }
    this.isDragover = true;
  }
  onDrop(event) {
    var _a;
    event.preventDefault();
    this.isDragover = false;
    const files = (_a = event.dataTransfer) == null ? void 0 : _a.files;
    if (!files || this.disabled) {
      return;
    }
    this.handleFiles(files);
  }
  handleBrowseFileClick() {
    if (this.disabled)
      return;
    this.fileInput.click();
  }
  handleFileInputChange() {
    this.handleFiles(this.fileInput.files);
  }
  handleFileRemove(index) {
    const fileInfo = this.files[index];
    this.emit("p-remove", { detail: fileInfo });
    this.files.splice(index, 1);
    this.emit("p-change", { detail: this.files });
  }
  get description() {
    if (this.warning) {
      return this.warning;
    }
    return this.label ? this.label : this.localize.term("dragDrop");
  }
  render() {
    var _a;
    const browseFilesButton = html`
      <div
        @click="${(e) => {
      e == null ? void 0 : e.preventDefault();
      e == null ? void 0 : e.stopPropagation();
      this.handleBrowseFileClick();
    }}"
      >
        <slot name="button">
          <p-button
            part="button"
            variant=${this.warning ? "warning" : "default"}
            ?disabled=${this.disabled}
            size="small"
          >
            ${(_a = this.buttonLabel) != null ? _a : this.localize.term("browseFiles")}
          </p-button>
        </slot>
      </div>
    `;
    return html`
      <div
        part="base"
        class=${classMap({
      "file-upload": true,
      "file-upload--disabled": this.disabled,
      "file-upload--warning": !!this.warning,
      "file-upload--dragged": this.isDragover
    })}
      >
        <input
          type="file"
          id="file-input"
          style="display: none"
          accept=${this.accept}
          ?multiple=${this.multiple}
          @change="${this.handleFileInputChange}"
          value=${Array.isArray(this.value) ? this.value.map((f) => f instanceof File ? f.name : f).join(",") : ""}
        />
        ${this.buttonOnly ? browseFilesButton : html`
              <div
                id="dropzone"
                @drop="${this.onDrop}"
                @dragover="${this.onDragOver}"
                @dragleave="${this.onDragLeave}"
                @click="${this.handleBrowseFileClick}"
              >
                <slot name="label">
                  <div part="label" class="file-upload__label">
                    <div class="file-upload__label__container">
                      <span class="file-upload__icon">
                        <slot name="image">
                          <span style="font-size: 20px; position: relative; top: 5px;">
                            <p-icon name="cloud-upload" size="large"></p-icon>
                          </span>
                        </slot>
                      </span>
                      <div class="file-upload__label__text">
                        ${!this.noButton ? browseFilesButton : ""}
                        <div class="file-upload__label__description">${this.description}</div>
                      </div>
                    </div>
                  </div>
                </slot>
              </div>
            `}
        ${!this.noFileList ? html`
              <div class="file-upload__file-items" id="file-items">
                ${this.files.map(
      (fileInfo, index) => html`
                    <p-file-upload-item
                      size=${fileInfo.accepted ? fileInfo.file.size : nothing}
                      ?warning=${!fileInfo.accepted}
                      ?closable=${fileInfo.accepted}
                      ?loading=${fileInfo.loading}
                      progress=${ifDefined(fileInfo.progress)}
                      @p-hide=${(event) => {
        event.stopPropagation();
        event.preventDefault();
        this.handleFileRemove(index);
      }}
                    >
                      ${fileInfo.accepted ? fileInfo.file.name : fileInfo.warning}
                      <p-icon
                        name=${fileInfo.warning ? "exclamation-triangle" : "file-earmark"}
                        slot="image"
                        library="system"
                      ></p-icon>
                    </p-file-upload-item>
                  `
    )}
              </div>
            ` : ""}
      </div>
    `;
  }
};
PFileUpload.styles = [component_styles_default, file_upload_styles_default];
PFileUpload.dependencies = {
  "p-icon": PIcon,
  "p-icon-button": PIconButton,
  "p-progress-bar": PProgressBar,
  "p-file-upload-item": PFileUploadItem
};
__decorateClass([
  state()
], PFileUpload.prototype, "warning", 2);
__decorateClass([
  state()
], PFileUpload.prototype, "isDragover", 2);
__decorateClass([
  query("#file-input")
], PFileUpload.prototype, "fileInput", 2);
__decorateClass([
  property({ type: Array })
], PFileUpload.prototype, "files", 2);
__decorateClass([
  property()
], PFileUpload.prototype, "name", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUpload.prototype, "disabled", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "no-button" })
], PFileUpload.prototype, "noButton", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "button-only" })
], PFileUpload.prototype, "buttonOnly", 2);
__decorateClass([
  property({ type: Boolean, reflect: true, attribute: "no-file-list" })
], PFileUpload.prototype, "noFileList", 2);
__decorateClass([
  property()
], PFileUpload.prototype, "label", 2);
__decorateClass([
  property({ attribute: "button-label" })
], PFileUpload.prototype, "buttonLabel", 2);
__decorateClass([
  property()
], PFileUpload.prototype, "lang", 2);
__decorateClass([
  property({ type: String, reflect: true })
], PFileUpload.prototype, "accept", 2);
__decorateClass([
  property({ type: Number, attribute: "max-file-size" })
], PFileUpload.prototype, "maxFileSize", 2);
__decorateClass([
  property({ type: Number, attribute: "max-files" })
], PFileUpload.prototype, "maxFiles", 2);
__decorateClass([
  property({ type: Boolean, reflect: true })
], PFileUpload.prototype, "multiple", 2);

export {
  PFileUpload
};
