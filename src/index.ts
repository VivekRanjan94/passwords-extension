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
    return res.status(200).json({ success: true, list: [...passwords] })
  } catch (e) {
    return res.status(503).json({ success: false, list: [] })
  }
})

app.get('/get-passwords', async (req, res) => {
  const { url } = req.query

  try {
    const passwords = await Password.find({ website: url })
    return res.status(200).json({ success: true, list: [...passwords] })
  } catch (e) {
    return res.status(503).json({ success: false, passwords: [] })
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
