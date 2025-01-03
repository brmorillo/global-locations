// Export individual utilities para ESM direto
export * from './services/locations.service';

// Export default como um único objeto
import * as locations from './services/locations.service';

const Locations = {
  ...locations,
};

export default Locations;
