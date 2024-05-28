import { useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

interface User {
  id: number
  name: string
  email: string
}

interface Activity {
  id: number
  name: string
  points: number
}

interface UserActivity {
  id: number
  userId: number
  activityId: number
  timestamp: string
}

interface DashboardProps {
  users: User[]
  activities: Activity[]
  userActivities: UserActivity[]
}

const Dashboard = ({ users, activities, userActivities }: DashboardProps) => {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [selectedActivity, setSelectedActivity] = useState<number | null>(null)

  const filterUserActivities = () => {
    if (selectedUser && selectedActivity) {
      return userActivities.filter(
        (ua) => ua.userId === selectedUser && ua.activityId === selectedActivity
      )
    }
    if (selectedUser) {
      return userActivities.filter((ua) => ua.userId === selectedUser)
    }
    if (selectedActivity) {
      return userActivities.filter((ua) => ua.activityId === selectedActivity)
    }
    return userActivities
  }

  const filteredUserActivities = filterUserActivities()

  return (
    <main
    className={`flex min-h-screen flex-col items-center justify-between p-8`}
  >
     <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 p-4">
      <div className="flex space-x-4 items-center mb-4">
      <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => router.push('/')}
          >
            Back
      </button>
        <select
          className="border p-2"
          value={selectedUser ?? ''}
          onChange={(e) => setSelectedUser(parseInt(e.target.value))}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2"
          value={selectedActivity ?? ''}
          onChange={(e) => setSelectedActivity(parseInt(e.target.value))}
        >
          <option value="">Select Activity</option>
          {activities.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        {filteredUserActivities.map((ua) => {
          const user = users.find((u) => u.id === ua.userId)
          const activity = activities.find((a) => a.id === ua.activityId)

          return (
            <div key={ua.id} className="border p-4 mb-4">
              <p>User: {user?.name}</p>
              <p>Activity: {activity?.name}</p>
              <p>Timestamp: {ua.timestamp}</p>
            </div>
          )
        })}
        </div>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  let baseUrl = 'http://localhost:8000' //here we can check environment variables for development and production
  const [usersRes, activitiesRes, userActivitiesRes] = await Promise.all([
    fetch(`${baseUrl}/users`),
    fetch(`${baseUrl}/activities`),
    fetch(`${baseUrl}/user-activities`),
  ])

  const [users, activities, userActivities] = await Promise.all([
    usersRes.json(),
    activitiesRes.json(),
    userActivitiesRes.json(),
  ])

  return {
    props: {
      users,
      activities,
      userActivities,
    },
  }
}

export default Dashboard
