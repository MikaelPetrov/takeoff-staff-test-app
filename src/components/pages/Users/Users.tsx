import { Button, Input, Space, Table } from "antd";
import { ChangeEvent, memo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../redux/reducers/usersReducer";
import { toDeleteRow, toUser } from "../../../utils/helper";
import { actionButtons, DELETE, EDIT } from "./constants";
import { Method, TypeUsers } from "./type";
import UserDetail from "./UserDetail";
import s from "./Users.module.scss";

const { Search } = Input;

type Props = {
  user: TypeUsers | null;
  users: TypeUsers[];
  filteredUsers: TypeUsers[];
  searchValue: string;
  method: string;
};

const Users: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  const columns = [
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Age", dataIndex: "age", key: "age" },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (filteredUsers: TypeUsers) => (
        <>
          {actionButtons.map((button) => (
            <Button
              key={button.id}
              onClick={getRowAction(button.type, filteredUsers.key)}
              type="link"
            >
              {button.action}
            </Button>
          ))}
        </>
      ),
    },
  ];

  function getRowAction(type: string, key: string) {
    switch (type) {
      case EDIT:
        return () => editRow(key);
      case DELETE:
        return () => deleteRow(key);
      default:
        break;
    }
  }

  function deleteRow(key: string) {
    const withDeletedUser = toDeleteRow(props.users, key);
    dispatch(actions.setUsers(withDeletedUser));

    // if we have api data...
    // dispatch(thunks.deleteUser(key));
  }

  function editRow(key: string) {
    const user = toUser(props.users, key);
    dispatch(actions.setUser(user!));
    dispatch(actions.setMethod(Method.UPDATE));
  }

  function addRow() {
    dispatch(actions.setMethod(Method.CREATE));
  }

  function onSearchValue(e: ChangeEvent<HTMLInputElement>) {
    dispatch(actions.setSearchValue(e.currentTarget.value));
  }

  function resetFilter() {
    dispatch(actions.setSearchValue(""));
  }

  return (
    <div className={s["users"]}>
      {props.method ? (
        <UserDetail
          users={props.users}
          user={props.user}
          method={props.method}
        />
      ) : (
        <>
          <div className={s["users__input"]}>
            <Space direction="vertical">
              <Search
                placeholder="Search user"
                value={props.searchValue}
                onChange={onSearchValue}
                style={{ width: "300px" }}
                enterButton
              />
            </Space>
          </div>
          {props.filteredUsers.length ? (
            <>
              <Table
                columns={columns}
                dataSource={props.filteredUsers}
                pagination={{ pageSize: 10 }}
              />
              <Button type="primary" onClick={addRow}>
                Add user
              </Button>
            </>
          ) : (
            <Button type="primary" onClick={resetFilter}>
              Reset
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default memo(Users);
