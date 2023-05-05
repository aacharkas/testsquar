export type Admin = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  timezone: string;
  avatarId: string;
  avatar?: string | null;
};

export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
};
