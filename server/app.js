const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path: './Database/.env'});

const allowedOrigins = ['http://localhost:3000', 'https://transist-booking.vercel.app', 'https://booking-dashboard-two.vercel.app'];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router =  require('./routes/routes')

app.use('/api', router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
