import { Button, Form, Input, InputNumber } from "antd";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../../redux/reducers/usersReducer";
import {
  toEditUsers,
  toFindIndex,
  toUserValue,
} from "../../../../utils/helper";
import { Method, TypeUsers } from "../type";
import { EMAIL, formItems, NAME, NUMBER } from "./constants";
import { getTitleMethod } from "./helper";
import s from "./UserDetail.module.scss";

type Props = {
  user: TypeUsers | null;
  users: TypeUsers[];
  method: string;
};

const UserDetail: React.FC<Props> = (props) => {
  const dispatch = useDispatch();

  function getFormFields(type: string) {
    switch (type) {
      case EMAIL:
        return (
          <Form.Item
            name={["email"]}
            label="Email"
            rules={[{ required: true, type: "email" }]}
          >
            <Input />
          </Form.Item>
        );
      case NAME:
        return (
          <Form.Item name={["name"]} label="Name">
            <Input />
          </Form.Item>
        );
      case NUMBER:
        return (
          <Form.Item name={["age"]} label="Age">
            <InputNumber min={0} max={99} />
          </Form.Item>
        );
      default:
        return <></>;
    }
  }

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };
  /* eslint-enable no-template-curly-in-string */

  function onFinish(values: TypeUsers) {
    if (props.method === Method.CREATE) {
      const addedUser = toUserValue(props.users, values);
      dispatch(actions.setUsers(props.users.concat(addedUser)));

      // if we have api data...
      // dispatch(thunks.putUsers(addedUser));
    }

    if (props.method === Method.UPDATE) {
      const elemIdx = toFindIndex(props.users, props.user!.key);
      const editedUser = toUserValue(props.users, values, props.user!.key);
      const editedUsers = toEditUsers(elemIdx, editedUser, props.users);
      dispatch(actions.setUsers(editedUsers));

      // if we have api data...
      // dispatch(thunks.putUsers(editedUser));
    }
    dispatch(actions.setMethod(""));
    dispatch(actions.setUser(null));
  }

  function resetMethod() {
    dispatch(actions.setMethod(""));
    dispatch(actions.setUser(null));
  }

  return (
    <Form
      onFinish={onFinish}
      initialValues={{ ...props.user }}
      validateMessages={validateMessages}
    >
      <h1>{getTitleMethod(props.user!, props.method)}</h1>
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
