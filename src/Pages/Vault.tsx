import List from '../components/List'
import { usePassword } from '../Components/Contexts/PasswordContext'

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
          <List list={currentWebsitePasswords} />
        )}
      </div>
      <div className='all'>
        <h2 className='title'>All</h2>
        <List list={allPasswords} />
      </div>
    </div>
  )
}

export default Vault
