import { useEffect, useRef, useState } from 'react';
import { highlight } from '@/lib/prism';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export default function CodeBlock({ code, language = 'javascript' }: CodeBlockProps) {
  const codeRef = useRef<HTMLPreElement>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  
  useEffect(() => {
    if (codeRef.current) {
      highlight(codeRef.current);
    }
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative rounded overflow-hidden">
      <button 
        className={`absolute top-2 right-2 z-10 px-2 py-1 text-sm rounded ${
          copySuccess ? 'bg-green-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'
        } transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100`}
        onClick={handleCopy}
      >
        {copySuccess ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg> Copied!
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-1" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg> Copy
          </>
        )}
      </button>
      <pre 
        ref={codeRef}
        className="language-javascript"
      ><code>{code}</code></pre>
    </div>
  );
}
