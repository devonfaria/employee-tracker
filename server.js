// Adding node modules
const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const fs = require('fs');
const path = require('path');

// Declaring express as pur application server
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
  console.log(`Application launching on port http://localhost:${PORT}/`);
});