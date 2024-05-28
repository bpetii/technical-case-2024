// Dummy database

const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john@doe.com'
    },
    {
        id: 2,
        name: 'Jane Doe',
        email: 'jane@doe.com'
   },
   {
       id: 3,
       name: 'Alice Brown',
       email: 'alice@brown.com'
   },
   {
       id: 4,
       name: 'Bob Brown',
       email: 'bob@brown.com'
   }
]

const activities = [
    {
        id: 1,
        name: 'Sale',
        points: 10
    },
    {
        id: 2,
        name: 'Meeting',
        points: 5
    },
    {
        id: 3,
        name: 'Valuation',
        points: 3
    }
]

const userActivities = [
    {
        id: 1,
        userId: 1,
        activityId: 1,
        timestamp: '2021-01-01T00:00:00'
    },
    {
        id: 2,
        userId: 1,
        activityId: 2,
        timestamp: '2021-01-02T00:00:00'
    },
    {
        id: 3,
        userId: 2,
        activityId: 1,
        timestamp: '2021-01-03T00:00:00'
    },
    {
        id: 4,
        userId: 2,
        activityId: 2,
        timestamp: '2021-01-04T00:00:00'
    },
    {
        id: 5,
        userId: 3,
        activityId: 1,
        timestamp: '2021-01-05T00:00:00'
    },
    {
        id: 6,
        userId: 3,
        activityId: 2,
        timestamp: '2021-01-06T00:00:00'
    },
    {
        id: 7,
        userId: 4,
        activityId: 1,
        timestamp: '2021-01-07T00:00:00'
    },
    {
        id: 8,
        userId: 4,
        activityId: 2,
        timestamp: '2021-01-08T00:00:00'
    },
    {
        id: 9,
        userId: 2,
        activityId: 2,
        timestamp: '2021-01-09T00:00:00'
    },
    {
        id: 10,
        userId: 2,
        activityId: 3,
        timestamp: '2021-01-10T00:00:00'
    }
]


class Database {
    public getUsers() {
        return users
    }

    public getActivities() {
        return activities
    }

    public getUserActivities() {
        return userActivities
    }
}

export const db = new Database()

