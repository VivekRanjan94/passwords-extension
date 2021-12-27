import { useEffect, useState } from 'react'
import { usePassword } from '../Components/Contexts/PasswordContext'

const Add: React.FC = () => {
  const { saveNewPassword, url } = usePassword()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [website, setWebsite] = useState<string>(url)

  const handleSavePassword = async () => {
    if (email === '' || password === '' || website === '') {
      return
    }

    saveNewPassword(name, website, email, password)

    setName('')
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    try {
      const hostName = new URL(website).hostname
      setName(hostName)
    } catch (e) {
      console.log("Couldn't generate URL", e)
    }
  }, [])

  return (
    <div className='add-password'>
      <form className='add-password-form'>
        <div className='field'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            value={name}
            required
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </div>
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

export default Add
