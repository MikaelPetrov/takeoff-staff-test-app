import React from "react";
import Files from "../../components/pages/Files";
import Login from "../../components/pages/Login";
import Profile from "../../components/pages/Profile";
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
      component: <Profile />,
    },
    {
      type: Page.USERS,
      path: paths[Page.USERS],
      component: <UsersContainer />,
    },
    {
      type: Page.FILES,
      path: paths[Page.FILES],
      component: <Files />,
    },
  ];
}
