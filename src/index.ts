import {
  City,
  Country,
  LocationData,
  State,
} from './services/countries.interface';
import { Countries } from './services/countries.service';

/**
 * Main object that exposes the global-locations library services
 *
 * @namespace GlobalLocations
 */
export const GlobalLocations = {
  /**
   * Service for accessing country, state, and city data
   */
  Countries,
};

export { City, Countries, Country, LocationData, State };
