import {
  PIcon
} from "./chunk.FVIDRVFQ.js";

// src/react/icon/index.ts
import * as React from "react";
import { createComponent } from "@lit/react";
import "@lit/react";
var tagName = "p-icon";
PIcon.define("p-icon");
var reactWrapper = createComponent({
  tagName,
  elementClass: PIcon,
  react: React,
  events: {
    onPLoad: "p-load",
    onPError: "p-error"
  },
  displayName: "PIcon"
});
var icon_default = reactWrapper;

export {
  icon_default
};
