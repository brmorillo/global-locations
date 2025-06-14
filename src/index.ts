import {
  City,
  Country,
  LocationData,
  State,
} from './services/countries.interface';
import { Countries } from './services/countries.service';

/**
 * Objeto principal que expõe os serviços da biblioteca global-locations
 *
 * @namespace GlobalLocations
 */
export const GlobalLocations = {
  /**
   * Serviço para acesso a dados de países, estados e cidades
   */
  Countries,
};

export { City, Countries, Country, LocationData, State };
