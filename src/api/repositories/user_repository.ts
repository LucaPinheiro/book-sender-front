import { http } from "../http";

export class UserRepository {

    async login(email: string, password: string) {
        try {
            const response = await http.post('/auth-user', {
                email,
                password
            })
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }
}