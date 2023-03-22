import { createRouter,createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'index',
    // component: resolve => require(['@/views/index'], resolve),
    component: () => import('@/views/index'),
		children: [
			{
				path: '/icon',
				name: 'icon',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-icon/index.vue')
			},
			{
				path: '/tree',
				name: 'tree',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-tree.vue')
			},
			{
				path: '/mars3d',
				name: 'mars3d',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-mars3d.vue')
			},
			{
				path: '/echarts',
				name: 'echarts',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-echarts.vue')
			},
			{
				path: '/table',
				name: 'table',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-table.vue')
			},
			{
				path: '/message',
				name: 'message',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-message.vue')
			},
			{
				path: '/loading',
				name: 'loading',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-loading.vue')
			},
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