import { NavLink } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <NavLink to="/Main">回到首页</NavLink>
    </div>
  )
}

export default NotFound
