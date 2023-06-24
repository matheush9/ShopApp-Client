import { Image } from "../../shared/interfaces/image-interface";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  images: Image[];
}
