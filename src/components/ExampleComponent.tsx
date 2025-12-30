import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../hooks/useRedux'
import { decrement, increment } from '../store/counterSlice'

// 使用 axios 获取示例数据
const fetchData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
  return response.data
}

const ExampleComponent = () => {
  // Redux 状态和操作
  const count = useAppSelector((state: any) => state.counter.value)
  const dispatch = useAppDispatch()

  // React Query 数据获取
  const { data, isLoading, error } = useQuery({
    queryKey: ['exampleData'],
    queryFn: fetchData
  })

  return (
    <div style={{ padding: '20px' }}>
      <h1>示例组件</h1>

      <h2>Redux 计数器</h2>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span style={{ margin: '0 10px', fontSize: '20px' }}>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>

      <h2>React Query + Axios 数据获取</h2>
      {isLoading ? (
        <div>加载中...</div>
      ) : error ? (
        <div>错误: {(error as Error).message}</div>
      ) : data ? (
        <div>
          <h3>从 JSONPlaceholder 获取的数据</h3>
          <p>ID: {data.id}</p>
          <p>标题: {data.title}</p>
          <p>完成状态: {data.completed ? '是' : '否'}</p>
        </div>
      ) : (
        <div>没有数据</div>
      )}
    </div>
  )
}

export default ExampleComponent
