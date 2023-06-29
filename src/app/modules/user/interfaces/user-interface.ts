import { Customer } from "../../customer/interfaces/customer-interface";
import { Image } from "../../shared/interfaces/image-interface";
import { Store } from "../../store/interfaces/store-interface";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  images: Image[];
  customer?: Customer;
  store?: Store;
}
