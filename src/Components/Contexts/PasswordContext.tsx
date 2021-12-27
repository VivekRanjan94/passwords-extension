import { createContext, useContext, useEffect, useState } from 'react'

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

interface PasswordContextType {
  getCurrentWebsitePasswords: () => void
  getAllPasswords: () => void
  appendPassword: (password: Password) => void
  saveNewPassword: (
    name: string,
    website: string,
    email: string,
    password: string
  ) => void
  getPasswordById: (id: string) => Password
  getUrl: () => void
  allPasswords: Password[]
  currentWebsitePasswords: Password[]
  url: string
}

const TEST_PASSWORD = {
  _id: '',
  name: '',
  website: '',
  email: '',
  password: '',
  createdAt: '',
}

export const PasswordContext = createContext<PasswordContextType>({
  getCurrentWebsitePasswords: () => {},
  getAllPasswords: () => {},
  appendPassword: (password: Password) => {},
  saveNewPassword: (
    name: string,
    website: string,
    email: string,
    password: string
  ) => {},
  getPasswordById: (id: string) => {
    return TEST_PASSWORD
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
  const [allPasswords, setAllPasswords] = useState<Password[]>([])
  const [currentWebsitePasswords, setCurrentWebsitePasswords] = useState<
    Password[]
  >([])
  const [url, setUrl] = useState<string>('')

  useEffect(() => {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === 'url') {
        setUrl(msg.url)
      }
      if (msg.type === 'passwords') {
        console.log(msg)
        if (msg.data.success) {
          setAllPasswords(msg.data.passwords)
        }
      }
    })

    getUrl()
    getAllPasswords()
  }, [])

  useEffect(() => {
    if (allPasswords.length === 0) {
      return
    }
    getCurrentWebsitePasswords()
  }, [allPasswords, url])

  const getUrl = () => {
    chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
      const activeTab = tabs[0]
      chrome.tabs.sendMessage(activeTab.id || 1, {
        request: 'url',
      })
    })
  }

  const getCurrentWebsitePasswords = () => {
    setCurrentWebsitePasswords(
      allPasswords.filter((password) => {
        if (password.website === '') {
          return false
        }

        try {
          const currentUrl = new URL(url)
          const passwordUrl = new URL(password.website)
          return currentUrl.hostname === passwordUrl.hostname
        } catch (e) {
          return false
        }
      })
    )
  }

  const getAllPasswords = async () => {
    chrome.runtime.sendMessage({
      request: 'passwords',
    })
  }

  const getPasswordById = (id: string) => {
    return allPasswords.find((password) => password._id === id) || TEST_PASSWORD
  }

  const appendPassword = (password: Password) => {
    setAllPasswords([...allPasswords, password])
    setCurrentWebsitePasswords([...currentWebsitePasswords, password])
  }

  const saveNewPassword = async (
    name: string,
    website: string,
    email: string,
    password: string
  ) => {
    chrome.runtime.sendMessage({
      request: 'save-new',
      data: {
        name: name,
        website: website,
        email: email,
        password: password,
      },
    })
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
