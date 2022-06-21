import { collection, getDocs, doc } from "firebase/firestore";

export async function getAnimalsList(db) {
  const animalsCol = collection(db, 'animalsCol');
  // console.log(animalsCol);
  const animalsSnapshot = await getDocs(animalsCol);
  // animalsSnapshot.forEach((animalDoc) => {
  //   const docRef = doc(db, 'animalsCollection', animalDoc.id);
    // const docSnap = getDoc(docRef);
  // })
  console.log(animalsSnapshot);
  // const data = await animalsSnapshot.docs[0].data();
  // console.log(data)
  return animalsSnapshot.docs.map(doc => doc.data());
}

// export async function getAnimals(db, userId) {
//   const usersList = await getAnimalsList(db);
//   return usersList.find(users => users.username === userId);
// }
