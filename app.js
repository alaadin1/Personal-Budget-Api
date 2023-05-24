const express = require('express')
const app = express()
const {envelopes} = require('./envelopes')





const PORT = 5001
app.listen(PORT,()=>{
    console.log(`Listening on ${PORT}`)
})