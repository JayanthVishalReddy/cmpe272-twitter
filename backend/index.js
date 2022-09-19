const app = require('./app');

const {TwitterApi} = require('twitter-api-v2');

const client = new TwitterApi({
    appKey: '3jBKHHWkM17UZIWi3gZ1aVCI0',
    appSecret: 'IpmQgPH9tFC5LEMoBulsH0JqjxD28Ma2RHJQGAqqlZvZlIouO9',
    accessToken: '1571663188193837057-6iN9OhzBNOcypMEe0sOo7NT4rwYIn5',
    accessSecret: 'sXZM33UPab1EjLaU5F4R161STrsWQ0xS4ZGT4c1Naa3Dd',
});

app.get('/', (req, res) => {
    res.status(200).send("Splitwise Backend API is Alive!, access the routes to get data!")
})

app.get('/getTweet/:id', (req,res) => {
    client.v2.singleTweet(req.params.id)
    .then((val) => {
        res.status(200).send(val)
    }).catch((err) => {
        console.log(err)
    })
});

app.post('/createTweet', async (req, res) => {
    console.log(req.body)
    const { data: createdTweet } = await client.v2.tweet(req.body.data.tweet);
    console.log('Tweet', createdTweet.id, ':', createdTweet.text);
    res.status(200).send({tweetId: createdTweet.id})
})

app.delete('/deleteTweet/:id', async (req,res) => {
    await client.v2.deleteTweet(req.params.id)
    res.status(200).send({data: "success"})
});

app.listen(3001, console.log("MongoDB server started on port 3001"));

module.exports = app; 