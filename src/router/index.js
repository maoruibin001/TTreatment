import Vue from 'vue';
import Router from 'vue-router';

import Search from '@/components/Search';
import Consult from '@/components/Consult';

Vue.use(Router);
const router = new Router({
  routes: [
    {
      // 搜索页面
      path: '/',
      name: 'Search',
      component: Search
    },
    {
      // 向医生提问页面
      path: '/consult',
      name: 'Consult',
      component: Consult
    }
  ]
});
export default router;

// 防止直接进入二级页面造成数据拿不到的问题
router.beforeEach((to, from, next) => {
  // name === undefined的时候是浏览器直接打开的URL， 如果直接打开的不是入口页，重定向到入口页
  to.params.from = from.name;
  if(!from.name && to.path !== '/'){
    console.log('第一次打开重定向到首页');
    next('/');
  }else{
    next();
  }
});

router.onReady(()=>{
  console.log('第一个路由已经打开，路由ready');
});
