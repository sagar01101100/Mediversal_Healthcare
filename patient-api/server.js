const express = require("express");
const patients = require("./data/patients");

const app = express();
const PORT = 3000;

// API Endpoint to get the list of patients
app.get("/api/patients", (req, res) => {
  res.json(patients);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
