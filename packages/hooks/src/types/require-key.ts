export type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
