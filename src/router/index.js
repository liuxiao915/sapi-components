import { createRouter,createWebHashHistory } from 'vue-router'
// const context = require.context('../examples/', true, /\/index.vue$/)
// const components = {}
// context.keys().forEach((key) => {
//   const name = key.replace(/^\.\/(.*)\.\w+$/, '$1').split('/')[0]
//   components[`${name}`] = context(key).default || context(key)
// })


// 非懒加载
// import Index from '@/views/index'

// vue异步组件
// const Index = resolve => require(['@/views/index'], resolve)

// import
// 指定了相同的webpackChunkName--ImportIndex，会合并打包成一个js文件，用于合并大的模块代码
// const Index = () => import(/* webpackChunkName: 'ImportIndex' */ '@/views/index');

// webpack提供的require.ensure()
// 该方法也可指定相同的chunkName，合并打包成一个js文件。
// 传入空字符串 则每个component会单独生成一个js文件
// const Index = r => require.ensure([], () => r(require('@/views/index')), 'ImportIndex')
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
				path: '/iconfont',
				name: 'iconfont',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-iconfont.vue')
			},
			{
				path: '/button',
				name: 'button',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-button/index.vue')
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
				component: () => import(/* webpackChunkName: "icon" */'@/examples/spai-mars3d/index.vue')
			},
			{
				path: '/echarts',
				name: 'echarts',
				meta: { keepAlive: false },
				component: () => import(/* webpackChunkName: "icon" */'@/examples/sapi-echarts/index.vue')
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