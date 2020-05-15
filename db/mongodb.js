
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'game-users-db' 

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)
    
    db.collection('users').insertOne({
        user: 'shahaf mezin',
        board: 'some board array here',
        level: 'expert'
    }, (error, result) => {
        if (error) {
            return console.log('unable to insert user ', error)
        }
    })

    db.collection('users').findOne({user: 'Shahaf'}, (error, user) => {
        if (error) {
            return console.log('unable to fetch user')
        }
        console.log(user)
    })

    db.collection('users').find({level: 'expert'}).toArray((error, users) => {
        console.log(users)
    })

    db.collection('users').deleteOne({user: 'Andrew'}).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
})