import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState(`# Project Name

Short description or tagline for your project.
    
## Table of Contents
    
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

A brief introduction to what your project is and what it does.

## Features

- List of features or functionalities of your project.
- Bullet points are often used here.

## Installation

Instructions on how to install and set up your project.

\`\`\`bash
$ npm install
$ npm start
\`\`\`

Include any dependencies or prerequisites needed for installation.

## Usage

Instructions and examples on how to use your project.

\`\`\`javascript
const example = require('your-module');

// Use example here
\`\`\`

Include screenshots, gifs, or code snippets demonstrating usage.

## Contributing

Guidelines if you want others to contribute to your project.

## License

This project is licensed under the [MIT License](LICENSE).`);

  const handleInputChange = (e) => {
    setMarkdown(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <header>
        <h1>README.md Editor</h1>
        <div>
          <input type="file" accept=".md" onChange={handleFileUpload} />
          <button onClick={handleDownload}>Download README.md</button>
        </div>
      </header>
      <main>
        <div className="editor-pane">
          <textarea
            className="markdown-editor"
            value={markdown}
            onChange={handleInputChange}
            placeholder="Enter your markdown here..."
          />
        </div>
        <div className="preview-pane">
          <div className="markdown-body">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;