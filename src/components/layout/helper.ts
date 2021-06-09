import { Page, paths } from "../../core/routes/constants";

export function getSelectedKeys(location: string) {
  switch (location) {
    case paths[Page.PROFILE]:
      return "1";
    case paths[Page.USERS]:
      return "2";
    case paths[Page.SETTINGS]:
      return "3";
    default:
      return "0";
  }
}
