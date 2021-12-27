import axios from 'axios'
import { Password } from '../Components/Contexts/PasswordContext'

let passwordList: Password[] = []

const getAllPasswords = async () => {
  interface Response {
    success: boolean
    list: Password[]
  }
  const { data } = await axios.get<Response>(
    `${process.env.SERVER_URL}/get-all-passwords`
  )

  if (data.success) {
    passwordList = [...data.list]
  }
}

getAllPasswords()

const saveNewPassword = async (
  name: string,
  website: string,
  email: string,
  password: string
) => {
  console.log({ name, website, email, password })
  interface Response {
    success: boolean
    password: Password
  }

  try {
    const { data } = await axios.post<Response>(
      `${process.env.SERVER_URL}/save-password`,
      { name, website, email, password }
    )

    return data
  } catch (e) {
    console.error(e)
  }
}

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.request === 'passwords') {
    if (passwordList.length === 0) {
      chrome.runtime.sendMessage({
        type: 'passwords',
        data: { success: false },
      })
    } else {
      chrome.runtime.sendMessage({
        type: 'passwords',
        data: { success: true, passwords: passwordList },
      })
    }
  }
  if (msg.request === 'save-new') {
    const { name, website, email, password } = msg.data
    const newPassword = saveNewPassword(name, website, email, password)
    chrome.runtime.sendMessage({
      type: 'new-password',
      data: { password: newPassword },
    })
  }
})

export {}
