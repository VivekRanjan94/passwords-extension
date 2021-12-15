import { useEffect, useState } from 'react'

import Refresh from '../Assets/refresh_black_24dp.svg'

const LETTERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const DIGITS = '1234567890'
const SYMBOLS = '?!@#$'

const Generator: React.FC = () => {
  const [containsDigits, setContainsDigits] = useState<boolean>(true)
  const [containsSymbols, setContainsSymbols] = useState<boolean>(true)
  const [containsLetters, setContainsLetters] = useState<boolean>(true)
  const [length, setLength] = useState<number>(16)

  const [password, setPassword] = useState<string>('')

  const generate = () => {
    let sample = ''
    sample += containsDigits ? DIGITS : ''
    sample += containsLetters ? LETTERS : ''
    sample += containsSymbols ? SYMBOLS : ''

    let s = ''
    const n = sample.length
    for (let i = 0; i < length; i++) {
      s += sample.charAt(Math.floor(Math.random() * n))
    }

    setPassword(s)
  }

  useEffect(() => {
    generate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containsDigits, containsLetters, containsSymbols, length])

  return (
    <div className='generator'>
      <div className='top'>
        <div className='output-container'>
          <p className='output-text'>{password}</p>
          <div className='icons'>
            <Refresh className='icon' onClick={generate} />
          </div>
        </div>
        <button
          className='copy btn'
          onClick={() => {
            navigator.clipboard.writeText(password)
          }}
        >
          Copy
        </button>
      </div>

      <div className='length'>
        <label htmlFor='length'>Length ({length})</label>
        <input
          type='range'
          min='4'
          max='40'
          value={length}
          name='length'
          onChange={(e) => {
            setLength(Number(e.target.value))
          }}
        />
      </div>

      <div className='letters'>
        <input
          type='checkbox'
          checked={containsLetters}
          name='letters'
          onChange={() => {
            setContainsLetters(!containsLetters)
          }}
        />
        <label htmlFor='letters'>Letters</label>
      </div>
      <div className='digits'>
        <input
          type='checkbox'
          checked={containsDigits}
          name='digits'
          onChange={() => {
            setContainsDigits(!containsDigits)
          }}
        />
        <label htmlFor='digits'>Digits</label>
      </div>
      <div className='symbols'>
        <input
          type='checkbox'
          checked={containsSymbols}
          name='symbols'
          onChange={() => {
            setContainsSymbols(!containsSymbols)
          }}
        />
        <label htmlFor='symbols'>Symbols</label>
      </div>
    </div>
  )
}

export default Generator
