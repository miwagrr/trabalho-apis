import { Request, Response } from "express";
import { PostBusiness } from "../business/PostBusiness";
import { ApiResponse } from "../types";

const postBusiness = new PostBusiness();

const createResponse = (success: boolean, message: string, data?: any, status: number = 200): ApiResponse & { status: number } => {
    return { status, success, message, data };
};

export const buscarTodosOsPosts = (req: Request, res: Response) => {
    try {
        const posts = postBusiness.buscarTodosOsPosts();
        const response = createResponse(true, "Lista de posts obtida com sucesso.", posts, 200);
        return res.status(response.status).json(response);
    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 500);
        return res.status(response.status).json(response);
    }
};

export const criarPost = (req: Request, res: Response) => {
    try {
        const authorId = parseInt(req.header("User-Id") ?? "", 10);
        const { title, content } = req.body;

        if (isNaN(authorId)) {
            const response = createResponse(false, "ID de autor inválido no header.", undefined, 400);
            return res.status(response.status).json(response);
        }

        const novoPost = postBusiness.criarPost({ title, content, authorId });

        const response = createResponse(true, "Post criado com sucesso.", novoPost, 201);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const response = createResponse(false, error.message, undefined, 400);
        return res.status(response.status).json(response);
    }
};

export const atualizarPost = (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id ?? "", 10);

        if (isNaN(postId)) {
            const response = createResponse(false, "ID do Post inválido.", undefined, 400);
            return res.status(response.status).json(response);
        }

        const { title, content, published, id, authorId, createdAt } = req.body;

        if (id || authorId || createdAt) {
            const response = createResponse(false, "Não é permitido alterar ID, autor ou data de criação.", undefined, 400);
            return res.status(response.status).json(response);
        }

        const postAtualizado = postBusiness.atualizarPost(postId, { title, content, published });

        const response = createResponse(true, "Post atualizado com sucesso.", postAtualizado, 200);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const status = error.message.includes("não encontrado") ? 404 : 400;
        const response = createResponse(false, error.message, undefined, status);
        return res.status(response.status).json(response);
    }
};

export const deletarPost = (req: Request, res: Response) => {
    try {
        const postId = parseInt(req.params.id ?? "", 10);
        const userId = parseInt(req.header("User-Id") ?? "", 10);

        if (isNaN(postId) || isNaN(userId)) {
            const response = createResponse(false, "ID do Post ou ID do Usuário inválidos.", undefined, 400);
            return res.status(response.status).json(response);
        }

        postBusiness.deletarPost(postId, userId);

        const response = createResponse(true, "Post deletado com sucesso.", undefined, 200);
        return res.status(response.status).json(response);

    } catch (error: any) {
        const status = error.message.includes("não encontrado") ? 404 : 403; 
        const response = createResponse(false, error.message, undefined, status);
        return res.status(response.status).json(response);
    }
};