import { Route, Routes } from 'react-router-dom'
import RouterLayout from './common/router'
import HomePage from './pages/home'
import AboutPage from './pages/about'
import ContactPage from './pages/contact'
import SpainPage from './pages/languages/spain'
import GermanPage from './pages/languages/german'
import FrenchPage from './pages/languages/frenchs'
import EnglishPage from './pages/languages/english'
import SwedenPage from './pages/languages/sueco'
import LanguaPage from './pages/languages/index'

const AppRouter = () => {
  return (
    <Routes>
        <Route path="/" element={<RouterLayout />} >
            <Route path="/" element={<HomePage />} />

            <Route path='/about' element={<AboutPage />} />

            <Route path='/contact' element={<ContactPage />} />
              
            <Route path='/languages' element={<LanguaPage />}>
                <Route path='/languages/english' element={<EnglishPage />} />

                <Route path='/languages/french' element={<FrenchPage />} />

                <Route path='/languages/german' element={<GermanPage />} />

                <Route path='/languages/spain' element={<SpainPage />} />

                <Route path='/languages/sweden' element={<SwedenPage />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default AppRouter