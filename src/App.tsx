import { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import PasswordProvider from './Components/Contexts/PasswordContext'
import Add from './Pages/Add'
import Generator from './Pages/Generator'
import Password from './Pages/Password'
import Vault from './Pages/Vault'
import Header from './Components/Header'

import './Scss/styles.scss'

const App: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <Header />
      <PasswordProvider>
        <Routes>
          <Route path='/' element={<Vault />} />
          <Route path='/generator' element={<Generator />} />
          <Route path='/add-password' element={<Add />} />
          <Route path='/password:id' element={<Password />} />
          <Route path='/index.html' element={<Navigate replace to='/' />} />
        </Routes>
      </PasswordProvider>
    </div>
  )
}

export default App
