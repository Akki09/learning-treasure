const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for frontend access

// Utility function to get files in a directory
const getFilesInDirectory = (dirPath) => {
  return fs.readdirSync(dirPath)
    .filter(file => fs.lstatSync(path.join(dirPath, file)).isFile());
};

// API to get folder structure dynamically from the 'DSA' directory
app.get("/api/folders", (req, res) => {
  const dsaFolderPath = path.join(__dirname, "public", "DSA"); // Main folder is DSA
  const folders = fs.readdirSync(dsaFolderPath).filter(folder => fs.lstatSync(path.join(dsaFolderPath, folder)).isDirectory());

  const folderStructure = folders.map(folder => ({
    name: folder,
    files: getFilesInDirectory(path.join(dsaFolderPath, folder)),
  }));

  res.json(folderStructure); // Send folder structure to the frontend
});

// API to get content of a specific file
app.get("/api/files/:folder/:file", (req, res) => {
  const { folder, file } = req.params;
  const filePath = path.join(__dirname, "build", "DSA", folder, file); // Construct the file path

  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf-8");
    res.json({ content }); // Send file content
  } else {
    res.status(404).json({ message: "File not found" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

