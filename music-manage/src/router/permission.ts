import router from './index'

const wtiteList = ['/login']
router.beforeEach((to, form, next) => {
	if (localStorage.getItem('token')) { 
		if (to.path === '/login') next('/')
		else next()
	} else {
		if (wtiteList.includes(to.path)) next()
		else next('/login')
	}
})
