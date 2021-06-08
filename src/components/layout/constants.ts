import { Page, paths } from "../../core/routes/constants";

export const PROFILE = "PROFILE";
export const USERS = "USERS";
export const FILES = "FILES";

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
    type: FILES,
    name: "Files",
    route: paths[Page.FILES],
  },
];
