import {createContext} from "react";

interface User {
    id: number;
    name: string;
    // Add other properties as needed
}
interface IUserContext {
    user: User | any;
    setUser: (user: any) => void
}

export const UserContext = createContext<IUserContext | null>(null);