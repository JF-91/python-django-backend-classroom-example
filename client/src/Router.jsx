import { Route, Routes } from 'react-router-dom'
import RouterLayout from './common/router'
import HomePage from './pages/home'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<RouterLayout />} >
            <Route path="/" element={<HomePage />} />
        </Route>
    </Routes>
  )
}

export default AppRouter