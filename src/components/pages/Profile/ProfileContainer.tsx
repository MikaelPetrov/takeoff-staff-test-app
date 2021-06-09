import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunks } from "../../../redux/reducers/profileReducer";
import Profile from "./Profile";

const ProfileContainer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunks.getProfile());
  }, [dispatch]);

  return <Profile />;
};

export default ProfileContainer;
