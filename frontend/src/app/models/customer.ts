import { Address } from "./address";
import { Company } from "./company";

export class Customer {
  id: string = '';
  name: string = '';
  email: string = '';
  cpf: string = '';
  login: string = '';
  password: string = '';
  address: Address = new Address();
  company: Company = new Company();
  companies: Company[] = [];

}
