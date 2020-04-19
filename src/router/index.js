import Vue from 'vue'
import VueRouter from 'vue-router'
import AppGradebooks from '../components/AppGradebooks'
import SingleGradebook from '../components/SingleGradebook'
import CreateGradebook from '../components/CreateGradebook'
import TeachersComponent from '../components/TeachersComponent'
import CreateStudent from '../components/CreateStudent'
import SingleTeacher from '../components/SingleTeacher'
import CreateTeacher from '../components/CreateTeacher'
import RegisterComponent from '../components/auth/RegisterComponent'
import LoginComponent from '../components/auth/LoginComponent'

Vue.use(VueRouter);

const routes = [
  { 
    path: '/',
    redirect: '/gradebooks', 
    name: 'home' 
  },
  {
    path: '/gradebooks',
    name: 'gradebooks',
    component: AppGradebooks,
  },
  {
    path: '/gradebooks/create',
    name: 'gradebooks-create',
    component: CreateGradebook
  },
  {
    path: '/gradebooks/:id',
    name: 'gradebooks-single',
    component: SingleGradebook,
    props: true
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: TeachersComponent
  },
  {
    path: '/teachers/create',
    name: 'teachers-create',
    component: CreateTeacher
  },
  {
    path: '/gradebooks/:id/students/create',
    name: 'students-create',
    component: CreateStudent
  },
  {
    path: '/register',
    name: 'register-page',
    component: RegisterComponent
  },
  {
    path: '/login',
    name: 'login-page',
    component: LoginComponent
  },
  {
    path: '/teachers/:id',
    name: 'teachers-single',
    component: SingleTeacher,
    props: true
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('token')

  if((to.name !== 'login-page' && to.name !== 'register-page') && !loggedIn) {
    next({ name: 'login-page' })
    return;
  } else if ((to.name === 'login-page' || to.name === 'register-page') && loggedIn) {
    return next ({ name: 'gradebooks' })
  }
  else next()
})

export default router;