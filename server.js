const express = require('express');
const app = express();

// Custom middleware to verify the time of the request
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const hour = now.getHours(); // 0 to 23

  // Check if it's a working day (Monday to Friday) and working hour (9 to 17)
  if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour <= 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('Sorry, the website is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Set up static files middleware
app.use(express.static('public'));

// Use the custom middleware for all routes
app.use(checkWorkingHours);

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/views/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/views/contact.html');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
