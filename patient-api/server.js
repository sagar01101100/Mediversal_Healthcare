const express = require("express");
const patients = require("./data/patients");

const app = express();
const PORT = 3000;

// API Endpoint to get the list of patients
app.get("/api/patients", (req, res) => {
  try {
    return res.status(200).json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});


//Get Patient's details with particular id
app.get("/api/patients/:id", (req, res) => {
  const id = Number(req.params.id);

  const patient = patients.find((patient) => Number(patient.id) === id);
  console.log(`Found Patient: `, patient);

  if (!patient) {
    return res.status(404).json({
      message: `Patient with ID ${id} not found`,
    });
  }

  return res.status(200).json(patient);
});

app.use((req, res) => {
  return res.status(404).json({
    message: `Route not found: ${req.originalUrl}`,
  });
});




// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
