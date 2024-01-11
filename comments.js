//create a web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const commentRouter = require('./routes/comments');
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// parse application/json
app.use(bodyParser.json());
app.use('/comments', commentRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});