import { reloadAuthorized } from './Authorized';

// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str?: string): string | string[] {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('antd-pro-authority') : str;
  
  // If no authority string, return default
  if (!authorityString) {
    return [];
  }
  
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    const parsed = JSON.parse(authorityString);
    // Handle cases: string, array, or other types
    if (Array.isArray(parsed)) {
      authority = parsed;
    } else if (typeof parsed === 'string') {
      authority = [parsed];
    } else if (parsed && typeof parsed === 'object') {
      // Handle object case (e.g., permissions object)
      authority = [];
    } else {
      authority = [];
    }
  } catch (e) {
    // If parsing fails, treat as string
    authority = [authorityString];
  }
  
  // Ensure it's always an array
  if (!Array.isArray(authority)) {
    return [];
  }
  
  return authority;
}

export function setAuthority(authority: string | string[]): void {
  // Handle undefined, null, or empty authority
  if (!authority) {
    localStorage.setItem('antd-pro-authority', JSON.stringify([]));
    reloadAuthorized();
    return;
  }
  
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('antd-pro-authority', JSON.stringify(proAuthority));
  // auto reload
  reloadAuthorized();
}