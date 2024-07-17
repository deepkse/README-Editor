import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import 'github-markdown-css/github-markdown.css';
import './App.css';

function App() {
  const [markdown, setMarkdown] = useState('# Hello, world!\n\nThis is a preview of your README.md');

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