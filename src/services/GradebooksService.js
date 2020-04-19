import HTTP from './BaseService';

class GradebooksService {
    async getGradebooks() {
        const response = await HTTP.get('/gradebooks');
        return response.data;
    }
    async getSingleGradebook(id) {
        const response = await HTTP.get(`/gradebooks/${id}`);
        return response.data;
    }
    async createGradebook(newGradebook) {
        const response = await HTTP.post('/gradebooks', newGradebook);
        return response.data;
    }
    async getTeachers() {
        const response = await HTTP.get('/teachers');
        return response.data;
    }
    async getSingleTeacher(id) {
        const response = await HTTP.get(`/teachers/${id}`);
        return response.data;
    }
    async createStudent(newStudent) {
        const response = await HTTP.post(`/gradebooks/${newStudent.gradebook_id}/students/create`, newStudent);
        return response.data;
    }
    async createTeacher(newTeacher) {
        const response = await HTTP.post('/teachers', newTeacher);
        return response.data;
    }
    async deleteGradebook(id) {
        const response = await HTTP.delete(`/gradebooks/${id}`);
        return response.data;
    }
    async register(credentials) {
        const response = await HTTP.post('/register', credentials);
        return response.data
    }
    async login(credentials) {
        const response = await HTTP.post('/login', credentials);
        return response.data
    }
    async getComments(gradebook_id) {
        const response = await HTTP.get(`/gradebooks/${gradebook_id}/comments`);
        return response.data;
    }
    async getSingleComment(gradebook_id, comment_id) {
        const response = await HTTP.get(`/gradebooks/${gradebook_id}/comments/${comment_id}`);
        return response.data;
    }
    async createComment(newComment) {
        const gradebook_id = newComment.gradebook_id;
        const response = await HTTP.post(`/gradebooks/${gradebook_id}/comments`, newComment);
        return response.data;
    }
    async getUser() {
        const response = await HTTP.get('/user');
        return response.data;
    }
    async deleteComment(gradebook_id, comment_id) {
        const response = await HTTP.delete(`/gradebooks/${gradebook_id}/comments/${comment_id}`);
        return response.data;
    }
}

const gradebooksService = new GradebooksService();

export default gradebooksService;
