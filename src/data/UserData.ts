import { users } from "../bd";
import { User } from "../types";

export class UserData {
    
    public buscarUserPorId(id: number): User | undefined {
        return users.find(u => u.id === id);
    }

    public criarUser(newUser: User): void {
        users.push(newUser);
    }

    public buscarUserPorEmail(email: string): User | undefined {
        const userFound = users.find(u => u.email === email);
        return userFound;
    }

    public listarTodosOsUsers(): User[] {
        return users;
    }

    public verificarUser(email: string): User | undefined {
        return users.find(u => u.email === email);
    }
    
    public findUserIndexById(id: number): number {
        return users.findIndex(u => u.id === id);
    }

    public atualizarUser(id: number, dadosAtualizados: User): void {
        const index = this.findUserIndexById(id);
        if (index > -1) {
            users[index] = dadosAtualizados;
        }
    }

    public substituirArrayDeUsuarios(novaLista: User[]): void {
        users.splice(0, users.length, ...novaLista);
    }
}