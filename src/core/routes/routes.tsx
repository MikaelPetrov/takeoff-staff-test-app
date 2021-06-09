import React from "react";
import Login from "../../components/pages/Login";
import ProfileContainer from "../../components/pages/Profile/ProfileContainer";
import SettingsContainer from "../../components/pages/Settings/SettingsContainer";
import UsersContainer from "../../components/pages/Users/UsersContainer";
import { Page, paths } from "./constants";
import { TypeRoute } from "./types";

export function getRoutes(): TypeRoute[] {
  return [
    {
      type: Page.LOGIN,
      path: paths[Page.LOGIN],
      component: <Login />,
      exact: true,
    },
    {
      type: Page.PROFILE,
      path: paths[Page.PROFILE],
      component: <ProfileContainer />,
    },
    {
      type: Page.USERS,
      path: paths[Page.USERS],
      component: <UsersContainer />,
    },
    {
      type: Page.SETTINGS,
      path: paths[Page.SETTINGS],
      component: <SettingsContainer />,
    },
  ];
}
