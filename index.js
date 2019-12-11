const express = require('express');
const server = require('./server')

server.listen(5000, () => console.log('Server is running at http://localhost:5000'))