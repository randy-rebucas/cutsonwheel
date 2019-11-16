export interface BookNow {
  schedule: Date;
  customerId: string;
  assistantId: string;
  status: string;
  services: Services[];
}

export interface Services {
  type: string;
  duration: string;
  price: string;
}
