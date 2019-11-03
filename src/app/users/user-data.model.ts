export interface UserData {
  id: string;
  firstname: string;
  midlename: string;
  lastname: string;
  gender: string;
  age: string;
  birthdate: string;
  status: string;
  contact: string;
  expertise: string;
  sss: string;
  tin: string;
  philhealth: string;
  avatar: string;
  activated: boolean;
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
