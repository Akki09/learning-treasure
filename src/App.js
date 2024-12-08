import React, { useState, useEffect, useRef } from 'react';
import Sidebar from './components/Sidebar';
import FileViewer from './components/FileViewer';

const App = () => {
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [folders, setFolders] = useState([]);
  const [fileContent, setFileContent] = useState('');
  const [quote, setQuote] = useState('');
  const [showHome, setShowHome] = useState(true); // Home page toggle
  const [expandedDSA, setExpandedDSA] = useState(false); // DSA expand/collapse state
  const [expandedFolder, setExpandedFolder] = useState(null); // Expanded folder state

  const mainAreaRef = useRef(null); // Reference to the main area div

  const quotes = [
    "Learning is a treasure that will follow its owner everywhere. – Chinese Proverb",
    "The more that you read, the more things you will know. The more that you learn, the more places you’ll go. — Dr. Seuss",
    "Education is the most powerful weapon which you can use to change the world. — Nelson Mandela",
    "An investment in knowledge pays the best interest. — Benjamin Franklin",
    "The beautiful thing about learning is that no one can take it away from you. — B.B. King",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. — Mahatma Gandhi",
    "Tell me and I forget. Teach me and I remember. Involve me and I learn. — Benjamin Franklin"
  ];

  //const response = await fetch('http://localhost:5000/api/folders');
  // when working local use localhost
  useEffect(() => {
    const fetchFolders = async () => {
      const response = await fetch('https://learning-treasure.onrender.com/api/folders');
      const folderData = await response.json();
      setFolders(folderData);
    };

    fetchFolders();
  }, []);

  // Handle folder click (expand/collapse)
  const handleFolderClick = (folder) => {
    if (folder.name === "Home") {
      // Reset everything when Home is clicked
      setShowHome(true); // Show Home content
      setSelectedFolder(null);
      setSelectedFile(null);
      setExpandedDSA(false); // Collapse DSA
      setExpandedFolder(null); // Collapse all folders
      // Reset the scroll position to the top when Home is clicked
      if (mainAreaRef.current) {
        mainAreaRef.current.scrollTop = 0;
      }
      return;
    }

    // Random quote for the selected folder
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(randomQuote);

    setSelectedFolder(folder);
    setSelectedFile(null);
    setShowHome(false); // Hide home content when a folder is selected
    setExpandedDSA(true); // Expand DSA
    setExpandedFolder(expandedFolder === folder.name ? null : folder.name); // Toggle folder expansion

    // Reset the scroll position to the top when a folder is clicked
    if (mainAreaRef.current) {
      mainAreaRef.current.scrollTop = 0;
    }
  };

  // Handle file click (display content)
  const handleFileClick = (fileName) => {
    if (!selectedFolder) return;

    // when working local use local host 
    //fetch(`http://localhost:5000/api/files/${folderName}/${fileName}`)
    const folderName = selectedFolder.name;
    fetch(`https://learning-treasure.onrender.com/api/files/${folderName}/${fileName}`)
      .then((res) => res.json())
      .then((data) => {
        setFileContent(data.content);
        setSelectedFile(fileName);
        // Reset the scroll position to the top when a file is selected
        if (mainAreaRef.current) {
          mainAreaRef.current.scrollTop = 0;
        }
      })
      .catch((err) => console.error('Error fetching file content:', err));
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        folders={folders}
        onFolderClick={handleFolderClick}
        onFileSelect={handleFileClick}
        expandedDSA={expandedDSA}
        expandedFolder={expandedFolder}
        setExpandedDSA={setExpandedDSA}
        setExpandedFolder={setExpandedFolder}
      />

      <div ref={mainAreaRef} className="flex-1 p-6 overflow-y-auto">
        <div className="text-center text-3xl font-semibold mb-6 text-blue-600">
          DSA IMP Questions
        </div>

        {/* Show Home content */}
        {showHome ? (
          <div className="text-center text-xl text-gray-700 mt-12">
            <p>Welcome to DSA IMP Questions! Start learning by selecting a topic from the sidebar :)</p>
          </div>
        ) : selectedFolder ? (
          // Show quote for selected folder
          <div className="text-center text-xl text-gray-700 mt-12">
            <p>"{quote}"</p>
          </div>
        ) : (
          <div className="text-center text-gray-600 mt-12">Select a folder to view its files.</div>
        )}

        {/* Render file content if a file is selected */}
        {selectedFile && (
          <FileViewer content={fileContent} />
        )}
      </div>
    </div>
  );
};

export default App;
