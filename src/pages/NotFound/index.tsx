import SC from './index.module.scss'

const NotFound = () => {
  return (
    <div className={SC['notFound']}>
      <h1>404 Not Found</h1>
      <button onClick={() => window.history.back()}>返回上一页</button>
    </div>
  )
}

export default NotFound
