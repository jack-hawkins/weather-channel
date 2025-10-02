const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();
const MUSIC_DIR = path.join(__dirname, "music"); // put mp3s in ./music/

// Serve static MP3 files
app.use("/music", express.static(MUSIC_DIR));

app.use(express.static(path.join(__dirname,"public")));

// API endpoint that returns a list of mp3 files
app.get("/playlist", (req, res) => {
  fs.readdir(MUSIC_DIR, (err, files) => {
    if (err) return res.status(500).send(err);

    // Only return .mp3 files
    const mp3s = files.filter(f => f.toLowerCase().endsWith(".mp3"));
    res.json(mp3s);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

