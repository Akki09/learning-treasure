import React from "react";

const FolderItem = ({ folder, isActive, onFolderClick, onFileSelect }) => {
  return (
    <div className="mb-4">
      <div
        className="cursor-pointer text-lg font-medium hover:text-yellow-300 transition-colors"
        onClick={() => onFolderClick(folder.name)}
      >
        {folder.name}
      </div>
      {isActive && (
        <div className="ml-4 mt-2 space-y-2">
          {folder.files.map((file) => (
            <div
              key={file}
              className="cursor-pointer text-sm hover:text-blue-300 transition-colors"
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
