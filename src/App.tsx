import React, { memo } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout";
import AppRoutes from "./core/routes/AppRoutes";
import store from "./redux/reduxStore";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Provider store={store}>
          <Switch>
            <AppLayout>
              <AppRoutes />
            </AppLayout>
          </Switch>
        </Provider>
      </Router>
    </div>
  );
};

export default memo(App);
