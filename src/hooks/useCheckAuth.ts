import { useEffect } from "react";
import { useHistory } from "react-router";
import { Page, paths } from "../core/routes/constants";
import { getJwtPairFromLocalStorage } from "../utils/helper";

export function useCheckAuth(): void {
  const history = useHistory();

  useEffect(() => {
    const curJwtPair = getJwtPairFromLocalStorage();

    if (!curJwtPair.access_token) {
      history.push(paths[Page.LOGIN]);
    }
    // eslint-disable-next-line
  }, []);
}
