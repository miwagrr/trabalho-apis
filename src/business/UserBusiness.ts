import { UserData } from "../data/UserData";
import { PostData } from "../data/PostData";
import { User } from "../types";

export class UserBusiness {
    private userData = new UserData();
    private postData = new PostData();
    
    public criarUser(input: any) {
        const {id, name, email, role, age} = input;

        if(!id || !name || !email || !role || !age) {
            throw new Error('Dados incompletos. Por favor, forneça todos os campos necessários.');
        }
        if(this.userData.buscarUserPorId(id)) {
            throw new Error('ID já cadastrado. Insira um ID válido.');
        }
        if(this.userData.buscarUserPorEmail(email)) {
            throw new Error('Email já cadastrado. Insira um email válido.');
        }
        const novoUsuario: User = {id, name, email, role, age};
        this.userData.criarUser(novoUsuario);
        return novoUsuario;
    }
    
    public verify = (email: string) => {
        try {
            if (!email) {
                throw new Error("Campos faltantes")
            }

            const user = this.userData.buscarUserPorEmail(email) as any;
            if (!user) {
                throw new Error("Usuário inexistente");
            }

            return user;

        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    public listarTodosOsUsers() {
        return this.userData.listarTodosOsUsers();
    }
    
    public buscarUsuarioPeloNome(name: string) {
        let usuariosRetornados = this.userData.listarTodosOsUsers();
        if(name) {
            return usuariosRetornados.filter((u) => u.name.toLowerCase().includes(name.toString().toLowerCase()));
        }
        return usuariosRetornados;
    }

    public buscarUsuarioPorIdade(min: Number, max: Number) {
        const todosUsuarios = this.userData.listarTodosOsUsers();
        const minAge = Number(min);
        const maxAge = Number(max);
        return todosUsuarios.filter((u) => u.age >= minAge && u.age <= maxAge);
    }

    public buscarUsuarioPorId(id: number) {
        const user = this.userData.buscarUserPorId(id);
        if(!user) {
            throw new Error('Usuário não encontrado.');
        }
        return user;  
    }


    public atualizarUsuario = (id: number, input: any) => {
        const { name, email, role, age } = input;

        if (name === undefined || email === undefined || role === undefined || age === undefined) {
            throw new Error("Dados incompletos. Por favor, forneça todos os campos necessários.");
        }
        const usuarioQueSeraAtualizado = this.userData.buscarUserPorId(id);

        if(!usuarioQueSeraAtualizado) {
            throw new Error("Usuário não encontrado.");
        }

        const emailExiste = this.userData.buscarUserPorEmail(email);

        if(emailExiste && emailExiste.id !== id) {
            throw new Error("Email já cadastrado. Insira um email válido.");
        }

        usuarioQueSeraAtualizado.name = name;
        usuarioQueSeraAtualizado.email = email;
        usuarioQueSeraAtualizado.role = role;
        usuarioQueSeraAtualizado.age = age;

        this.userData.atualizarUser(id, usuarioQueSeraAtualizado);

        return usuarioQueSeraAtualizado;
    }
    
    public deletarUsuariosInativos(confirm: string) {
        if(confirm !== "true") {
            throw new Error("Parâmetro 'confirm=true' é obrigatório para esta operação.");
        }

        const todosPosts = this.postData.buscarTodosOsPosts();
        const todosUsuarios = this.userData.listarTodosOsUsers();
        const idsAutores = new Set(todosPosts.map((p) => p.authorId));
    
        const usuariosParaRemover = todosUsuarios.filter((u) => !idsAutores.has(u.id) && u.role !== 'admin');

        if(usuariosParaRemover.length === 0) {
            return [];
        }
        
        const usuariosParaManter = todosUsuarios.filter((u) => idsAutores.has(u.id) || u.role === 'admin');

        this.userData.substituirArrayDeUsuarios(usuariosParaManter);

        return usuariosParaRemover;
    }
}