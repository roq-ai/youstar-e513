import { PurchaseInterface } from 'interfaces/purchase';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface StarInterface {
  id?: string;
  name: string;
  price: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  purchase?: PurchaseInterface[];
  organization?: OrganizationInterface;
  _count?: {
    purchase?: number;
  };
}

export interface StarGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  organization_id?: string;
}
