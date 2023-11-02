export const tabs: Tab[] = [
  {
    path: "tfn-generator",
    name: "TFN Generator",
  },
  {
    path: "file-diff",
    name: "File Diff",
  },
  {
    path: "json",
    name: "JSON Escape / Unescape / Beautify",
  },
  {
    path: "generate-md-table",
    name: "Generate MD Table",
  },
];

export interface Tab {
  path: string;
  name: string;
}
