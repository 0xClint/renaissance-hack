function djb2Hash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0; // Ensure hash is a positive integer
}

export function setHashPosition(str) {
  const hash = djb2Hash(str);
  return (hash % 9) - 4;
}
