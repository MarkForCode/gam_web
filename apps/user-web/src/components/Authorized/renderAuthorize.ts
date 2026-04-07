/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let CURRENT: string | string[] = [];

type CurrentAuthorityType = string | string[] | (() => typeof CURRENT);
/**
 * Use authority or getAuthority
 *
 * @param {string|()=>String} currentAuthority
 */
const renderAuthorize = <T>(Authorized: T): ((currentAuthority: CurrentAuthorityType) => T) => (
  currentAuthority: CurrentAuthorityType,
): T => {
  if (currentAuthority) {
    if (typeof currentAuthority === 'function') {
      CURRENT = currentAuthority();
    }
    if (
      Object.prototype.toString.call(currentAuthority) === '[object String]'
    ) {
      CURRENT = [currentAuthority as string];
    } else if (Array.isArray(currentAuthority)) {
      CURRENT = currentAuthority as string[];
    }
  } else {
    CURRENT = [];
  }
  return Authorized;
};

export { CURRENT };
export default <T>(Authorized: T) => renderAuthorize<T>(Authorized);