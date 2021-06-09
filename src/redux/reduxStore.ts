import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
} from "redux";
import thunk, { ThunkAction } from "redux-thunk";
import loginReducer from "./reducers/loginReducer";
import profileReducer from "./reducers/profileReducer";
import settingsReducer from "./reducers/settingsReducer";
import usersReducer from "./reducers/usersReducer";

const rootReducer = combineReducers({
  loginPage: loginReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  settingsPage: settingsReducer,
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
