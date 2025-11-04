import React from "react"
import { UserCardHorizontal, User } from "../UserCardHorizontal/UserCardHorizontal"
import { Grid, GridItem } from "../Grid/Grid"
import { Divider } from "../Divider/Divider"

type UserListProps = {
  users: User[],
  onUserClick?: (user: User) => void,
}

export const UserList: React.FC<UserListProps> = ({ users, onUserClick }: UserListProps) => {
  return (
      <Grid columns={1} gap={2}>
      {users.map((user, index) => (
        <GridItem colSpan={1}>
          <UserCardHorizontal
            user={user}
            onClick={() => onUserClick?.(user)}
            />
          {index < users.length - 1 && <Divider />}
        </GridItem>
      ))}
      </Grid>
  );
};
