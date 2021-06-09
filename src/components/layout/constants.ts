import { Page, paths } from "../../core/routes/constants";

export const PROFILE = "PROFILE";
export const USERS = "USERS";
export const SETTINGS = "SETTINGS";
export const EXIT = "EXIT";

export const menuItems = [
  {
    key: "1",
    type: PROFILE,
    name: "Profile",
    route: paths[Page.PROFILE],
  },
  {
    key: "2",
    type: USERS,
    name: "Users",
    route: paths[Page.USERS],
  },
  {
    key: "3",
    type: SETTINGS,
    name: "Settings",
    route: paths[Page.SETTINGS],
  },
  {
    key: "4",
    type: EXIT,
    name: "Exit",
    route: paths[Page.LOGIN],
  },
];
