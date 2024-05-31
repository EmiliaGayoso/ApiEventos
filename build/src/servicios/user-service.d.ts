export declare class UserService {
    verificarExistenciaUsuario(username: string, password: string): Promise<string>;
    crearUsuario(fName: string, lName: string, username: string, password: string): Promise<any>;
}
