import {
  PTable
} from "./chunk.4K3LGAJ5.js";

// src/react/table/index.ts
import * as React from "react";
import { createComponent } from "@lit/react";
import "@lit/react";
var tagName = "p-table";
PTable.define("p-table");
var reactWrapper = createComponent({
  tagName,
  elementClass: PTable,
  react: React,
  events: {
    onPChange: "p-change",
    onPTableRowSelect: "p-table-row-select"
  },
  displayName: "PTable"
});
var table_default = reactWrapper;

export {
  table_default
};
