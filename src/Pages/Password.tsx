import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import CopyIcon from '../Assets/content_copy_black_24dp.svg'
import LaunchIcon from '../Assets/open_in_new_black_24dp.svg'
import {
  Password as IPassword,
  usePassword,
} from '../Components/Contexts/PasswordContext'

interface Props {}

const Password: React.FC<Props> = () => {
  const { getPasswordById } = usePassword()
  const location = useLocation()

  const [password, setPassword] = useState<IPassword>({
    _id: '',
    name: '',
    website: '',
    email: '',
    password: '',
    createdAt: '',
  })

  useEffect(() => {
    setPassword(getPasswordById(location.pathname.split(':')[1]))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='password'>
      <h3 className='password-name'>{password.name}</h3>
      <div className='password-email'>
        <div className='title'>Email</div>
        <div className='text'>{password.email}</div>
        <CopyIcon
          className='icon'
          onClick={() => {
            navigator.clipboard.writeText(password.email)
          }}
        />
      </div>
      <div className='password-password'>
        <div className='title'>Password</div>
        <div className='text'>{password.password}</div>
        <CopyIcon
          className='icon'
          onClick={() => {
            navigator.clipboard.writeText(password.password)
          }}
        />
      </div>
      <div className='password-website'>
        <div className='title'>Website</div>
        <div className='text'>{password.website}</div>
        <a
          className='icon'
          target='_blank'
          href={password.website}
          rel='noreferrer'
        >
          <LaunchIcon />
        </a>
      </div>
    </div>
  )
}

export default Password
