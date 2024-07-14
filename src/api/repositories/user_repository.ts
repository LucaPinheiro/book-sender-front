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
    
    async getUser() {
        try {
            const token = await localStorage.getItem('accessToken');
            const response = await http.get('/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }
}