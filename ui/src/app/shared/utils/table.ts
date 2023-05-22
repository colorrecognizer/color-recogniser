import { FilterRequestOperator } from "../auto-generated/apis";

export class TableUtils {

  static convertMatchModeToOperator(matchMode: string): FilterRequestOperator {
    switch (matchMode) {
      case "startsWith":
        return "STARTS_WITH";

      case "contains":
        return "CONTAINS";

      case "notContains":
        return "NOT_CONTAINS";

      case "endsWith":
        return "ENDS_WITH";

      case "equals":
        return "EQUALS";

      case "notEquals":
        return "NOT_EQUALS";

      default:
        throw new Error("Invalid match mode");
    }
  }
}
