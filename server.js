const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static assets (only login page for now)
app.use(express.static(__dirname));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Login app listening on http://localhost:${PORT}`);
});

