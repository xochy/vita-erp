import type { User, UserLinks } from "./User";

export interface UserResponse {
  links: UserLinks;
  data:  User;
}
