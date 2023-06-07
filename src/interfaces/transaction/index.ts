import { EmployeeInterface } from 'interfaces/employee';
import { MobilityProviderInterface } from 'interfaces/mobility-provider';

export interface TransactionInterface {
  id?: string;
  employee_id: string;
  mobility_provider_id: string;
  amount: number;
  transaction_date: Date;

  employee?: EmployeeInterface;
  mobility_provider?: MobilityProviderInterface;
  _count?: {};
}
