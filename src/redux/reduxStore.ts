import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
  usersPage: usersReducer,
  // profilePage: profileReducer,
  // filesPage: filesReducer,
  // and etc...
});

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

type TypeRootReducer = typeof rootReducer;
export type TypeDispatch = typeof store.dispatch;
export type TypeAppState = ReturnType<TypeRootReducer>;
export type InferThunksType<A extends Action = Action, R = Promise<void>> =
  ThunkAction<R, TypeAppState, unknown, A>;
export type InferActionsType<T> = T extends {
  [key: string]: (...args: any) => infer U;
}
  ? U
  : never;

export default store;
