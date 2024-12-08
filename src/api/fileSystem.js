export const fetchFolderStructure = async () => {
    return [
      {
        name: "Folder1",
        files: ["File1.md", "File2.md"],
      },
      {
        name: "Folder2",
        files: ["File3.md"],
      },
    ];
  };
  
  export const fetchFileContent = async (fileName) => {
    const fileContent = {
      "File1.md": `# Markdown Content\n\n\`\`\`java\nSystem.out.println("Hello, World!");\n\`\`\``,
      "File2.md": `# Another Markdown\n\n\`\`\`java\nint a = 5;\n\`\`\``,
      "File3.md": `# Sample File\n\n\`\`\`java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Sample Code");\n    }\n}\n\`\`\``,
    };
    return fileContent[fileName] || "File not found";
  };
  