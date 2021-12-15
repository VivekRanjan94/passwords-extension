import { Link, useLocation } from 'react-router-dom'

import Vault from '../Assets/lock_black_24dp.svg'
import Add from '../Assets/add_black_24dp.svg'
import Generate from '../Assets/password_black_24dp.svg'

const Header: React.FC = () => {
  const { pathname } = useLocation()
  return (
    <>
      <header
        className={`header${
          pathname.startsWith('/password') ? ' alternate' : ''
        }`}
      >
        <ul className='links'>
          <li>
            <Link to='/' className={`link${pathname === '/' ? ' active' : ''}`}>
              <Vault />
              <h4 className='link-text'>Vault</h4>
            </Link>
          </li>
          <li>
            <Link
              to='/generator'
              className={`link${pathname === '/generator' ? ' active' : ''}`}
            >
              <Generate />
              <h4 className='link-text'>Generator</h4>
            </Link>
          </li>
          <li>
            <Link
              to='/add-password'
              className={`link${pathname === '/add-password' ? ' active' : ''}`}
            >
              <Add />
              <h4 className='link-text'>Add</h4>
            </Link>
          </li>
        </ul>
      </header>
    </>
  )
}

export default Header
