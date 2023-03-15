import { createRouter,createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    // component: resolve => require(['@/views/index'], resolve),
    component: () => import('@/views/index'),
		children: [
			{
				path: '/a',
				name: 'a',
				component: () => import(/* webpackChunkName: "icon" */'@/views/a.vue')
			},
			{
				path: '/b',
				name: 'b',
				component: () => import(/* webpackChunkName: "icon" */'@/views/b.vue')
			},
			{
				path: '/icon',
				name: 'icon',
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-icon/index.vue')
			},
			{
				path: '/tree',
				name: 'tree',
				component: () => import(/* webpackChunkName: "icon" */'@/examples/tree.vue')
			},
			{
				path: '/mars3d',
				name: 'mars3d',
				component: () => import(/* webpackChunkName: "icon" */'@/examples/mars3d.vue')
			}
		]
  },
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