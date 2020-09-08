import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '正尚网络', icon: 'dashboard' }
    }]
  },

  {
    path: '/home',
    component: Layout,
    name:'Home',
    meta: {
      title: '官网首页',
      icon: 'nested'
    },
    children: [
      {
        path: 'banner',
        name: 'BannerList',
        meta: { title: '轮播图', icon: 'form' },
        component: () => import('@/views/home/BannerList'),
      },
      {
        path: 'banner/edit',
        component: () => import('@/views/home/BannerEdit'),
        name: 'BannerEdit',
        meta: { title: '编辑轮播图'},
        hidden:true
      },
      {
        path: 'solve',
        name: 'SolveMethod',
        component: () => import('@/views/home/SolveMethod'),
        meta: { title: '行业解决方案', icon: 'form' }
      },
      {
        path: 'solve/edit',
        name: 'SolveMethodEdit',
        component: () => import('@/views/home/SolveMethodEdit'),
        meta: { title: '编辑行业解决方案', icon: 'form' },
        hidden:true
      },
      {
        path: 'partner',
        name: 'PartnerList',
        component: () => import('@/views/home/PartnerList'),
        meta: { title: '合作伙伴', icon: 'form' }
      },
      {
        path: 'partner/edit',
        name: 'PartnerEdit',
        component: () => import('@/views/home/PartnerEdit'),
        meta: { title: '编辑合作伙伴', icon: 'form' },
        hidden:true
      },

    ]
  },
  {
    path: '/business',
    name: 'Business',
    component: Layout,
    redirect: '/business/list',
    meta: { title: '业务领域', icon: 'el-icon-s-check' },
    children: [
      {
        path: 'list',
        name: 'BusinessList',
        component: () => import('@/views/business/BusinessList'),
        meta: { title: '业务领域', icon: 'form' }
      },
      {
        path: 'gov',
        name: 'Gov',
        component: () => import('@/views/business/index'),
        meta: { title: '政务云', icon: 'form' },
        children: [
          {
            path: 'list',
            name: 'GovBannerList',
            component: () => import('@/views/business/gov/GovBannerList'),
            meta: { title: '政务云-轮播图', icon: 'form' }
          },
          {
            path: 'edit',
            name: 'GovBannerEdit',
            component: () => import('@/views/business/gov/GovBannerEdit'),
            meta: { title: '编辑轮播图', icon: 'form' },
            hidden:true
          },
          ]
      },
      {
        path: 'config',
        name: 'BusinessConfig',
        component: () => import('@/views/business/BusinessConfig'),
        meta: { title: '页面配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'BusinessEdit',
        component: () => import('@/views/business/BusinessEdit'),
        meta: { title: '编辑业务领域', icon: 'form' },
        hidden:true
      }
    ]
  },
  {
    path: '/case',
    name: 'Case',
    component: Layout,
    meta: { title: '客户案例', icon: 'el-icon-s-cooperation' },
    children: [
      {
        path: 'list',
        name: 'CaseList',
        component: () => import('@/views/case/CaseList'),
        meta: { title: '案例列表', icon: 'form' }
      },
      {
        path: 'config',
        name: 'CaseConfig',
        component: () => import('@/views/case/CaseConfig'),
        meta: { title: '页面配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'CaseEdit',
        component: () => import('@/views/case/CaseEdit'),
        meta: { title: '编辑客户案例', icon: 'form' },
        hidden:true
      }
    ]
  },
  {
    path: '/news',
    name: 'News',
    component: Layout,
    meta: { title: '新闻中心', icon: 'el-icon-message-solid' },
    children: [
      {
        path: 'list',
        name: 'NewsList',
        component: () => import('@/views/news/NewsList'),
        meta: { title: '新闻列表', icon: 'form' }
      },
      {
        path: 'config',
        name: 'NewsConfig',
        component: () => import('@/views/news/NewsConfig'),
        meta: { title: '页面配置', icon: 'form' }
      },
      {
        path: 'edit',
        name: 'NewsEdit',
        component: () => import('@/views/news/NewsEdit'),
        meta: { title: '编辑新闻', icon: 'form' },
        hidden:true
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: Layout,
    meta: { title: '关于我们', icon: 'el-icon-s-flag' },
    children: [
      {
        path: 'edit',
        name: 'AboutEdit',
        component: () => import('@/views/about/AboutEdit'),
        meta: { title: '关于我们', icon: 'form' },
      },
      {
        path: 'config',
        name: 'AboutConfig',
        component: () => import('@/views/about/AboutConfig'),
        meta: { title: '页面配置', icon: 'form' }
      },
    ]
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Layout,
    meta: { title: '联系我们', icon: 'el-icon-s-comment' },
    children: [
      {
        path: 'list',
        name: 'ContactList',
        component: () => import('@/views/contact/ContactList'),
        meta: { title: '留言列表', icon: 'form' },
      },
      {
        path: 'config',
        name: 'ContactConfig',
        component: () => import('@/views/contact/ContactConfig'),
        meta: { title: '页面配置', icon: 'form' }
      },
    ]
  },
  // {
  //   path: '/header',
  //   name: 'Header',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/home/Header'),
  //       meta: { title: '导航信息', icon: 'el-icon-s-platform' }
  //     }
  //   ]
  // },
  {
    path: '/footer',
    name: 'Footer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/home/Footer'),
        meta: { title: '底部信息', icon: 'el-icon-s-platform' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
