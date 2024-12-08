import React, { useState } from "react";
import ReactMarkdown from "react-markdown"; // For markdown rendering
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"; // For syntax highlighting
import { FiClipboard } from 'react-icons/fi'; // Import the clipboard icon
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Dracula theme

const FileViewer = ({ content }) => {
  const [copiedIndex, setCopiedIndex] = useState(null); // Track which code block was copied

  // Function to copy content to clipboard
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index); // Set the copied block index
      setTimeout(() => {
        setCopiedIndex(null); // Reset the copied index after 1 second
      }, 1000); // Reduced duration for quick fade-out
    }).catch(err => {
      console.error("Clipboard copy failed: ", err);
    });
  };

  return (
    <div className="bg-gray-50 shadow-md rounded-md p-6 relative">
      {/* Display file content */}
      <ReactMarkdown
        children={content}
        components={{
          code({ inline, className, children, node }) {
            const match = /language-(\w+)/.exec(className || "");
            const index = node.position.start.line; // Use line number as the index
            return !inline && match ? (
              <div className="relative">
                <SyntaxHighlighter
                  language={match[1]}
                  style={dracula} // Using Dracula theme for syntax highlighting
                  customStyle={{
                    borderRadius: '8px',
                    padding: '16px',
                    marginBottom: '16px',
                    backgroundColor: match[1] === 'java' ? '#1e1e1e' : '#282A36', // Darker background for Java code
                  }}
                >
                  {children}
                </SyntaxHighlighter>

                {/* Container for the button and "Copied!" message */}
                <div className="absolute top-2 right-2 flex items-center">
                  <button
                    onClick={() => handleCopy(children, index)} // Copy code content with index
                    className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    <FiClipboard />
                  </button>

                  {/* "Copied!" message for the specific code block */}
                  {copiedIndex === index && (
                    <div
                      className="ml-2 bg-blue-500 text-white py-1 px-3 rounded-md shadow-md text-xs opacity-100 transition-opacity duration-1000 ease-out"
                    >
                      Copied!
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <code className={`text-sm ${className}`}>{children}</code>
            );
          },
          // Add support for other elements like headings, links, images, etc.
          h1: ({ node, children }) => (
            <h1 className="text-3xl font-bold mb-4 text-blue-700">{children}</h1>
          ),
          h2: ({ node, children }) => (
            <h2 className="text-2xl font-semibold mb-4 text-blue-600">{children}</h2>
          ),
          h3: ({ node, children }) => (
            <h3 className="text-xl font-medium mb-4 text-blue-500">{children}</h3>
          ),
          p: ({ node, children }) => (
            <p className="text-lg mb-4 text-gray-800">{children}</p>
          ),
          // Rendering hyperlinks correctly
          a: ({ node, children, href }) => {
            return (
              <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700">
                {children}
              </a>
            );
          },
          img: ({ node, alt, src }) => (
            <img src={src} alt={alt} className="max-w-full h-auto rounded-md shadow-md mb-4" />
          ),
        }}
      />
    </div>
  );
};

export default FileViewer;
