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
