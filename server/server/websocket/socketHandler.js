const { applyOperation } = require('../../shared/ot');
const Document = require('../models/Document');

const socketHandler = (ws, wss) => {
  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    const { docId, operation } = data;

    const doc = await Document.findById(docId);
    const updatedContent = applyOperation(doc.content, operation);
    doc.content = updatedContent;
    await doc.save();

    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === ws.OPEN) {
        client.send(JSON.stringify({ docId, operation }));
      }
    });
  });
};

module.exports = socketHandler;
