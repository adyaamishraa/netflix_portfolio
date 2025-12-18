const express = require('express');
const cookieParser = require('cookie-parser');

const projectRoute = require('./routes/projects');
const aboutmeRoute = require('./routes/aboutme');
const techstackRoute = require('./routes/techstack');

const {router : userAuthRoute, checkUser} = require('./routes/userAuth');  // ye users ko authenticate karega
const {router: authRoute, checkAdmin} = require('./routes/auth'); // ye admin ko authenticate karega

const chatbotRoute = require('./routes/chatbot');
const techBotRoute = require('./routes/techbot');

const cors = require('cors');

const pool = require('./db'); //file imported from db.js, isme se console print hoga terminal me
require('dotenv').config();

const app = express();
app.use(cors(
  {
    origin: "https://portfolionettflix.netlify.app",
    credentials:true,
    methods: ['GET','POST','PUT','DELETE']
  }
));
app.use(express.json());
app.use(cookieParser()); // middleware






app.use('/auth', authRoute); // admin ke liye.
app.use('/user', userAuthRoute); // users ke liye.


app.get('/', (req, res) => {
  res.send('🚀 AI Portfolio Backend is Running!');
});

// Routes

app.use('/projects', projectRoute);
app.use('/aboutme', aboutmeRoute);
app.use('/techstack', techstackRoute);


// chatbot 

app.use('/chatbot', chatbotRoute);
app.use('/techbot', techBotRoute );


app.listen(process.env.PORT || 5000, () => {
  console.log("✅ CLIENT_URL from .env:", process.env.CLIENT_URL);
  console.log(`Server is running on port http://localhost:${process.env.PORT || 5000}/`);
})