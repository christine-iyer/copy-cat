require('dotenv').config();
const app = require('./app');
const connectToDatabase = require('./config/database');

const port = process.env.PORT || 4000;

// Connect to database first, then setup listen for express server
(async function () {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`🚀 Server is listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      '❌ Failed to start server due to DB connection error:',
      err.message
    );
    process.exit(1);
  }
})();
