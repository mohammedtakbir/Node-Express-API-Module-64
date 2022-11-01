const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'Sabana', email: 'sabana@gamil.com' },
    { id: 2, name: 'Sabnoor', email: 'sabnoor@gamil.com' },
    { id: 3, name: 'Sabila', email: 'sabila@gamil.com' },
];

/* 
* userName: dbUser1
* password: fR0CLSYuTqgm0lCl
*/

const uri = "mongodb+srv://dbUser1:fR0CLSYuTqgm0lCl@cluster0.drjbcpx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('simpleNode').collection('user');
        // const user = { name: 'mohammed', email: 'mohammed@gmail.com' };
        // const result = await userCollection.insertOne(user);
        // console.log(result)

        app.get('/users', async(req, res) => {
            const cursor = userCollection.find({})
            const users = await cursor.toArray()
            res.send(users);
        })

        app.post('/users', async(req, res) => {
            console.log('post API called')
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            console.log(result)
            res.send(user);
        })
    }
    catch {

    }

}

run().catch(err => console.error(err));


app.get('/', (req, res) => {
    res.send('simple node server is running')
})

/* app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered)
    } else {
        res.send(users)
    }
}) */

//* create post API
/*  app.post('/users', (req, res) =>{
    console.log('post API called')  
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    res.send(user);
}) */

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})