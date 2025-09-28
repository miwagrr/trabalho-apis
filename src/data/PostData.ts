import { posts } from "../bd";
import { Post } from "../types";

export class PostData {
    public buscarTodosOsPosts(): Post[] {
        return posts;
    }

    public buscarPostPorId(id: number): Post | undefined {
        return posts.find(p => p.id === id);
    }
    
    public criarPost(novoPost: Post): void {
        posts.push(novoPost);
    }

    public editarPost(id: number, dadosAtualizados: Post): void {
        const index = posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts[index] = dadosAtualizados;
        }
    }
    public deletarPost(id: number): void {
        const index = posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts.splice(index, 1);
        }
    }
}