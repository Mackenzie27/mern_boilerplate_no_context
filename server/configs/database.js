const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err)
  })
