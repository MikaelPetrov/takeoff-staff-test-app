import { FileOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "antd/dist/antd.css";
import React, { memo, ReactNode, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Page, paths } from "../../core/routes/constants";
import { FILES, menuItems, PROFILE, USERS } from "./constants";

const { Content, Footer, Sider } = Layout;

type Props = {
  children: ReactNode;
};

const AppLayout: React.FC<Props> = (props) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const history = useHistory();

  function onCollapse() {
    setIsCollapsed((prevState) => !prevState);
  }

  function getIconMenu(type: string) {
    switch (type) {
      case PROFILE:
        return <UserOutlined />;
      case USERS:
        return <TeamOutlined />;
      case FILES:
        return <FileOutlined />;
      default:
        break;
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {location.pathname !== paths[Page.LOGIN] && (
        <Sider collapsible collapsed={isCollapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
            {menuItems.map((item) => (
              <Menu.Item
                key={item.key}
                icon={getIconMenu(item.type)}
                onClick={() => history.push(item.route)}
              >
                {item.name}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
      )}
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>{props.children}</Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
};

export default memo(AppLayout);
