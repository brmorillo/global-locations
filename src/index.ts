import { ArrayUtils } from './services/array.service';
import { ConvertUtils } from './services/convert.service';
import { Countries } from './services/countries';
import { CryptUtils } from './services/crypt.service';
import { CuidUtils } from './services/cuid.service';
import { DateUtils } from './services/date.service';
import { MathUtils } from './services/math.service';
import { NumberUtils } from './services/number.service';
import { ObjectUtils } from './services/object.service';
import { RequestUtils } from './services/request.service';
import { SnowflakeUtils } from './services/snowflake.service';
import { SortUtils } from './services/sort.service';
import { StringUtils } from './services/string.service';
import { UUIDUtils } from './services/uuid.service';

export const Utils = {
  Array: ArrayUtils,
  Convert: ConvertUtils,
  Crypt: CryptUtils,
  Cuid: CuidUtils,
  Date: DateUtils,
  Math: MathUtils,
  Number: NumberUtils,
  Object: ObjectUtils,
  Request: RequestUtils,
  Snowflake: SnowflakeUtils,
  String: StringUtils,
  Uuid: UUIDUtils,
  Validation: Countries,
  Sort: SortUtils,
};

export { ArrayUtils } from './services/array.service';
export { ConvertUtils } from './services/convert.service';
export { Countries as ValidationUtils } from './services/countries';
export { CryptUtils } from './services/crypt.service';
export { CuidUtils } from './services/cuid.service';
export { DateUtils } from './services/date.service';
export { MathUtils } from './services/math.service';
export { NumberUtils } from './services/number.service';
export { ObjectUtils } from './services/object.service';
export { RequestUtils } from './services/request.service';
export { SnowflakeUtils } from './services/snowflake.service';
export { SortUtils } from './services/sort.service';
export { StringUtils } from './services/string.service';
export { UUIDUtils } from './services/uuid.service';

