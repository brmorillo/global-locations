import {
  City,
  Country,
  LocationData,
  State,
} from './services/countries.interface';
import { Countries } from './services/countries.service';

export const GlobalLocations = {
  Countries,
};

export { City, Countries, Country, LocationData, State };
