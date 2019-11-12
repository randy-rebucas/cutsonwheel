export interface User {
  id: string;
  firstname: string;
  midlename: string;
  lastname: string;
  gender: string;
  age: string;
  birthdate: string;
  status: string;
  contact: string;
  classification: string;
  sss: string;
  tin: string;
  philhealth: string;
  avatar: string;
  activated: boolean;
  createdAt: Date;
  address: Address[];
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}
