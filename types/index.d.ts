declare interface User {
  id?: string;
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  provider?: string;
  oauth_id?: string;
  created_at?: string;
  updated_at?: string;
}

declare interface CreateUserProps {
  username?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  password?: string;
  provider?: string;
  oauth_id?: string;
}

declare interface UpdateApiResponse {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
}

declare interface UpdateUserProps {
  id?: string;
  username?: string;
  email?: string;
}
