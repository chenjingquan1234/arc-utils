export const local = {
  getItem(key: string) {
    const res: any = localStorage.getItem(key);
    return JSON.parse(res);
  },
  setItem(key: string, param: any) {
    localStorage.setItem(key, JSON.stringify(param));
  },
};
export const session = {
  getItem(key: string) {
    const res: any = sessionStorage.getItem(key);
    return JSON.parse(res);
  },
  setItem(key: string, param: any) {
    sessionStorage.setItem(key, JSON.stringify(param));
  },
};
