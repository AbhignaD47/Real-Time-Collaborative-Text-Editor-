function applyOperation(content, op) {
  const { position, insert, deleteCount } = op;
  let updated = content;

  if (deleteCount) {
    updated = updated.slice(0, position) + updated.slice(position + deleteCount);
  }
  if (insert) {
    updated = updated.slice(0, position) + insert + updated.slice(position);
  }

  return updated;
}

module.exports = { applyOperation };
