import axios from "axios";
import { TypeUsers } from "../../components/pages/Users/type";
import { InferActionsType, InferThunksType } from "../reduxStore";
import {
  SET_FILTERED_USERS,
  SET_METHOD,
  SET_SEARCH_VALUE,
  SET_USER,
  SET_USERS,
} from "./actions";

type TypeInitialState = typeof initialState;
type TypeAction = InferActionsType<typeof actions>;
type TypeThunk = InferThunksType<TypeAction>;

const initialState = {
  user: null as TypeUsers | null,
  users: [] as TypeUsers[],
  filteredUsers: [] as TypeUsers[],
  searchValue: "" as string,
  method: "" as string,
};

const usersReducer = (
  state = initialState,
  action: TypeAction
): TypeInitialState => {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_USERS:
      return { ...state, users: action.payload };
    case SET_FILTERED_USERS:
      return { ...state, filteredUsers: action.payload };
    case SET_SEARCH_VALUE:
      return { ...state, searchValue: action.payload };
    case SET_METHOD:
      return { ...state, method: action.payload };
    default:
      return state;
  }
};

export const actions = {
  setUser: (user: TypeUsers | null) =>
    ({
      type: SET_USER,
      payload: user,
    } as const),
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

  // if we have api data...
  // deleteUser:
  //   (key: string): TypeThunk =>
  //   async (dispatch) => {
  //     await axios.delete("mocks/getUsers.json" + key);
  //     dispatch(thunks.getUsers());
  //   },
};

export default usersReducer;
