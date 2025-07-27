// Terminal Simulation
const terminalContent = document.getElementById('terminal-content');
const mainContent = document.getElementById('main-content');
let currentInput = '';

const commands = {
  help: 'Available commands: help, clear, about, skills, experience, projects, contact, start',
  clear: function() {
  // Refresh the page to completely reset the terminal
  location.reload();
},
  about: 'Antony Esthak Twinson - Cybersecurity specialist and engineering student. Top 2% on TryHackMe.',
  skills: 'Penetration Testing, Web Security, Python, Burp Suite, Metasploit, Nmap, and more.',
  experience: 'Bug Bounty Hunter since 2023. TryHackMe Top 2% performer.',
  projects: 'Web Vulnerability Scanner, CTF Solutions, and various security tools.',
  contact: 'Email: twinson333@gmail.com | Phone: +91 9345150124 | LinkedIn: linkedin.com/in/antonyesthaktwinson',
  start: function() {
    addTerminalOutput('> Starting portfolio...');
    setTimeout(() => {
      addTerminalOutput('> Loading complete. Redirecting...');
      setTimeout(() => {
        document.querySelector('.terminal-window').style.opacity = '0';
        setTimeout(() => {
          document.querySelector('.terminal-window').style.display = 'none';
          mainContent.classList.remove('hidden');
          
          // Animate main content entrance
          mainContent.style.opacity = '0';
          mainContent.style.transform = 'translateY(20px)';
          mainContent.style.transition = 'opacity 0.5s, transform 0.5s';
          
          setTimeout(() => {
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
          }, 100);
        }, 500);
      }, 1000);
    }, 500);
  }
};

// Helper function to add output to terminal
function addTerminalOutput(text) {
  const p = document.createElement('p');
  p.textContent = text;
  terminalContent.appendChild(p);
  terminalContent.scrollTop = terminalContent.scrollHeight;
}

// Helper function to add new input line
function addInputLine() {
  const inputLine = document.createElement('p');
  inputLine.className = 'terminal-input-line';
  inputLine.innerHTML = '><span id="cursor" class="terminal-cursor">_</span>';
  terminalContent.appendChild(inputLine);
  terminalContent.scrollTop = terminalContent.scrollHeight;
  
  // Focus on the terminal (for mobile keyboards)
  const terminal = document.querySelector('.terminal-window');
  terminal.setAttribute('tabindex', '0');
  terminal.focus();
}

// Initialize terminal
function initTerminal() {
  terminalContent.innerHTML = `
    <p>> Initializing security portfolio...</p>
    <p>> Loading pentesting modules...</p>
    <p>> Welcome to Antony Esthak Twinson's cybersecurity hub</p>
    <p>> Type 'help' for available commands</p>
  `;
  addInputLine();
  
  // Start the portfolio automatically after 8 seconds if no interaction
  setTimeout(() => {
    if (!interactionDetected) {
      commands.start();
    }
  }, 8000);
}

// Handle keyboard input only when terminal is active
function handleTerminalInput(e) {
  // Only process if terminal is visible
  const terminalWindow = document.querySelector('.terminal-window');
  if (terminalWindow.style.display === 'none') return;

  const cursor = document.getElementById('cursor');
  const inputLine = document.querySelector('.terminal-input-line');
  
  if (!inputLine || !cursor) return;
  
  // Handle Enter key
  if (e.key === 'Enter') {
    e.preventDefault();
    
    // Get clean command text (without cursor)
    const commandText = inputLine.textContent.replace(/_/g, '').trim();
    const command = commandText.replace('>', '').trim();
    
    // Remove the entire input line
    terminalContent.removeChild(inputLine);
    
    // Add the command to output
    const commandOutput = document.createElement('p');
    commandOutput.textContent = '>' + command;
    terminalContent.appendChild(commandOutput);
    
    // Process command and add output
    if (command in commands) {
      if (typeof commands[command] === 'function') {
        commands[command]();
      } else {
        addTerminalOutput(commands[command]);
      }
    } else if (command) {
      addTerminalOutput(`Command not found: ${command}`);
    }
    
    // Add new input line
    currentInput = '';
    addInputLine();
  }
  // Handle backspace
  else if (e.key === 'Backspace') {
    e.preventDefault();
    if (currentInput.length > 0) {
      currentInput = currentInput.slice(0, -1);
      inputLine.textContent = '>' + currentInput;
      inputLine.appendChild(cursor);
    }
  }
  // Handle normal character input
  else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey) {
    // Only process if we're not in a form input
    if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
      e.preventDefault();
      currentInput += e.key;
      inputLine.textContent = '>' + currentInput;
      inputLine.appendChild(cursor);
    }
  }
}

// Track interaction
let interactionDetected = false;
document.addEventListener('click', () => interactionDetected = true);
document.addEventListener('keydown', (e) => {
  interactionDetected = true;
  handleTerminalInput(e);
});

// Initialize the terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', initTerminal);

// Smooth scrolling for navigation
document.querySelectorAll('.nav-link').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: 'smooth'
    });
  });
});

// Form submission with email functionality
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  // Create mailto link
  const subject = `Message from ${name} (${email})`;
  const body = encodeURIComponent(message);
  const mailtoLink = `mailto:twinson333@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  
  // Open default email client
  window.location.href = mailtoLink;
  
  // Optional: Show confirmation message
  const confirmation = document.createElement('div');
  confirmation.className = 'cyber-alert';
  confirmation.innerHTML = `
    <p>> Message queued for transmission...</p>
    <p>> Opening mail client...</p>
  `;
  this.parentNode.insertBefore(confirmation, this.nextSibling);
  
  // Optional: Reset form after delay
  setTimeout(() => {
    this.reset();
    confirmation.remove();
  }, 3000);
});

// Typewriter effect for subtitle
const typewriterElements = document.querySelectorAll('.typewriter');
typewriterElements.forEach(el => {
  const strings = JSON.parse(el.getAttribute('data-strings'));
  let currentString = 0;
  
  function typeNextString() {
    const text = strings[currentString];
    el.style.animation = 'none';
    el.style.width = '0';
    el.textContent = '';
    
    setTimeout(() => {
      el.style.animation = 'typewriter 3s steps(40) 1s 1 normal both, blink-caret 0.75s step-end infinite';
      el.textContent = text;
      
      currentString = (currentString + 1) % strings.length;
      setTimeout(typeNextString, 5000);
    }, 500);
  }
  
  typeNextString();
});
