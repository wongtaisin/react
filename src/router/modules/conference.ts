/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-09-09 14:05:37
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-04-08 09:07:10
 * @FilePath: \react\src\router\modules\conference.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */

// React Router v6+ 版本的路由配置，适合 React 项目
import React from 'react'
import { Navigate } from 'react-router-dom'

const ConferenceLayout = React.lazy(() => import('@/pages/Conference'))
const ConferenceList = React.lazy(() => import('@/pages/Conference/list'))
const ConferenceDetail = React.lazy(() => import('@/pages/Conference/detail'))

export default [
  {
    path: '/Conference',
    Component: ConferenceLayout,
    children: [
      {
        index: true,
        element: React.createElement(Navigate, { to: 'list', replace: true })
      },
      {
        path: 'list',
        Component: ConferenceList,
        meta: {
          title: '会议列表',
          path: '/conference/list',
          name: '会议列表',
          type: 'conference-list'
        }
      },
      {
        path: 'detail',
        Component: ConferenceDetail,
        meta: {
          title: '会议详情',
          path: '/conference/detail',
          name: '会议详情',
          type: 'conference-detail'
        }
      }
    ]
  }
]
