import { memo } from "react";
import { TypeUsers } from "./types";

type Props = {
  users: TypeUsers[];
};

const Users: React.FC<Props> = (props) => {
  return (
    <div>
      {props.users.map((user) => (
        <div key={user.key}>{user.name}</div>
      ))}
    </div>
  );
};

export default memo(Users);
