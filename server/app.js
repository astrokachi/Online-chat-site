require("dotenv").config();
const express = require("express");
const app = express();

const authRouter = require("./routes/auth");
var cors = require('cors');

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Api up and running')
})

// routes
app.use(cors());
app.use("/auth", authRouter);

const port = process.env.PORT || 5000;

app.listen(port, () =>
    console.log(`Server is listening on port ${port}...`)
);
