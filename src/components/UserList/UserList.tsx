import React from "react";
import { View, StyleSheet } from "react-native";
import { UserCardHorizontal } from "../UserCardHorizontal/UserCardHorizontal";
import type { User } from "../UserCardHorizontal/UserCardHorizontal";
import Constants from "../../constants/constants";

export interface UserListProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, onUserClick }: UserListProps) => {
  return (
    <View style={styles.container}>
      {users.map((user, index) => (
        <View key={user.id} style={styles.itemContainer}>
          <UserCardHorizontal
            user={user}
            onClick={() => onUserClick?.(user)}
          />
          {index < users.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Constants.styles.backgroundColor.WHITE,
    borderRadius: Constants.styles.borderRadius.MEDIUM,
    borderWidth: Constants.styles.borderWidth.THIN,
    borderColor: Constants.styles.borderColor.LIGHT,
    padding: Constants.styles.spacing.MEDIUM,
  },
  itemContainer: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: Constants.styles.borderColor.LIGHT,
    marginVertical: Constants.styles.spacing.SMALL,
  },
});
