import { http } from '../http';

export class EmailRepository {

    async getEmailsByTeam(team: string){
        try {
            const response = await http.get(`/emails/team/${team}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }
}