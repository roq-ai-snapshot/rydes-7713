import { EmployeeInterface } from 'interfaces/employee';
import { UserInterface } from 'interfaces/user';

export interface CompanyInterface {
  id?: string;
  name: string;
  user_id: string;
  employee?: EmployeeInterface[];
  user?: UserInterface;
  _count?: {
    employee?: number;
  };
}
