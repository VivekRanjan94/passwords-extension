import mongoose from 'mongoose'

const PasswordSchema = new mongoose.Schema({
  name: { type: String, required: true },
  website: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, required: true },
})

const Password = mongoose.model('Password', PasswordSchema)

export { Password }
