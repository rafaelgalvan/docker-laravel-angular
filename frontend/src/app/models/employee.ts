import { Address } from "./address";
import { Company } from "./company";

export class Employee {
  id: string = '';
  name: string = '';
  email: string = '';
  cpf: string = '';
  login: string = '';
  password: string = '';
  address: Address = new Address();
  companies: Company[] = [];

}
