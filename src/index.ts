import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import { Password } from './Schema/Password'

const app = express()
const PORT = Number(process.env.PORT) || 5000

const allowedOrigins = [process.env.ORIGIN]

const options: cors.CorsOptions = {
  origin: allowedOrigins,
}

app.use(cors(options))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

try {
  mongoose.connect(process.env.DB_STRING, () => {
    console.log('MongoDB connected')
  })
} catch (e) {
  console.error('Could not connect MongoDB', e)
}

app.get('/', (req, res) => {
  res.send('hello world')
})

app.get('/get-all-passwords', async (req, res) => {
  try {
    const passwords = await Password.find({})

    passwords.sort((a, b) => {
      if (a.name.charAt(0) < b.name.charAt(0)) {
        return -1
      }
      if (a.name.charAt(0) > b.name.charAt(0)) {
        return 1
      }

      return 0
    })

    return res.status(200).json({ success: true, list: [...passwords] })
  } catch (e) {
    return res.status(503).json({ success: false, list: [] })
  }
})

app.post('/save-password', async (req, res) => {
  const { name, website, email, password } = req.body

  try {
    const response = await savePassword(name, website, email, password)

    if (response.success) {
      return res
        .status(200)
        .json({ success: true, password: response.password })
    }
    return res.status(503).json({ success: false })
  } catch (e) {
    console.error(e)
    return res.status(503).json({ success: false })
  }
})

app.post('/edit-password', async (req, res) => {
  const { id, name, website, email, password } = req.body
  // console.log(id, name, website, email, password)

  try {
    const doc = await Password.findById(id)

    doc.name = name
    doc.email = email
    doc.website = website
    doc.password = password

    const savedPassword = await doc.save()

    res.status(200).json({ success: true, password: savedPassword })
  } catch (e) {
    console.error(e)
    return res.status(503).json({ success: false })
  }
})

app.post('/delete-password', async (req, res) => {
  const { id } = req.body

  try {
    Password.remove({ _id: id }, (err) => {
      if (err) {
        return res.status(503).json({
          success: false,
          message: 'Could not get password',
          error: err,
        })
      }

      return res
        .status(200)
        .json({ success: true, message: 'Password deleted' })
    })
  } catch (e) {
    console.error(e)
    return res.status(503).json({ success: false })
  }
})

const savePassword = async (
  name: string,
  website: string,
  email: string,
  password: string
) => {
  const newPassword = new Password({
    name,
    website,
    email,
    password,
    createdAt: new Date(),
  })

  try {
    newPassword.save()
    return { success: true, password: newPassword }
  } catch (e) {
    console.error(e)
    return { success: false }
  }
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at port ${PORT}`)
})
