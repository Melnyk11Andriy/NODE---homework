const express = require('express');

const { constant } = require('./constants');
const { userRouter } = require('./routes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/users', userRouter);

app.listen(constant.PORT, () => {
    console.log(`✱ Server has been started on port ${constant.PORT} ✱`);
});
