import express from 'express'
import { db } from './database'

const app = express()
const port = 8000

app.get('/', (_req, res) => {
  res.status(200).json({ message: 'Hello, World!' })
})

app.get('/users', (_req, res) => {
    const users = db.getUsers()
    res.status(200).json(users)
})

app.get('/user-activities', (_req, res) => {
  const userAcivities = db.getUserActivities()
  res.status(200).json(userAcivities)
})

app.get('/activities', (_req, res) => {
  const userAcivities = db.getActivities()
  res.status(200).json(userAcivities)
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

