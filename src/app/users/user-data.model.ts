export interface UserData {
  id: string;
  firstname: string;
  midlename: string;
  lastname: string;
  gender: string;
  age: string;
  contact: string;
  birthdate: string;
  status: string;
  addresses: Address[];
}

export interface Address {
  current: boolean;
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}
