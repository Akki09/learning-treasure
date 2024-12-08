import React from "react";

const FolderItem = ({ folder, isActive, onFolderClick, onFileSelect }) => {
  return (
    <div className="mb-4">
      <div
        className="cursor-pointer font-bold text-lg mb-2 hover:text-yellow-300"
        onClick={() => onFolderClick(folder.name)}
      >
        {folder.name}
      </div>
      {isActive && (
        <div className="ml-4">
          {folder.files.map((file) => (
            <div
              key={file}
              className="cursor-pointer text-sm hover:text-blue-300"
              onClick={() => onFileSelect(file)}
            >
              {file.replace(".md", "")}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderItem;
