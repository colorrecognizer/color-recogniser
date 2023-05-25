export interface SelectionTool {
  icon?: string;
  label: string;
  svgPath?: string;
  type: "rectangle" | "ellipse" | "free";
}
