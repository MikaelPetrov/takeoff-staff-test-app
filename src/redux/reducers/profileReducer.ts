import axios from "axios";
import { getJwtPairFromLocalStorage } from "../../utils/helper";
import { InferActionsType, InferThunksType } from "../reduxStore";
import { SET_PROFILE } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  profile: {} as {},
};

const profileReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setProfile: (profile: {}) =>
    ({
      type: SET_PROFILE,
      payload: profile,
    } as const),
};

export const thunks = {
  getProfile: (): TypeThunk => async (dispatch) => {
    const curJwtPair = getJwtPairFromLocalStorage();
    const queryConfig = {
      headers: {
        Authorization: `${curJwtPair.token_type} ${curJwtPair.access_token}`,
      },
    };

    const response = await axios.get("mocks/getProfile.json", queryConfig);
    dispatch(actions.setProfile(response.data));
  },
};

export default profileReducer;
