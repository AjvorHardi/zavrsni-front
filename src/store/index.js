import Vuex from 'vuex';
import Vue from 'vue';
import gradebooksService from '../services/GradebooksService';
import HTTP from '../services/BaseService';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        gradebooks: [],
        gradebook: {},
        teachers: [],
        teacher: {},
        token: "",
        searchTerm: "",
        endIndex: 10,
        user: {}
    },
    mutations: {
        SET_GRADEBOOKS(state, gradebooks) {
            state.gradebooks = gradebooks;
        },
        SET_SINGLE_GRADEBOOK(state, gradebook) {
            state.gradebook = gradebook;
        },
        SET_TEACHERS(state, teachers) {
            state.teachers = teachers;
        },
        SET_SINGLE_TEACHER(state, teacher) {
            state.teacher = teacher;
        },
        CREATE_GRADEBOOK(state, newGradebook) {
            state.gradebooks.push(newGradebook);
        },
        CREATE_STUDENT(state, newStudent) {
            const razred = state.gradebooks.filter(gradebook => 
                gradebook.id == newStudent.gradebook_id);
            razred[0].student.push(newStudent);
        },
        CREATE_TEACHER(state, newTeacher) {
            state.teachers.push(newTeacher);
        },
        DELETE_GRADEBOOK(state, id) {
            state.gradebooks.splice(state.gradebooks.findIndex(gradebook => gradebook.id === id), 1);   
        },
        SET_USER_DATA(state, resp) {
            state.token = resp.token;
            localStorage.setItem('token', resp.token);
            HTTP.defaults.headers.Authorization = `Bearer ${resp.token}`;
        },
        CLEAR_USER_DATA() {
            localStorage.removeItem('token');
            location.reload();
        },
        LOAD(state) {
            state.endIndex += 10;
        },
        SET_SEARCH_TERM(state, searchTerm) {
            state.searchTerm = searchTerm;
        },
        SET_COMMENTS(state, {gradebook_id, comments}) {
            state.gradebooks[gradebook_id] = comments;
        },
        SET_SINGLE_COMMENT(state, {gradebook_id, comment_id, comment}) {
            state.gradebooks[gradebook_id].comments[comment_id] = comment;
        },
        CREATE_COMMENT(state, newComment) {
            state.gradebook.comment.push(newComment);
        },
        SET_USER(state, user) {
            state.user = user;
        },
        DELETE_COMMENT(state, {gradebook_id, comment_id}) {
            const gradebook = state.gradebooks[gradebook_id];
            gradebook.comment.splice(state.gradebooks.findIndex(comment => comment.id === comment_id), 1);   
        },
    },
    actions: {
        async getGradebooks({commit}) {
            const gradebooks = await gradebooksService.getGradebooks();
            commit('SET_GRADEBOOKS', gradebooks);
        },
        async getSingleGradebook({commit}, id) {
            const gradebook = await gradebooksService.getSingleGradebook(id);
            commit('SET_SINGLE_GRADEBOOK', gradebook);
        },
        async getTeachers({commit}) {
            const teachers = await gradebooksService.getTeachers();
            commit('SET_TEACHERS', teachers);
        },
        async getSingleTeacher({commit}, id) {
            const teacher = await gradebooksService.getSingleTeacher(id);
            commit('SET_SINGLE_TEACHER', teacher);
        },
        async createGradebook({commit}, newGradebook) {
            await gradebooksService.createGradebook(newGradebook);
            commit('CREATE_GRADEBOOK', newGradebook);
        },
        async createStudent({commit}, newStudent) {
            gradebooksService.createStudent(newStudent);
            commit('CREATE_STUDENT', newStudent);
        },
        async createTeacher({commit}, newTeacher) {
            gradebooksService.createTeacher(newTeacher);
            commit('CREATE_TEACHER', newTeacher);
        },
        async deleteGradebook({commit}, id) {
            const gradebook = await gradebooksService.deleteGradebook(id);
            console.log(gradebook);
            commit('DELETE_GRADEBOOK', id);
        },
        async registerAction({commit}, credentials) {
            const resp = await gradebooksService.register(credentials);
            commit('SET_USER_DATA', resp);
        },
        async loginAction({commit}, credentials) {
            const resp = await gradebooksService.login(credentials);
            commit('SET_USER_DATA', resp);
        },
        logoutAction({commit}) {
            commit('CLEAR_USER_DATA');
        },
        load({commit}) {
            commit('LOAD');
        },
        setSearchTerm({commit}, searchTerm) {
            commit('SET_SEARCH_TERM', searchTerm);
        },
        async getComments({commit}, gradebook_id) {
            const comments = await gradebooksService.getComments(gradebook_id);
            commit('SET_COMMENTS', {gradebook_id, comments});
        },
        async getSingleComment({commit}, {gradebook_id, comment_id}) {
            const comment = await gradebooksService.getSingleComment(gradebook_id, comment_id);
            commit('SET_SINGLE_COMMENT', {gradebook_id, comment_id, comment});
        },
        async createComment({commit}, newComment) {
            gradebooksService.createComment(newComment);
            commit('CREATE_COMMENT', newComment);
        },
        async getUser({commit}) {
            const user = await gradebooksService.getUser();
            commit('SET_USER', user);
        },
        async deleteComment({commit}, {gradebook_id, comment_id}) {
            await gradebooksService.deleteComment(gradebook_id, comment_id);
            commit('DELETE_COMMENT', {gradebook_id, comment_id});
        },


    },
    getters: {
        gradebooks: state => state.gradebooks,
        gradebook: state => state.gradebook,
        teachers: state => state.teachers,
        teacher: state => state.teacher,
        availableTeachers: state => {
            const teachers = state.teachers;
            const gradebooks = state.gradebooks;
            const occupied = [];
            gradebooks.forEach(gradebook => {
                occupied.push(gradebook.teacher_id);
            }
            );
            return teachers.filter(teacher => occupied.indexOf(teacher.id) === -1);
        },
        availableGradebooks: state => {
            const gradebooks = state.gradebooks;
            return gradebooks.filter(gradebook => gradebook.teacher_id == null)
        },
        searchedGradebooks: state => {
            const gradebooks = state.gradebooks;
            return (searchParam) => {
                return gradebooks.filter(gradebook =>  gradebook.title.toLowerCase().includes(searchParam.toLowerCase()))
            }
        },
        searchTerm: state => state.searchTerm,
        gradebooksToShow: (state, { searchedGradebooks }) => {
            const gradebooks = searchedGradebooks(state.searchTerm);
            const startIndex = 0;
            const endIndex = state.endIndex;
            return gradebooks.slice(startIndex, endIndex);
        },
        isAuthenticated: state => !!state.token,
        endIndex: state => state.endIndex,
        loadButtonNeeded: (state, { searchedGradebooks }) => {
            const gradebooks = searchedGradebooks(state.searchTerm);
            return state.endIndex >= gradebooks.length
        },
        getCertainTeacher: (state, id) => {
            return state.teachers.filter(teacher => teacher.id === id)
        },
        searchedTeachers: state => {
            const teachers = state.teachers;
            return (searchParam) => {
                return teachers.filter(teacher =>  teacher.firstName.toLowerCase().includes(searchParam.toLowerCase()))
            }
        },
        teachersToShow: (state, {searchedTeachers}) => {
            const teachers = searchedTeachers(state.searchTerm);
            return teachers
        },
        user: state => state.user
    }
})