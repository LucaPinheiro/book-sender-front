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

    async sendEmail(team: string, subject: string, text: string, pdfPath: FileList){
        try {
            const token = await localStorage.getItem('accessToken');
            const formData = new FormData();
            
            formData.append('team', team.toUpperCase());
            formData.append('subject', subject);
            formData.append('text', text);
            formData.append('pdf', pdfPath[0]);

            const response = await http.post('/send-email', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            return response;
        } catch (error: any) {
            throw error.response;
        }
    }
}