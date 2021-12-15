import { useState } from 'react'
import { usePassword } from './Contexts/PasswordContext'

interface Props {}

const AddPassword: React.FC<Props> = () => {
  const { appendPassword, saveNewPassword, url } = usePassword()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [website, setWebsite] = useState<string>(url)

  const handleSavePassword = async () => {
    if (email === '' || password === '' || website === '') {
      return
    }

    const response = await saveNewPassword(website, email, password)

    if (response.success) {
      appendPassword(response.password)
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='add-password'>
      <form className='add-password-form'>
        <div className='field'>
          <label htmlFor='website'>Website:</label>
          <input
            type='text'
            name='website'
            value={website}
            required
            onChange={(e) => {
              setWebsite(e.target.value)
            }}
          />
        </div>

        <div className='field'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </div>

        <div className='field'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <button
          className='btn'
          onClick={(e) => {
            e.preventDefault()
            handleSavePassword()
          }}
        >
          Save Password
        </button>
      </form>
    </div>
  )
}

export default AddPassword
