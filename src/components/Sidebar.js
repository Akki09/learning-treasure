import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faHome, faFolder, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({
  folders,
  onFolderClick,
  onFileSelect,
  expandedDSA,
  expandedFolder,
  setExpandedDSA,
  setExpandedFolder
}) => {

  const handleDSAClick = () => {
    setExpandedDSA(!expandedDSA); // Toggle DSA's expanded state
    if (expandedDSA) {
      setExpandedFolder(null); // Collapse all folders when DSA is collapsed
    }
  };

  const handleFolderClick = (folder) => {
    if (expandedFolder === folder.name) {
      setExpandedFolder(null); // Collapse folder if it's already expanded
    } else {
      setExpandedFolder(folder.name); // Expand the folder
    }
    onFolderClick(folder); // Call the function passed down as a prop
  };

  return (
    <div className="w-64 bg-blue-800 text-white p-4 flex flex-col h-screen">
      {/* Home Button */}
      <div
        className="cursor-pointer mb-6 text-xl font-semibold flex items-center"
        onClick={() => {
          onFolderClick({ name: "Home" }); // Trigger the "Home" folder click
        }}
      >
        <FontAwesomeIcon icon={faHome} className="text-2xl mr-2" />
        Home
      </div>

      {/* DSA Heading (Dynamic Expandable Section) */}
      <div
        className="cursor-pointer text-lg font-semibold mb-2 flex items-center justify-between"
        onClick={handleDSAClick}
      >
        <span>DSA</span>
        <FontAwesomeIcon icon={expandedDSA ? faChevronUp : faChevronDown} />
      </div>

      {/* Folder List under DSA */}
      {expandedDSA && (
        <div className="pl-4 space-y-2 flex-grow overflow-y-auto">
          {folders.map((folder) => (
            <div key={folder.name} className="cursor-pointer">
              {/* Folder Name */}
              <div
                onClick={() => handleFolderClick(folder)}
                className="text-lg font-medium hover:text-blue-400 flex items-center justify-between"
              >
                <span>
                  <FontAwesomeIcon icon={faFolder} className="mr-2" />
                  {folder.name}
                </span>
                <FontAwesomeIcon icon={expandedFolder === folder.name ? faChevronUp : faChevronDown} />
              </div>

              {/* Show files if folder is expanded */}
              {/* Show files if folder is expanded */}
              {expandedFolder === folder.name && folder.files && folder.files.length > 0 && (
                <ul className="pl-4 space-y-1 mt-2 list-disc list-inside text-gray-300">
                  {folder.files.map((file) => (
                    <li
                      key={file}
                      onClick={() => onFileSelect(file)}
                      className="cursor-pointer text-sm hover:text-white"
                    >
                      {file.replace(/\.[^/.]+$/, '')} {/* Remove file extension */}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Developer Information Section */}
      <div className="text-center bg-black p-4 rounded-lg border-2 border-gray-700 mt-auto">
        <div className="text-xs text-gray-300">Developed by</div>
        <div className="font-semibold text-lg mt-2 text-white">Akshay Vakharia</div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="https://github.com/Akki09" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FontAwesomeIcon icon={faGithub} className="text-2xl" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
          </a>
          <a href="https://linkedin.com/in/akshay-vakharia-31187959" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;