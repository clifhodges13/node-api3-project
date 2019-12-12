const express = require('express');
const server = require('./server')

const port = process.env.PORT || 5000

server.listen(port, () => console.log(`Server is running at http://localhost:${port}`))