export interface SelectionTool {
  icon?: string;
  label: string;
  svgPath?: string;
  type: "RECTANGLE" | "ELLIPSE" | "FREE";
}
