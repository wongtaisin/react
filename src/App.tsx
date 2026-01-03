import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { RouterProvider } from 'react-router-dom'
import './App.css'
import router from './router'

const App = () => {
  return (
    <ConfigProvider locale={zhCN} prefixCls="app-react6">
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
