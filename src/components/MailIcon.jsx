import { useEffect } from 'react';

const MailIcon = ({ width = "24px", height = "24px", className = "" }) => {
  useEffect(() => {
    // Load Lordicon script if not already loaded
    if (!window.lordIcon) {
      const script = document.createElement('script');
      script.src = 'https://cdn.lordicon.com/lordicon.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  return (
    <lord-icon
      src="https://cdn.lordicon.com/zvamcipt.json"
      trigger="hover"
      style={{ width, height }}
      className={className}
    />
  );
};

export default MailIcon; 