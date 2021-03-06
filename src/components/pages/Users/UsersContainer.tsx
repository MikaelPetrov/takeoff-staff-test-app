import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actions, thunks } from "../../../redux/reducers/usersReducer";
import { TypeAppState } from "../../../redux/reduxStore";
import { toFilterUsers } from "../../../utils/helper";
import Users from "./Users";

const UsersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state: TypeAppState) => ({
    user: state.usersPage.user,
    users: state.usersPage.users,
    filteredUsers: state.usersPage.filteredUsers,
    searchValue: state.usersPage.searchValue,
    method: state.usersPage.method,
  }));

  useEffect(() => {
    dispatch(thunks.getUsers());
  }, [dispatch]);

  useEffect(() => {
    const filteredUsers = toFilterUsers(
      usersState.users,
      usersState.searchValue
    );
    dispatch(actions.setFilteredUsers(filteredUsers));
  }, [dispatch, usersState.users, usersState.searchValue]);

  return (
    <Users
      user={usersState.user}
      users={usersState.users}
      filteredUsers={usersState.filteredUsers}
      searchValue={usersState.searchValue}
      method={usersState.method}
    />
  );
};

export default memo(UsersContainer);
