export interface User {
    id: number,
    name: string,
    email: string,
    role: "user" | "admin",
    age: number,
}

export interface Post {
    id: number,
    title: string,
    content: string,
    authorId: number,
    createdAt: Date,
    published: boolean
}

export interface ApiResponse {
    success: boolean,
    message: string,
    data?: any,
    total?: number,
}