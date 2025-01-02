export interface City {
  stateId: number;
  name: string;
  code: number;
}

export interface State {
  id: number;
  name: string;
  acronym: string;
  cities: City[];
}

export interface Country {
  id: string;
  name: string;
  acronym: string;
  capital: string;
  coin: string;
  coinCode: string;
  regionGroup: string;
  economicGroups: string[];
  continent: string;
  ddi: string;
  states: State[];
}

export interface LocationData {
  countries: Country[];
}
