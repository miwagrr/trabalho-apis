import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { ApiResponse } from "../types";

const userBusiness = new UserBusiness();

const createResponse = (success: boolean, message: string, data?: any, status: number = 200): ApiResponse & { status: number } => {
    return { status, success, message, data };
};

export const verificarUser = (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        const user = userBusiness.verify(email);

        const response = createResponse(true, "Usuário verificado com sucesso.", user, 200);
        return res.status(response.status).json(response);
    } catch (error: any) {
        const status = error.message.includes("inexistente") ? 404 : 400;
        const response = createResponse(false, error.message, undefined, status);
        return res.status(response.status).json(response);
    }
};

export const listarTodosOsUsuarios = (req: Request, res: Response) => {
    try {
        const users = userBusiness.listarTodosOsUsers();
        const response = createResponse(true, "Lista de usuários obtida com sucesso.", users, 200);
        return res.status(response.status).json(response);
    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 500);
        return res.status(response.status).json(response);
    }
};

export const criarUsuario = (req: Request, res: Response) => {
    try {
        const { id, name, email, role, age } = req.body;
        const newUser = userBusiness.criarUser({ id, name, email, role, age });

        const response = createResponse(true, "Usuário criado com sucesso.", newUser, 201);
        return res.status(response.status).json(response);
    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 409); 
        return res.status(response.status).json(response);
    }
};

export const getUserById = (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id ?? "", 10);

        if (isNaN(userId)) {
            const response = createResponse(false, "Esse ID é inválido", undefined, 400);
            return res.status(response.status).json(response);
        }

        const user = userBusiness.buscarUsuarioPorId(userId);

        const response = createResponse(true, "Usuário encontrado com sucesso.", user, 200);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const status = error.message.includes("não encontrado") ? 404 : 400;
        const response = createResponse(false, error.message, undefined, status);
        return res.status(response.status).json(response);
    }
};

export const filtrarUsersPorIdade = (req: Request, res: Response) => {
    try {
        const { min, max } = req.query;

        const minAge = parseInt(min as string, 10);
        const maxAge = parseInt(max as string, 10);

        if (isNaN(minAge) || isNaN(maxAge)) {
            const response = createResponse(false, "Valor inválido: 'min' e 'max' devem ser números.", undefined, 400);
            return res.status(response.status).json(response);
        }

        const filteredUsers = userBusiness.buscarUsuarioPorIdade(minAge, maxAge);
        
        const response = createResponse(true, "Busca por faixa etária realizada com sucesso.", filteredUsers, 200);
        return res.status(response.status).json(response);
        
    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 400);
        return res.status(response.status).json(response);
    }
};

export const atualizarUser = (req: Request, res: Response) => {
    try {
        const userId = parseInt(req.params.id ?? "", 10);
        const { name, email, role, age } = req.body;

        const updatedUser = userBusiness.atualizarUsuario(userId, { name, email, role, age });

        const response = createResponse(true, "Usuário atualizado com sucesso.", updatedUser, 200);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const status = error.message.includes("não encontrado") ? 404 : 400;
        const response = createResponse(false, error.message, undefined, status);
        return res.status(response.status).json(response);
    }
};

export const deletarUsersInativos = (req: Request, res: Response) => {
    try {
        const { confirm } = req.query;

        const removedUsers = userBusiness.deletarUsuariosInativos(confirm as string);
        
        if (removedUsers.length === 0) {
            const response = createResponse(true, "Nenhum usuário inativo encontrado para remoção.", [], 200);
            return res.status(response.status).json(response);
        }

        const response = createResponse(true, `${removedUsers.length} usuários inativos removidos.`, removedUsers, 200);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 400);
        return res.status(response.status).json(response);
    }
};