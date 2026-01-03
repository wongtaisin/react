/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-29 15:47:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 10:36:50
 * @FilePath: \react\src\router\index.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { lazy } from 'react'
import { createHashRouter } from 'react-router-dom'
import NotFound from '../pages/NotFound'
import Conference from '../router/modules/conference' // conference模块

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

const ExampleComponent = lazy(() => import('../components/ExampleComponent'))

const Test = lazy(async () => {
  await sleep(2000) // 模拟加载延迟
  let Test = await import('../pages/Test')
  return Test
})

const router = createHashRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Main }, // 默认路由
      { path: '/Home', Component: Home },
      { path: '/Main', Component: Main },
      { path: '/Example', Component: ExampleComponent },
      { path: '/NotFound', Component: NotFound },
      { path: '/Test', Component: Test },
      ...Conference,
      { path: '*', Component: NotFound }
    ]
  }
])

export default router
