import List from '../components/List'
import { Password, usePassword } from '../Components/Contexts/PasswordContext'
import { useState } from 'react'

// Vault component
const Vault: React.FC = () => {
  const { currentWebsitePasswords, allPasswords } = usePassword()

  return (
    <div className='vault'>
      <div className='current'>
        <h2 className='title'>Current Website</h2>
        {currentWebsitePasswords.length === 0 ? (
          <>
            <p>No passwords are saved for this website</p>
          </>
        ) : (
          <List list={currentWebsitePasswords} canSearch={false} />
        )}
      </div>
      <div className='all'>
        <h2 className='title'>All</h2>
        <List list={allPasswords} canSearch={true} />
      </div>
    </div>
  )
}

export default Vault
