const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config({path: './Db/.env'});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const router =  require('./routes/routes')

app.use('/api', router);

const port = process.env.PORT;
const pool = require('./Db/Config')

const startServer = async () => {
    try {
      await pool(); 
  
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    } catch (error) {
      console.error('Error starting the server:', error.message);
      process.exit(1);
    }
  };

  startServer();