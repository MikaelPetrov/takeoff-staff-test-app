import { Method, TypeUsers } from "../type";

export function getTitleMethod(user: TypeUsers, method: string) {
  return method === Method.CREATE
    ? `User creation:`
    : `Editing user (${user.email}):`;
}
