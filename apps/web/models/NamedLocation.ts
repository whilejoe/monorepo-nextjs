import { Location } from "models/Location";
export interface NamedLocation extends Location {
  name: string;
  id?: string;
}
