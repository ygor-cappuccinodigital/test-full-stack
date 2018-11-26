import {Category} from "./Category";
import {User} from "./User";

export class Product {
    id: number;
    title: string;
    photo: string;
    categories: Category[];
    user: User;
    price: number;
}