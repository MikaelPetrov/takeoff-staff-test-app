import { Button, Form, Input, InputNumber } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../redux/reducers/usersReducer";
import {
  toEditUser,
  toFindIndex,
  toUserValue,
} from "../../../../utils/helpers";
import { Method, TypeUsers } from "../types";
import { EMAIL, formItems, NAME, NUMBER } from "./constants";
import s from "./UserDetail.module.scss";

type Props = {
  users: TypeUsers[];
  userKey: string;
  method: string;
};

const UserDetail: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  function onFinish(values: TypeUsers) {
    if (props.method === Method.CREATE) {
      const addedUser = toUserValue(props.users, values);
      dispatch(actions.setUsers(props.users.concat(addedUser)));
      dispatch(actions.setMethod(""));

      // if we have api data...
      // dispatch(thunks.putUsers(addedUser));
      // dispatch(actions.setMethod(""));
    }

    if (props.method === Method.UPDATE) {
      const elemIdx = toFindIndex(props.users, props.userKey);
      const editedUser = toUserValue(props.users, values, props.userKey);
      const editedUsers = toEditUser(elemIdx, editedUser, props.users);
      dispatch(actions.setUsers(editedUsers));
      dispatch(actions.setMethod(""));

      // if we have api data...
      // dispatch(thunks.putUsers(editedUser));
      // dispatch(actions.setMethod(""));
    }
  }

  function getFormFields(type: string) {
    switch (type) {
      case NAME:
        return (
          <Form.Item name={["name"]} label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        );
      case EMAIL:
        return (
          <Form.Item name={["email"]} label="Email" rules={[{ type: "email" }]}>
            <Input />
          </Form.Item>
        );
      case NUMBER:
        return (
          <Form.Item
            name={["age"]}
            label="Age"
            rules={[{ type: "number", min: 0, max: 99 }]}
          >
            <InputNumber />
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  function getTitleMethod() {
    return props.method === Method.CREATE
      ? `User creation:`
      : `Editing user (key № ${props.userKey}):`;
  }

  function resetMethod() {
    dispatch(actions.setMethod(""));
  }

  return (
    <Form onFinish={onFinish} validateMessages={validateMessages}>
      <h1>{getTitleMethod()}</h1>
      <div className={s["fields"]}>
        {formItems.map((item) => (
          <div key={item.key}>{getFormFields(item.type)}</div>
        ))}
      </div>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={resetMethod}>
          Reset
        </Button>
      </Form.Item>
    </Form>
  );
};

export default memo(UserDetail);
