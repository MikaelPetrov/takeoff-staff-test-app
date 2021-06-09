import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunks } from "../../../redux/reducers/settingsReducer";
import Settings from "./Settings";

const SettingsContainer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.getSettings());
  }, [dispatch]);

  return <Settings />;
};

export default SettingsContainer;
