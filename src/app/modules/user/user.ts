export interface User {
  id: string;
  name: Name;
  displayName: string;
  email: string;
  isSetupCompleted: boolean;
  phoneNumber: number;
  photoUrl: string;
  address: Address;
  roles: Role;
  gender: string;
  birthdate: Date;
  classification: string;
  sss: string;
  tin: string;
  philhealth: string;
  createdAt: Date;
}

export interface Role {
    assistant: boolean;
    client: boolean;
}

export interface Name {
  firstname: string;
  midlename: string;
  lastname: string;
}

export interface Address {
  address1: string;
  address2: string;
  city: string;
  province: string;
  postalCode: number;
  country: string;
}
