import React, { useEffect, useRef } from 'react';
import ACTIONS from '@/backend/sockets/actions';

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
      textareaRef.current = document.getElementById('editor');

      textareaRef.current.addEventListener('input', handleInputChange);
      
      function handleInputChange(event) {
        const code = event.target.value;
        onCodeChange(code);
        // Emitting code change to the socket
        socketRef.current.emit(ACTIONS.CODE_CHANGED, {
          roomId,
          code,
        });

    };

  }, [roomId, socketRef]);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(ACTIONS.CODE_CHANGED, ({ code }) => {
        if (code !== null) {
          textareaRef.current.value = code;
        }
      });
    }

    return () => {
      socketRef.current.off(ACTIONS.CODE_CHANGED);
    };
  }, [socketRef.current]);

  return(
      <textarea id='editor' className="w-full h-full bg-secondary text-white px-4 py-5 text-sm 
      resize-none outline-none tracking-wider" 
    placeholder="Start Coding..."></textarea>
  )
  }

export default Editor;
