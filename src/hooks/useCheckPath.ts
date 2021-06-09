import { useEffect } from "react";
import { useHistory } from "react-router";
import { useLocation } from "react-router-dom";
import { Page, paths } from "../core/routes/constants";

export function useCheckPath(): void {
  const history = useHistory();
  const location = useLocation();

  function checkedPath(location: string) {
    if (
      location !== paths[Page.PROFILE] &&
      location !== paths[Page.SETTINGS] &&
      location !== paths[Page.USERS]
    ) {
      return true;
    } else {
      return false;
    }
  }

  useEffect(() => {
    if (checkedPath(location.pathname)) {
      history.push(paths[Page.LOGIN]);
    }
    // eslint-disable-next-line
  }, []);
}
