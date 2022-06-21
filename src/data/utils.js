import { getDoc } from 'firebase/firestore';

export async function get(ref) {
  const snapshot = await getDoc(ref);
  return snapshot.data();
}

export function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}
