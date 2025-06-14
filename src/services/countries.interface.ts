/**
 * Interface que representa uma cidade
 *
 * @interface City
 */
export interface City {
  /**
   * Identificador único da cidade
   */
  id: number;

  /**
   * Identificador do estado ao qual a cidade pertence
   */
  stateId: number;

  /**
   * Nome da cidade
   */
  name: string;

  /**
   * Dados adicionais opcionais da cidade
   */
  extra?: Object;
}

/**
 * Interface que representa um estado ou província
 *
 * @interface State
 */
export interface State {
  /**
   * Identificador único do estado
   */
  id: number;

  /**
   * Nome completo do estado
   */
  name: string;

  /**
   * Sigla ou abreviação do estado
   */
  acronym: string;

  /**
   * Lista de cidades pertencentes ao estado
   */
  cities: City[];
}

/**
 * Interface que representa um país
 *
 * @interface Country
 */
export interface Country {
  /**
   * Identificador único do país (geralmente código ISO)
   */
  id: string;

  /**
   * Nome completo do país
   */
  name: string;

  /**
   * Sigla ou abreviação do país
   */
  acronym: string;

  /**
   * Nome da capital do país
   */
  capital: string;

  /**
   * Nome da moeda utilizada no país
   */
  coin: string;

  /**
   * Código da moeda utilizada no país
   */
  coinCode: string;

  /**
   * Grupo regional ao qual o país pertence
   */
  regionGroup: string;

  /**
   * Grupos econômicos aos quais o país pertence
   */
  economicGroups: string[];

  /**
   * Continente onde o país está localizado
   */
  continent: string;

  /**
   * Código de discagem direta internacional do país
   */
  ddi: string;

  /**
   * Lista de estados ou províncias do país
   */
  states: State[];
}

/**
 * Interface que representa o conjunto completo de dados de localização
 *
 * @interface LocationData
 */
export interface LocationData {
  /**
   * Lista de todos os países disponíveis
   */
  countries: Country[];
}
