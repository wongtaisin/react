/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-29 15:27:45
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2025-12-30 08:40:48
 * @FilePath: \react\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import react from '@vitejs/plugin-react'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig({
  base: './',
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']]
      }
    }),
    AutoImport({
      // 自动导入相关函数
      imports: ['react', 'react-router'],

      // 📜 自动生成类型声明
      dts: path.resolve(pathSrc, 'types/auto-imports.d.ts'),

      // 自动导入自己的组合函数（可选）
      dirs: ['src/composables'], // 会自动导入该目录下所有 export 的函数

      // ESLint 支持（解决 no-undef）
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true // 设为 true 表示这些全局变量是只读的
      }

      // resolvers: [ElementPlusResolver()],
    })
  ],
  server: {
    host: true, // 监听所有地址
    port: 9001, // 开发服务器端口
    open: true, // 自动打开浏览器
    cors: false, // 启用 CORS
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:1001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
})
