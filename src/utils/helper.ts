import { TypeJwtPair } from "../components/pages/Login/type";
import { TypeUsers } from "../components/pages/Users/type";

export function setJwtPairToLocalStorage(curJwtPair: TypeJwtPair): void {
  localStorage.setItem("curJwtPair", JSON.stringify(curJwtPair));
}

export function removeJwtPairFromLocalStorage(): void {
  localStorage.removeItem("curJwtPair");
}

export function getJwtPairFromLocalStorage(): TypeJwtPair {
  return localStorage.getItem("curJwtPair")
    ? JSON.parse(localStorage.getItem("curJwtPair")!)
    : [];
}

export function toDeleteRow(array: TypeUsers[], key: string) {
  const users = array.filter((obj) => obj.key !== key);
  return users;
}

export function toUserValue(
  array: TypeUsers[],
  values: TypeUsers,
  key?: string
) {
  return {
    key: key ? key : `${array.length + 1}`,
    name: values.name,
    age: values.age,
    email: values.email,
  };
}

export function toUser(array: TypeUsers[], key: string) {
  const user = array.find((obj) => obj.key === key);
  return user;
}

export function toFindIndex(array: TypeUsers[], key: string) {
  const elemIdx = array.findIndex((obj) => obj.key === key);
  return elemIdx;
}

export function toEditUsers(
  index: number,
  values: TypeUsers,
  array: TypeUsers[]
) {
  const currentArray = [...array];
  currentArray.splice(index, 1, values);
  return currentArray;
}

export function toFilterUsers(array: TypeUsers[], value: string) {
  const filteredUsers = array.filter((obj) =>
    obj.name?.toLowerCase().includes(value?.toLowerCase())
  );
  return filteredUsers;
}
