import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import "./App.css";
import AppLayout from "./components/layout";
import AppRoutes from "./core/routes/AppRoutes";

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
