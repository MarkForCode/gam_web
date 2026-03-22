import RenderAuthorize from '@gam/shared/components/Authorized';
import { getAuthority } from './authority';
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-mutable-exports */
let Authorized = RenderAuthorize(getAuthority());

// Reload the rights component
const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getAuthority());
};

/** Hard code block need it。 */
window.reloadAuthorized = reloadAuthorized;

export { reloadAuthorized };
export default Authorized;
