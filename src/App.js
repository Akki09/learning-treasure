import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';

const App = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [quote, setQuote] = useState('');
  const [showHome, setShowHome] = useState(true); // Home page toggle
  const [expandedDSA, setExpandedDSA] = useState(false); // State for expanding/collapsing DSA
  const [expandedFolder, setExpandedFolder] = useState(null); // State for expanding/collapsing individual folders

  const quotes = [
    "Learning is a treasure that will follow its owner everywhere. – Chinese Proverb",
    "The more that you read, the more things you will know. The more that you learn, the more places you’ll go. — Dr. Seuss",
    "Education is the most powerful weapon which you can use to change the world. — Nelson Mandela",
    "An investment in knowledge pays the best interest. — Benjamin Franklin",
    "The beautiful thing about learning is that no one can take it away from you. — B.B. King",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. — Mahatma Gandhi",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn. — Benjamin Franklin"
  ];

  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch('http://localhost:5000/api/folders');
      const folderData = await response.json();
      setFolders(folderData);
    };

    fetchFolders();
  }, []);

  const handleFolderClick = (folder) => {
    if (folder.name === "Home") {
      setShowHome(true); // Show Home content when Home is clicked
      setSelectedFolder(null); // Reset the selected folder
      setSelectedFile(null); // Reset the selected file
      setExpandedDSA(false); // Collapse DSA when Home is clicked
      setExpandedFolder(null); // Collapse any expanded folders
      return;
    }

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);
    setSelectedFolder(folder);
    setSelectedFile(null);
    setShowHome(false); // Hide home content when a folder is selected
    setExpandedDSA(true); // Ensure DSA is expanded when a folder is selected
    setExpandedFolder(folder.name); // Expand the clicked folder
  };

  const handleFileClick = (fileName) => {
    if (!selectedFolder) return;

    const folderName = selectedFolder.name;
    fetch(`http://localhost:5000/api/files/${folderName}/${fileName}`)
      .then((res) => res.json())
      .then((data) => {
        setFileContent(data.content);
        setSelectedFile(fileName);
      })
      .catch((err) => console.error('Error fetching file content:', err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        folders={folders}
        onFolderClick={handleFolderClick} // Folder click handler
        onFileSelect={handleFileClick} // File click handler
        expandedDSA={expandedDSA} // Pass the expanded state for DSA
        expandedFolder={expandedFolder} // Pass the expanded folder state
        setExpandedDSA={setExpandedDSA} // Pass setter function for DSA expansion state
        setExpandedFolder={setExpandedFolder} // Pass setter function for expanded folder state
      />

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="text-center text-3xl font-semibold mb-6 text-blue-600">
          DSA IMP Questions
        </div>

        {showHome ? (
          <div className="text-center text-xl text-gray-700 mt-12">
            <p>Welcome to DSA IMP Questions! Start learning by selecting a topic from the sidebar :)</p>
          </div>
        ) : selectedFolder ? (
          <div className="text-center text-xl text-gray-700 mt-12">
            <p>"{quote}"</p>
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">Select a folder to view its files.</div>
        )}

        {selectedFile && (
          <FileViewer content={fileContent} />
        )}
      </div>
    </div>
  );
};

export default App;
