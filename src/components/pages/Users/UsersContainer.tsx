import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunks } from "../../../redux/reducers/usersReducer";
import { TypeAppState } from "../../../redux/reduxStore";
import Users from "./Users";

const UsersContainer: React.FC = () => {
  const dispatch = useDispatch();
  const usersState = useSelector((state: TypeAppState) => ({
    users: state.usersPage.users,
  }));

  useEffect(() => {
    dispatch(thunks.getTasks());
  }, [dispatch]);

  return <Users users={usersState.users} />;
};

export default memo(UsersContainer);
