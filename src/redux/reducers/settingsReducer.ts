import axios from "axios";
import { getJwtPairFromLocalStorage } from "../../utils/helper";
import { InferActionsType, InferThunksType } from "../reduxStore";
import { SET_SETTINGS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  settings: {} as {},
};

const settingsReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_SETTINGS:
      return { ...state, settings: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setSettings: (settings: {}) =>
    ({
      type: SET_SETTINGS,
      payload: settings,
    } as const),
};

export const thunks = {
  getSettings: (): TypeThunk => async (dispatch) => {
    const curJwtPair = getJwtPairFromLocalStorage();
    const queryConfig = {
      headers: {
        Authorization: `${curJwtPair.token_type} ${curJwtPair.access_token}`,
      },
    };

    const response = await axios.get("mocks/getSettings.json", queryConfig);
    dispatch(actions.setSettings(response.data));
  },
};

export default settingsReducer;
