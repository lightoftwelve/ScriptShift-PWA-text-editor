import { openDB } from "idb";

const initdb = async () =>
  openDB("scriptshift", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("scriptshift")) {
        console.log("scriptshift database already exists");
        return;
      }
      db.createObjectStore("scriptshift", {
        keyPath: "id",
        autoIncrement: true,
      });
      console.log("scriptshift database created");
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction("scriptshift", "readwrite");
  const store = tx.objectStore("scriptshift");
  await store.put({ content });
  return tx.done;
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction("scriptshift", "readonly");
  const store = tx.objectStore("scriptshift");
  const allContent = await store.getAll();
  return allContent;
};

initdb();

// Starter Code:
// import { openDB } from 'idb';
// const initdb = async () =>
//   openDB('jate', 1, {
//     upgrade(db) {
//       if (db.objectStoreNames.contains('jate')) {
//         console.log('jate database already exists');
//         return;
//       }
//       db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
//       console.log('jate database created');
//     },
//   });
// // TODO: Add logic to a method that accepts some content and adds it to the database
// export const putDb = async (content) => console.error('putDb not implemented');
// // TODO: Add logic for a method that gets all the content from the database
// export const getDb = async () => console.error('getDb not implemented');
// initdb();
