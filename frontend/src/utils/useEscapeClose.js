import React from 'react';

function useEscapeClose (isOpen, onClose) {
    React.useEffect(() => {
      if (!isOpen) return;
      const handleEscapeClose = (evt) => {
        if (evt.key === 'Escape') onClose();
      };
      
      document.addEventListener("keydown", handleEscapeClose);
      return () => document.removeEventListener("keydown", handleEscapeClose);
    }, [isOpen, onClose]);
}

export default useEscapeClose;