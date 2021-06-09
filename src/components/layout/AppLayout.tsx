import {
  LogoutOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { memo, ReactNode, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Page, paths } from "../../core/routes/constants";
import { useCheckAuth } from "../../hooks/useCheckAuth";
import { useCheckPath } from "../../hooks/useCheckPath";
import { thunks } from "../../redux/reducers/loginReducer";
import { actions } from "../../redux/reducers/usersReducer";
import { EXIT, menuItems, PROFILE, SETTINGS, USERS } from "./constants";
import { getSelectedKeys } from "./helper";

const { Content, Sider } = Layout;

type Props = {
  children: ReactNode;
};

const AppLayout: React.FC<Props> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  function onCollapse() {
    setIsCollapsed((prevState) => !prevState);
  }

  function onChangePage(route: string) {
    dispatch(actions.setMethod(""));
    dispatch(actions.setUser(null));
    history.push(route);
    if (route === paths[Page.LOGIN]) {
      dispatch(thunks.logout());
    }
  }

  function getIconMenu(type: string) {
    switch (type) {
      case PROFILE:
        return <UserOutlined />;
      case USERS:
        return <TeamOutlined />;
      case SETTINGS:
        return <ToolOutlined />;
      case EXIT:
        return <LogoutOutlined />;
      default:
        break;
    }
  }

  useCheckPath();
  useCheckAuth();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {location.pathname !== paths[Page.LOGIN] && (
        <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[getSelectedKeys(location.pathname)]}
          >
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={getIconMenu(item.type)}
                onClick={() => onChangePage(item.route)}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      )}
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>{props.children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(AppLayout);
