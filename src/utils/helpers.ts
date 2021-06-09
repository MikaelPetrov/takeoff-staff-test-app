import { TypeUsers } from "../components/pages/Users/types";

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

export function toFindIndex(array: TypeUsers[], key: string) {
  const elemIdx = array.findIndex((obj) => obj.key === key);
  return elemIdx;
}

export function toEditUser(
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
