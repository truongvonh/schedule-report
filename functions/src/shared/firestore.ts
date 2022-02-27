import {CollectionReference, DocumentData, Query} from "@google-cloud/firestore";
import * as admin from "firebase-admin";

admin.initializeApp(); // needed to initialize the admin sdk

const initQuery =
  (collectionName: FIRESTORE_COLLECTIONS): CollectionReference<DocumentData> => {
    return admin
        .firestore()
        .collection(collectionName);
  };

enum FIRESTORE_COLLECTIONS {
  REPORT_HISTORY= "report_history",
}

const findBy = async (baseQuery: Query<DocumentData>) => {
  const snapshots = await baseQuery.get();

  if (snapshots.empty) return [];
  const result: DocumentData[] = [];

  snapshots.forEach((doc) => {
    result.push(doc.data());
  });

  return result;
};

const addNewDataToCollection = async <T>(
  collectionName: FIRESTORE_COLLECTIONS,
  payload: T) => {
  await admin.firestore().collection(collectionName).add(payload);
};

export {
  initQuery,
  findBy,
  FIRESTORE_COLLECTIONS,
  addNewDataToCollection,
};

