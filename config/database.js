const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "Universidad"
});

db.connect((error) => {
  if (error) {
    console.error("Error connecting to diegoponce@fedora:~/Documentos/Desarrollo Web II/Universidad/API-Rest$ the database:", error);
    return;
  }
  console.log("Connected to the database");
});

module.exports = db;