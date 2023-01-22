export const getLocalStorage = <T>(n: string): T => (n === 'token' ? localStorage.getItem(n) : JSON.parse(localStorage.getItem(n) as string));
export const setLocalStorage = <T>(n: string, o: T): void => localStorage.setItem(n, typeof o === 'string' ? o : JSON.stringify(o));
export const removeLocalStorage = (n: string): void => localStorage.removeItem(n);
