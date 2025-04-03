// Simple implementation of code highlighting 
// This is a simplified version of Prism.js for our purposes

interface PrismGrammar {
  [key: string]: any;
}

// Define JavaScript language grammar
const jsGrammar: PrismGrammar = {
  comment: {
    pattern: /(\/\/.*|\/\*[\s\S]*?\*\/)/,
    greedy: true
  },
  string: {
    pattern: /(["'`])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
    greedy: true
  },
  keyword: /\b(await|async|class|const|let|var|function|if|else|for|while|return|new|this|try|catch|throw|finally|switch|case|break|continue|typeof|instanceof|import|export|from)\b/,
  boolean: /\b(true|false)\b/,
  number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
  operator: /[-+*/%<>=&|^!?]+/,
  punctuation: /[{}[\];(),.:]/
};

// Colors based on the design reference
const colors = {
  comment: '#6c7280',
  string: '#059669',
  keyword: '#7c3aed',
  boolean: '#d97706',
  number: '#2563eb',
  operator: '#f59e0b',
  punctuation: '#6b7280',
  function: '#d946ef',
  tag: '#ef4444',
  attr: '#0ea5e9'
};

export function highlight(preElement: HTMLPreElement): void {
  const code = preElement.textContent || '';
  let html = '';
  let position = 0;
  
  // Simple tokenization for highlighting
  while (position < code.length) {
    let token = null;
    let tokenColor = null;
    
    // Check for comments
    const commentMatch = /^(\/\/.*|\/\*[\s\S]*?\*\/)/.exec(code.slice(position));
    if (commentMatch) {
      token = commentMatch[0];
      tokenColor = colors.comment;
    }
    // Check for strings
    else if (/^(["'`])/.test(code.slice(position))) {
      const quoteChar = code[position];
      let endPos = position + 1;
      let escaped = false;
      
      while (endPos < code.length) {
        if (escaped) {
          escaped = false;
        } else if (code[endPos] === '\\') {
          escaped = true;
        } else if (code[endPos] === quoteChar) {
          endPos++;
          break;
        }
        endPos++;
      }
      
      token = code.slice(position, endPos);
      tokenColor = colors.string;
    }
    // Check for keywords
    else if (/^[a-zA-Z_$][a-zA-Z0-9_$]*/.test(code.slice(position))) {
      const wordMatch = /^[a-zA-Z_$][a-zA-Z0-9_$]*/.exec(code.slice(position));
      if (wordMatch) {
        token = wordMatch[0];
        if (/^(await|async|class|const|let|var|function|if|else|for|while|return|new|this|try|catch|throw|finally|switch|case|break|continue|typeof|instanceof|import|export|from)$/.test(token)) {
          tokenColor = colors.keyword;
        } else if (/^(true|false)$/.test(token)) {
          tokenColor = colors.boolean;
        } else if (/^document|window|console|Math|Array|Object|String|Number|JSON|Date|RegExp|Map|Set|Promise|async|await/.test(token)) {
          tokenColor = colors.function;
        }
      }
    }
    // Check for numbers
    else if (/^(0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/.test(code.slice(position))) {
      const numMatch = /^(0x[\da-f]+|(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?)/.exec(code.slice(position));
      if (numMatch) {
        token = numMatch[0];
        tokenColor = colors.number;
      }
    }
    // Check for operators
    else if (/^[-+*/%<>=&|^!?]+/.test(code.slice(position))) {
      const opMatch = /^[-+*/%<>=&|^!?]+/.exec(code.slice(position));
      if (opMatch) {
        token = opMatch[0];
        tokenColor = colors.operator;
      }
    }
    // Check for punctuation
    else if (/^[{}[\];(),.:]+/.test(code.slice(position))) {
      const punctMatch = /^[{}[\];(),.:]+/.exec(code.slice(position));
      if (punctMatch) {
        token = punctMatch[0];
        tokenColor = colors.punctuation;
      }
    }
    
    if (token) {
      if (tokenColor) {
        html += `<span style="color: ${tokenColor}">${escapeHTML(token)}</span>`;
      } else {
        html += escapeHTML(token);
      }
      position += token.length;
    } else {
      html += escapeHTML(code[position]);
      position++;
    }
  }
  
  preElement.innerHTML = html;
  preElement.classList.add('language-javascript');
  preElement.style.background = '#1e293b';
  preElement.style.color = '#ffffff';
  preElement.style.padding = '1rem';
  preElement.style.borderRadius = '0.25rem';
  preElement.style.overflow = 'auto';
  preElement.style.fontFamily = 'monospace';
}

function escapeHTML(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
