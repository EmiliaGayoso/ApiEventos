import User from '../entities/User';
export declare const createToken: (user: User) => string;
export declare const descriptedToken: (ptoken: string) => Promise<any>;
