/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2026-01-03 09:54:40
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 10:20:35
 * @FilePath: \react\src\pages\conference\index.tsx
 * @Description: 
 * 
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved. 
 */
import { Suspense } from 'react'
import { Outlet, useNavigation } from 'react-router-dom'

const Conference = () => {
  const navigation = useNavigation()
  const loading = navigation.state === 'loading'

  return (
    <div>
      {loading ? (
        <div>会议页面加载中...</div>
      ) : (
        <Suspense fallback={<div>会议页面加载中...</div>}>
          <Outlet />
        </Suspense>
      )}
    </div>
  )
}

export default Conference
