import express from 'express';
import { 
    verificarUser, 
    listarTodosOsUsuarios, 
    criarUsuario, 
    filtrarUsersPorIdade, 
    deletarUsersInativos, 
    getUserById, 
    atualizarUser 
} from '../controller/UserController';

export const userRouter = express.Router();

userRouter.post('/verify', verificarUser);
userRouter.get('/', listarTodosOsUsuarios);
userRouter.post('/', criarUsuario);

userRouter.get("/age-range", filtrarUsersPorIdade); 

userRouter.delete("/cleanup-inactive", deletarUsersInativos);

userRouter.get("/:id", getUserById); 
userRouter.put("/:id", atualizarUser);