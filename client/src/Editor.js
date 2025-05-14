import React, { useEffect, useRef, useState } from 'react';
import { initSocket } from './websocket';

export default function Editor({ docId }) {
  const [text, setText] = useState('');
  const wsRef = useRef(null);

  useEffect(() => {
    wsRef.current = initSocket();

    wsRef.current.onmessage = (msg) => {
      const { operation } = JSON.parse(msg.data);
      const { position, insert, deleteCount } = operation;
      let updated = text;

      if (deleteCount) {
        updated = updated.slice(0, position) + updated.slice(position + deleteCount);
      }
      if (insert) {
        updated = updated.slice(0, position) + insert + updated.slice(position);
      }

      setText(updated);
    };

    return () => wsRef.current.close();
  }, [text]);

  const handleChange = (e) => {
    const value = e.target.value;
    const operation = {
      position: 0,
      insert: value,
      deleteCount: text.length,
    };

    setText(value);
    wsRef.current.send(JSON.stringify({ docId, operation }));
  };

  return <textarea value={text} onChange={handleChange} />;
}
