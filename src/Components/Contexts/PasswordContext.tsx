import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { testData } from './tester'

interface Props {
  children: any
}

export type Password = {
  _id: string
  name: string
  website: string
  email: string
  password: string
  createdAt: string
}

interface Response {
  success: boolean
  password: Password
}

interface PasswordContextType {
  getCurrentWebsitePasswords: () => void
  getAllPasswords: () => void
  appendPassword: (password: Password) => void
  saveNewPassword: (
    website: string,
    email: string,
    password: string
  ) => Promise<Response>
  getPasswordById: (id: string) => Password
  getUrl: () => void
  allPasswords: Password[]
  currentWebsitePasswords: Password[]
  url: string
}

export const PasswordContext = createContext<PasswordContextType>({
  getCurrentWebsitePasswords: () => {},
  getAllPasswords: () => {},
  appendPassword: (password: Password) => {},
  saveNewPassword: (website: string, email: string, password: string) =>
    new Promise<Response>((resolve, reject) => {
      return {
        success: false,
        password: {
          _id: '',
          name: '',
          website: '',
          email: '',
          password: '',
          createdAt: '',
        },
      }
    }),
  getPasswordById: (id: string) => {
    return {
      _id: '',
      name: '',
      website: '',
      email: '',
      password: '',
      createdAt: '',
    }
  },
  getUrl: () => {},
  allPasswords: [],
  currentWebsitePasswords: [],
  url: '',
})

export const usePassword = () => {
  return useContext(PasswordContext)
}

const PasswordProvider: React.FC<Props> = ({ children }) => {
  const [allPasswords, setAllPasswords] = useState<any[] | []>([])
  const [currentWebsitePasswords, setCurrentWebsitePasswords] = useState<
    Password[] | []
  >([])
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      setUrl(msg.url)
    })

    getUrl()

    getAllPasswords()
  }, [])

  const getUrl = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0]
      chrome.tabs.sendMessage(activeTab.id || 1, {
        sender: 'popup',
      })
    })
  }

  const getCurrentWebsitePasswords = () => {
    setCurrentWebsitePasswords(
      testData.filter((password) => {
        if (password.website === '') {
          return false
        }
        const currentUrl = new URL(url)
        const passwordUrl = new URL(password.website)

        console.log({ currentUrl, passwordUrl })

        return currentUrl.hostname === passwordUrl.hostname
      })
    )
  }

  const getAllPasswords = async () => {
    setAllPasswords(testData)
    console.log(process)
    console.log(process.env)

    interface Response {
      success: boolean
      list: Password[]
    }
    const { data } = await axios.get<Response>(
      `${process.env.SERVER_URL}/get-all-passwords`
    )

    if (data.success) {
      setAllPasswords(data.list)
    }
  }

  const getPasswordById = (id: string) => {
    return allPasswords.find((password) => password._id === id)
  }

  const appendPassword = (password: Password) => {
    setAllPasswords([...allPasswords, password])
    setCurrentWebsitePasswords([...currentWebsitePasswords, password])
  }

  const saveNewPassword = async (
    website: string,
    email: string,
    password: string
  ) => {
    interface Response {
      success: boolean
      password: Password
    }

    const { data } = await axios.post<Response>(
      `${process.env.SERVER_URL}/save-password`,
      {
        website,
        email,
        password,
      }
    )

    return data
  }

  const value = {
    getCurrentWebsitePasswords,
    getAllPasswords,
    appendPassword,
    saveNewPassword,
    getPasswordById,
    getUrl,
    allPasswords,
    currentWebsitePasswords,
    url,
  }

  return (
    <PasswordContext.Provider value={value}>
      {children}
    </PasswordContext.Provider>
  )
}
export default PasswordProvider
