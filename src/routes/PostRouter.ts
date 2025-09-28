import express from 'express';
import { 
    buscarTodosOsPosts,
    criarPost,
    atualizarPost,
    deletarPost
} from '../controller/PostController';

export const postRouter = express.Router();

postRouter.get("/", buscarTodosOsPosts);

postRouter.post("/", criarPost);

postRouter.patch("/:id", atualizarPost);

postRouter.delete("/:id", deletarPost);