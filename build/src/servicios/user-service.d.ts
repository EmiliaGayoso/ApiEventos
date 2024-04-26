export declare class UserService {
    verificarExistenciaUsuario(username: string, password: string): boolean;
    creacionToken(username: string): void;
    crearUsuario(fName: string, lName: string, username: string, password: string): boolean;
}
