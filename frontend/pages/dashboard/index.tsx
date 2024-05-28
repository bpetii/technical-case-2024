import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { formatDate } from '@/helpers/formatDate'

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

let baseUrl = 'http://localhost:8000' //here we can check environment variables for development and production

async function getFilteredUserActivities(userId: number | null, activityId: number | null) {
  const queryParams = new URLSearchParams()
  if (userId !== null && !isNaN(userId)) queryParams.append('userId', userId.toString())
  if (activityId !== null && !isNaN(activityId)) queryParams.append('activityId', activityId.toString())

  const res = await fetch(`${baseUrl}/dashboard-data?${queryParams.toString()}`)
  const data = await res.json()

  return data;
};

const Dashboard = ({ users, activities, userActivities }: DashboardProps) => {
  const router = useRouter()
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [selectedActivityId, setSelectedActivityId] = useState<number | null>(null)
  const [filteredUserActivities, setFilteredUserActivities] = useState<UserActivity[]>(userActivities)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFilteredUserActivities(selectedUserId, selectedActivityId);
      setFilteredUserActivities(data.userActivities);
    };
  
    fetchData();
  }, [selectedUserId, selectedActivityId])
  
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
          <div className="flex space-x-4">
            <select
              className="border p-2"
              value={selectedUserId ?? ''}
              onChange={(e) => setSelectedUserId(parseInt(e.target.value))}
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
              value={selectedActivityId ?? ''}
              onChange={(e) => setSelectedActivityId(parseInt(e.target.value))}
            >
              <option value="">Select Activity</option>
              {activities.map((activity) => (
                <option key={activity.id} value={activity.id}>
                  {activity.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="pt-24">
        {filteredUserActivities?.map((ua) => {
          const user = users.find((u) => u.id === ua.userId)
          const activity = activities.find((a) => a.id === ua.activityId)

          return (
            <div key={ua.id} className="border p-4 mb-4">
              <p>User: {user?.name}</p>
              <p>Activity: {activity?.name}</p>
              <p>Time: {formatDate(ua.timestamp)}</p>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { userId, activityId } = context.query

  const queryParams = new URLSearchParams()
  if (userId) queryParams.append('userId', userId as string)
  if (activityId) queryParams.append('activityId', activityId as string)

  const res = await fetch(`${baseUrl}/dashboard-data?${queryParams.toString()}`)
  const data = await res.json()

  return {
    props: {
      users: data.users,
      activities: data.activities,
      userActivities: data.userActivities,
    },
  }
}

export default Dashboard
