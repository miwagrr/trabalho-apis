import { Post, User } from "./types";

export const users: User[] = [
    {id: 1, name: "Gustavo", email: "itsgusm@email.com", role: "admin", age: 20},
    {id: 2, name: "Julia", email: "jjulia@email.com", role: "user", age: 21},
    {id: 3, name: "Sanio", email: "saniors@email.com", role: "user", age: 22},
    {id: 4, name: "Joyce", email: "joycems@email.com", role: "admin", age: 20},
];

export const posts: Post[] = [
    { id: 1, title: "Post 1", content: "Conteúdo do post 1", authorId: 1, createdAt: new Date(), published: false },
    { id: 2, title: "Post 2", content: "Conteúdo do post 2", authorId: 2, createdAt: new Date(), published: false },
];

export let contadorUser = users.length > 0 ? users[users.length - 1].id : 0;
export let contadorPost = posts.length > 0 ? posts[posts.length - 1].id : 0;

export const getNextUserID = (): number => {
    contadorUser++;
    return contadorUser;
};

export const getNextPostId = (): number => {
    contadorPost++;
    return contadorPost;
};