import {Category} from "./Category";

export class Post {
    id: number;
    categories: Category[];
    title: string;
    content: string;
    description: string;
    photo: string;
    user_id: number;
    created_at: number;
    update_at: number;
}