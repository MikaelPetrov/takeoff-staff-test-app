import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Page, paths } from "../../../core/routes/constants";
import { thunks } from "../../../redux/reducers/loginReducer";
import styles from "./Login.module.scss";
import { TypeLogin } from "./type";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  function onFinish(values: TypeLogin) {
    dispatch(thunks.login(values));
    history.push(paths[Page.PROFILE]);
  }

  return (
    <div className={styles["login"]}>
      <Form {...layout} onFinish={onFinish} initialValues={{ remember: true }}>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
