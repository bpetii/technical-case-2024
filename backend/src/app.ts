import express, {Request, Response} from 'express'
const cors = require('cors');
import { db } from './database'

const app = express()

app.use(cors());

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

app.get('/dashboard-data', (req: Request, res: Response) => {
  // Validate request parameters
  const { userId, activityId } = req.query;

  let filteredUserActivities = db.getUserActivities()

  if (userId) {
    const parsedUserId = parseInt(userId as string)
    if (isNaN(parsedUserId)) {
      return res.status(400).json({ message: 'Invalid userId' })
    }
    filteredUserActivities = filteredUserActivities.filter(ua => ua.userId === parsedUserId)
  }

  if (activityId) {
    const parsedActivityId = parseInt(activityId as string)
    if (isNaN(parsedActivityId)) {
      return res.status(400).json({ message: 'Invalid activityId' })
    }
    filteredUserActivities = filteredUserActivities.filter(ua => ua.activityId === parsedActivityId)
  }

  const users = db.getUsers()
  const activities = db.getActivities()

  res.status(200).json({
    users,
    activities,
    userActivities: filteredUserActivities
  })
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

