import * as countriesJson from './countries.json';
import { LocationData } from '../services/countries.interface';

/**
 * Dados de localização carregados do arquivo JSON
 *
 * @type {LocationData}
 */
export const countriesData: LocationData =
  countriesJson as unknown as LocationData;
