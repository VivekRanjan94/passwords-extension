import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import CopyIcon from '../Assets/copy.svg'
import LaunchIcon from '../Assets/open_in_new.svg'
import ShowIcon from '../Assets/show.svg'
import HideIcon from '../Assets/hide.svg'
import EditIcon from '../Assets/edit.svg'
import SaveIcon from '../Assets/save.svg'

import {
  Password as IPassword,
  usePassword,
} from '../Components/Contexts/PasswordContext'

interface Props {}

const Password: React.FC<Props> = () => {
  const { getPasswordById } = usePassword()
  const location = useLocation()
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState<boolean>(false)

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

  const save = () => {
    setCanEdit(false)
  }

  return (
    <div className='password'>
      <header>
        <input
          disabled={!canEdit}
          type='text'
          value={password.name}
          className='password-name'
        />
        <EditIcon
          className='icon'
          onClick={() => {
            setCanEdit(true)
          }}
        />
      </header>
      <div className='password-email'>
        <div className='title'>Email</div>
        <input
          disabled={!canEdit}
          type='text'
          value={password.email}
          className='text'
        />

        <CopyIcon
          className='icon'
          onClick={() => {
            navigator.clipboard.writeText(password.email)
          }}
        />
      </div>
      <div className='password-password'>
        <div className='title'>Password</div>
        <input
          disabled={!canEdit}
          type={showPassword ? 'text' : 'password'}
          value={showPassword ? password.password : 'password'}
          className='text'
        />
        <CopyIcon
          className='icon'
          onClick={() => {
            navigator.clipboard.writeText(password.password)
          }}
        />

        {showPassword ? (
          <HideIcon
            className='icon'
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        ) : (
          <ShowIcon
            className='icon'
            onClick={() => {
              setShowPassword(!showPassword)
            }}
          />
        )}
      </div>
      <div className='password-website'>
        <div className='title'>Website</div>
        <input
          disabled={!canEdit}
          type='text'
          value={password.website}
          className='text'
        />

        <a
          className='icon'
          target='_blank'
          href={password.website}
          rel='noreferrer'
        >
          <LaunchIcon />
        </a>
      </div>

      {canEdit && (
        <SaveIcon
          onClick={() => {
            save()
          }}
        />
      )}
    </div>
  )
}

export default Password
