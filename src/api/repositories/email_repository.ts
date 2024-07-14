import { http } from '../http';

export class EmailRepository {

    async getEmailsByTeam(team: string){
        try {
            const token = await localStorage.getItem('accessToken');
            const response = await http.get(`/emails/team/${team}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }

    async createEmail(email: string, team: string, role: string){
        try {
            const token = await localStorage.getItem('accessToken');
            const response = await http.post('/create-email', {
                email,
                team,
                role
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }

    async getAllEmail(){
        try {
            const token = await localStorage.getItem('accessToken');
            const response = await http.get(`/emails`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }

    async deleteEmail(email: string){
        try {
            const token = await localStorage.getItem('accessToken');
            const response = await http.delete(`/delete-email/${email}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }
}