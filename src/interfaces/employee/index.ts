import { TransactionInterface } from 'interfaces/transaction';
import { UserInterface } from 'interfaces/user';
import { CompanyInterface } from 'interfaces/company';

export interface EmployeeInterface {
  id?: string;
  user_id: string;
  company_id: string;
  mobility_allowance: number;
  transaction?: TransactionInterface[];
  user?: UserInterface;
  company?: CompanyInterface;
  _count?: {
    transaction?: number;
  };
}
