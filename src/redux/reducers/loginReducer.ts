import axios from "axios";
import { CodeResult, TypeLogin } from "../../components/pages/Login/type";
import {
  removeJwtPairFromLocalStorage,
  setJwtPairToLocalStorage,
} from "../../utils/helper";
import { InferActionsType, InferThunksType } from "../reduxStore";
import { SET_IS_AUTH } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  isAuth: false as boolean,
};

const loginReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_IS_AUTH:
      return { ...state, isAuth: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setIsAuth: (isAuth: boolean) =>
    ({
      type: SET_IS_AUTH,
      payload: isAuth,
    } as const),
};

export const thunks = {
  getToken:
    (remember: boolean): TypeThunk =>
    async (dispatch) => {
      const response = await axios.get("mocks/getToken.json");

      if (response.status === CodeResult.SUCCESS) {
        dispatch(actions.setIsAuth(true));

        if (remember) {
          setJwtPairToLocalStorage(response.data);
        }
      }
    },
  login:
    (login: TypeLogin): TypeThunk =>
    async (dispatch) => {
      const response = await axios.get("mocks/auth.json");

      if (
        response.status === CodeResult.SUCCESS &&
        response.data.email === login.email &&
        response.data.password === login.password
      ) {
        dispatch(thunks.getToken(login.remember));
      }

      // if we have api data...
      // const response = await axios.post("mocks/auth.json", login);
      // if (response.status === CodeResult.SUCCESS) {
      //   dispatch(thunks.getToken(login.remember));
      // }
    },
  logout: (): TypeThunk => async (dispatch) => {
    dispatch(actions.setIsAuth(false));
    removeJwtPairFromLocalStorage();
  },
};

export default loginReducer;
