export interface UserData {
    id: number;
    last_login: Date;
    date_joined: Date;
    is_superuser: boolean;
    is_staff: boolean;
    is_active: boolean;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    groups: any;
    user_permissions: any;
  
  }