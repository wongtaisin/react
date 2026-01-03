/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-30 11:01:30
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 13:43:35
 * @FilePath: \react\src\pages\Home\index.tsx
 * @Description:
 *
 * Copyright (c) 2026 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import { NavLink } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>home</h1>
      <NavLink to="/NotFound">跳转到NotFound</NavLink>
    </div>
  )
}

export default Home
