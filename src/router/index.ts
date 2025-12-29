/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-29 15:47:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-29 16:22:57
 * @FilePath: \react\src\router\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'

const sleep = (ms: number | undefined) => new Promise(resolve => setTimeout(resolve, ms))

const Layout = lazy(() => import('../pages/Layout'))

const Main = lazy(async () => {
  await sleep(2000) // 模拟加载延迟
  let Main = await import('../pages/Main')
  return Main
})

const Home = lazy(async () => {
  await sleep(2000) // 模拟加载延迟
  let Home = await import('../pages/Home')
  return Home
})

const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Main }, // 默认路由
      { path: '/Home', Component: Home },
      { path: '/Main', Component: Main },
      { path: '/NotFound', Component: NotFound },
      { path: '*', Component: NotFound } // 404路由
    ]
  }
])
export default router
