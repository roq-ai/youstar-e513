import { UserInterface } from 'interfaces/user';
import { StarInterface } from 'interfaces/star';
import { GetQueryInterface } from 'interfaces';

export interface PurchaseInterface {
  id?: string;
  user_id?: string;
  star_id?: string;
  certificate: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  star?: StarInterface;
  _count?: {};
}

export interface PurchaseGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  star_id?: string;
  certificate?: string;
}
