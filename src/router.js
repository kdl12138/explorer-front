import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.publicPath,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: () => import(/* webpackChunkName: "block" */'./views/blocks')
    },
    {
      path: '/block/:id',
      name: 'block',
      component: () => import(/* webpackChunkName: "block" */'./views/block.vue')
    },
    {
      path: '/address/:id',
      name: 'address',
      component: () => import(/* webpackChunkName: "block" */'./views/address.vue')
    },
    {
      path: '/txn/:id',
      name: 'tx',
      component: () => import(/* webpackChunkName: "block" */'./views/tx.vue')
    },
    {
      path: '/txs/:id?',
      name: 'txs',
      component: () => import(/* webpackChunkName: "block" */'./views/txs.vue')
    },
    {
      path: '/rank',
      name: 'assets',
      component: () => import(/* webpackChunkName: "block" */'./views/Rank/index.vue')
    },
    {
      path: '/rank/assets',
      name: 'assets',
      component: () => import(/* webpackChunkName: "block" */'./views/Rank/assets.vue')
    },
    {
      path: '/rank/miners',
      name: 'miners',
      component: () => import(/* webpackChunkName: "block" */'./views/Rank/miners.vue')
    },
    {
      path: '/token',
      name: 'token',
      component: () => import(/* webpackChunkName: "token" */'./views/token.vue')
    },
    {
      path: '/token/:id',
      name: 'tokenDetail',
      component: () => import(/* webpackChunkName: "token" */'./views/tokenDetail.vue')
    },
    {
      path: '/404',
      name: 'notFound',
      component: () => import('./views/404.vue')
    },
    {
      path: '/k',
      name: 'k',
      component: () => import('./views/k/index.vue')
    },
    {
      path: '/uncles',
      name: 'uncles',
      component: () => import('./views/uncles.vue')
    },
    {
      path: '/uncle/:id',
      name: 'uncle',
      component: () => import('./views/uncle.vue')
    }
  ]
})
