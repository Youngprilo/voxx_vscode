// src/translations/en.ts
import { registerTranslation } from "pure-localize";
var translation = {
  $code: "en",
  $name: "English",
  $dir: "ltr",
  browseFiles: "Browse files",
  carousel: "Carousel",
  clearEntry: "Clear entry",
  close: "Close",
  copied: "Copied",
  copy: "Copy",
  currentValue: "Current value",
  dragDrop: "Drag and drop to upload",
  fileTypeNotAccepted: "Filetype is not accepted",
  fileSizeExceeded: "File size exceeds limit",
  firstPage: "First page",
  error: "Error",
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: "Hide password",
  loading: "Loading",
  lastPage: "Last page",
  maxFiles: "Maximum number of files reached",
  noMultipleFiles: "Multiple files are not allowed",
  empty: "Empty",
  nextPage: "Next",
  nextMonth: "Next month",
  nextYear: "Next year",
  nextSlide: "Next slide",
  numOptionsSelected: (num) => {
    if (num === 0)
      return "No options selected";
    if (num === 1)
      return "1 option selected";
    return `${num} options selected`;
  },
  previousPage: "Previous",
  previousMonth: "Previous month",
  previousYear: "Previous year",
  previousSlide: "Previous slide",
  progress: "Progress",
  remove: "Remove",
  resize: "Resize",
  scrollToEnd: "Scroll to end",
  scrollToStart: "Scroll to start",
  selectAColorFromTheScreen: "Select a color from the screen",
  showPassword: "Show password",
  slideNum: (slide) => `Slide ${slide}`,
  toggleColorFormat: "Toggle color format",
  today: "Today"
};
registerTranslation(translation);
var en_default = translation;

export {
  en_default
};
