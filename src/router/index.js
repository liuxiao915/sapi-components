import { createRouter,createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/index',
    name: 'index',
    component: resolve => require(['@/views/index'], resolve)
  }
]

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
/* router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		next();
	} else {
		let token = localStorage.getItem('Authorization');
		if (token === null || token === '') {
			next('/login');
		} else {
			next();
		}
	}
}); */
const router = createRouter({
	history: createWebHashHistory(),
	routes
})
export default router;