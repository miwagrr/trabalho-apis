import express from 'express';
import cors from 'cors';

export const app = express();

app.use(express.json());
app.use(cors());

// O app.listen() inicia o servidor, e está perfeito aqui.
app.listen(3003, () => {
    console.log('Servidor rodando na porta 3003');
});