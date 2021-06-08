import axios from "axios";
import { TypeUsers } from "../../components/pages/Users/types";
import { InferActionsType, InferThunksType } from "../reduxStore";
import { SET_USERS } from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  users: [] as TypeUsers[],
};

const usersReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setUsers: (users: TypeUsers[]) =>
    ({
      type: SET_USERS,
      payload: users,
    } as const),
};

export const thunks = {
  getTasks: (): TypeThunk => async (dispatch) => {
    const response = await axios.get("mocks/getUsers.json");
    dispatch(actions.setUsers(response.data));
  },
};

export default usersReducer;
