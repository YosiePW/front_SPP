import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Login_Siswa from '../views/Login_Siswa.vue'
import Register from '../views/Register.vue'
import PdfPembayaran from '../views/PdfPembayaran.vue'
import Petugas from '../views/Petugas.vue'
import Kelas from '../views/Kelas.vue'
import Spp from '../views/Spp.vue'
import Siswa from '../views/Siswa.vue'
import Siswa_Page from '../views/Siswa_Page.vue'
import Pembayaran from '../views/Pembayaran.vue'
import Tanggungan from '../views/Tanggungan.vue'
import Data_Pembayaran from '../views/Data_Pembayaran.vue'
import Navbar from '../views/layouts/Navbar.vue'
import Footer from '../views/layouts/Footer.vue'
import NavbarSiswa from '../views/layouts/Navbar_Siswa.vue'
import FooterSiswa from '../views/layouts/Footer_Siswa.vue'
import store from '../store'

// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch((err) => err);
// };
Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    components: { default: Register },
  },
  {
    path: '/pdf',
    name: 'PdfPembayaran',
    components: { default: PdfPembayaran },
  },
  {
    path: '/data_pembayaran',
    name: 'Data_Pembayaran',
    components: { default: Data_Pembayaran, header: NavbarSiswa, footer: FooterSiswa },
  },
  {
    path: '/siswa_page',
    name: 'Siswa_Page',
    components: { default: Siswa_Page, header: NavbarSiswa, footer: FooterSiswa },
  },
  {
    path: '/tanggungan_siswa',
    name: 'Tanggungan',
    components: { default: Tanggungan, header: NavbarSiswa, footer: FooterSiswa },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/login_siswa',
    name: 'Login_Siswa',
    component: Login_Siswa,
  },
  {
    path: '/',
    name: 'Petugas',
    components: { default: Petugas, header: Navbar, footer: Footer },
    meta: { requiresAuth: true, },
  },
  {
    path: '/kelas',
    name: 'Kelas',
    components: { default: Kelas, header: Navbar, footer: Footer },
    meta: { requiresAuth: true, },
  },
  {
    path: '/spp',
    name: 'Spp',
    components: { default: Spp, header: Navbar, footer: Footer },
    meta: { requiresAuth: true, },
  },
  {
    path: '/siswa',
    name: 'Siswa',
    components: { default: Siswa, header: Navbar, footer: Footer },
    meta: { requiresAuth: true, },
  },
  {
    path: '/pembayaran',
    name: 'Pembayaran',
    components: { default: Pembayaran, header: Navbar, footer: Footer },
    meta: { requiresAuth: true, },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next('/login');
  } else {
    next()
  }
})

export default router
