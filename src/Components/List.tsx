import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Password as IPassword, Password } from './Contexts/PasswordContext'

interface Props {
  list: IPassword[]
  canSearch: boolean
}

const List: React.FC<Props> = ({ list, canSearch }) => {
  const [searchKey, setSearchKey] = useState<string>('')

  return (
    <div>
      {canSearch && (
        <div className='list-search'>
          <input
            type='text'
            name='searchKey'
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value)
            }}
            placeholder='Search...'
          />
        </div>
      )}

      <ul className='list'>
        {list
          .filter((passwordObject) => {
            return (
              passwordObject.email
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              passwordObject.website
                .toLowerCase()
                .includes(searchKey.toLowerCase()) ||
              passwordObject.name
                .toLowerCase()
                .includes(searchKey.toLowerCase())
            )
          })
          .map((password, index) => {
            return (
              <li key={index} className='password-container'>
                <Link to={`/password:${password._id}`}>
                  <h5>{password.name}</h5>
                  <p>{password.email}</p>
                </Link>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default List
