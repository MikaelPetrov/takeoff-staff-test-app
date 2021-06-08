import { memo } from "react";
import AppRoute from "./AppRoute";
import { getRoutes } from "./routes";

const AppRoutes: React.FC = () => {
  return (
    <>
      {getRoutes().map((route) => (
        <AppRoute
          key={route.type}
          exact={route.exact}
          path={route.path}
          isPrivate={false}
        >
          {route.component}
        </AppRoute>
      ))}
    </>
  );
};

export default memo(AppRoutes);
