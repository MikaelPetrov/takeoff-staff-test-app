import axios from "axios";
import { TypeUsers } from "../../components/pages/Users/types";
import { InferActionsType, InferThunksType } from "../reduxStore";
import {
  SET_FILTERED_USERS,
  SET_METHOD,
  SET_SEARCH_VALUE,
  SET_USERS,
  SET_USER_KEY,
} from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  users: [] as TypeUsers[],
  filteredUsers: [] as TypeUsers[],
  searchValue: "" as string,
  userKey: "" as string,
  method: "" as string,
};

const usersReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_FILTERED_USERS:
      return { ...state, filteredUsers: action.payload };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case SET_USER_KEY:
      return { ...state, userKey: action.payload };
    case SET_METHOD:
      return { ...state, method: action.payload };
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
  setFilteredUsers: (filteredUsers: TypeUsers[]) =>
    ({
      type: SET_FILTERED_USERS,
      payload: filteredUsers,
    } as const),
  setSearchValue: (searchValue: string) =>
    ({
      type: SET_SEARCH_VALUE,
      payload: searchValue,
    } as const),
  setUserKey: (userKey: string) =>
    ({
      type: SET_USER_KEY,
      payload: userKey,
    } as const),
  setMethod: (method: string) =>
    ({
      type: SET_METHOD,
      payload: method,
    } as const),
};

export const thunks = {
  getUsers: (): TypeThunk => async (dispatch) => {
    const response = await axios.get("mocks/getUsers.json");
    dispatch(actions.setUsers(response.data));
  },

  // if we have api data...

  // putUsers:
  //   (values: TypeUsers): TypeThunk =>
  //   async (dispatch) => {
  //     await axios.put("mocks/getUsers.json", values);
  //     dispatch(thunks.getUsers());
  //   },

  // deleteUser:
  //   (key: string): TypeThunk =>
  //   async (dispatch) => {
  //     await axios.delete("mocks/getUsers.json" + key);
  //     dispatch(thunks.getUsers());
  //   },
};

export default usersReducer;
