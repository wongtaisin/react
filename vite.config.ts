/*
 * @Author: wingddd wongtaisin1024@gmail.com
 * @Date: 2025-12-29 15:27:45
 * @LastEditors: wingddd wongtaisin1024@gmail.com
 * @LastEditTime: 2026-01-03 11:31:40
 * @FilePath: \react\vite.config.ts
 * @Description:
 *
 * Copyright (c) 2025 by wongtaisin1024@gmail.com, All Rights Reserved.
 */
import react from '@vitejs/plugin-react'
import path, { resolve } from 'path'
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
    })
  ],
  css: {
    // CSS 预处理器配置
    preprocessorOptions: {
      scss: {
        // 设置css中引用文件的路径，引入通用使用的scss文件（如包含的@mixin）
        additionalData: `@use "@/assets/css/mixin.scss" as *;`
      }
    },
    modules: {
      // 生成的类名格式
      generateScopedName: '[name]_[local]_[hash:base64:5]',
      // 是否启用 camelCase 转换
      localsConvention: 'camelCase' // 驼峰命名
    }
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'], // 自动解析文件扩展名
    alias: {
      '@': pathSrc, // src 路径别名
      assets: resolve(__dirname, 'assets'), // 资源路径别名
      build: path.resolve(__dirname, 'build') // 构建路径别名
    }
  },

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
