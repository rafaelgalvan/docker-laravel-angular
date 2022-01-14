import { Address } from './address';
import { Customer } from './customer';
import { Employee } from './employee';

export class Company {
  id: string = '';
  name: string = '';
  cnpj: string = '';
  address: Address = new Address();
  customers: Customer[] = [];
  employees: Employee[] = [];
}
