import { TransactionInterface } from 'interfaces/transaction';
import { UserInterface } from 'interfaces/user';

export interface MobilityProviderInterface {
  id?: string;
  name: string;
  user_id: string;
  transaction?: TransactionInterface[];
  user?: UserInterface;
  _count?: {
    transaction?: number;
  };
}
