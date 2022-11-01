const express = require('express');
const app = express();
const port = process.env.PORT || 5001;
const { MongoClient, ServerApiVersion } = require('mongodb');

const cors = require('cors');
app.use(cors());
app.use(express.json());

const users = [
    { id: 1, name: 'takbir', email: 'takbir@gmail.com' },
    { id: 2, name: 'mohammed', email: 'mohammed@gmail.com' },
    { id: 3, name: 'ahmed', email: 'ahmed@gmail.com' }
];






const uri = "mongodb+srv://dbUser1:fR0CLSYuTqgm0lCl@cluster0.drjbcpx.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const userCollection = client.db('practiceSimpleNode').collection('users2');
        // const user = {name: 'takbir', email: 'takbir@gmail.com'};
        // const result = await userCollection.insertOne(user);
        // console.log(result)

        app.get('/users', async(req, res) => {
            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/users', async(req, res) => {
            console.log('post API called');
            const user = req.body;
            const result = await userCollection.insertOne(user);
            user._id = result.insertedId;
            res.send(user);
            console.log(result)
        })
    }
    catch {

    }
}
run().catch(err => console.error(err));




app.get('/', (req, res) => {
    res.send('simple node server for practice project is running!')
})

/* app.get('/users', (req, res) => {
    res.send(users)
}) */

//* create post API
/* app.post('/users', (req, res) => {
    console.log('post API called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user)
    res.send(user)
    console.log(user)
}) */



app.listen(port, () => {
    console.log('server is running on port', port)
})