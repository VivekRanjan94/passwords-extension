import { Link } from 'react-router-dom'
import { Password as IPassword } from './Contexts/PasswordContext'

interface Props {
  list: IPassword[]
}

const List: React.FC<Props> = ({ list }) => {
  return (
    <ul className='list'>
      {list.map((password, index) => {
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
  )
}

export default List
