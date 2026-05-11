import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../config/firebase';

export const submitProjectRequest = async (userId, requestData, file) => {
  try {
    let fileUrl = null;
    let fileName = null;

    if (file) {
      // Upload file to Firebase Storage
      const storageRef = ref(storage, `project_requests/${userId}/${Date.now()}_${file.name}`);
      const uploadResult = await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(uploadResult.ref);
      fileName = file.name;
    }

    // Save request to Firestore
    const docRef = await addDoc(collection(db, 'project_requests'), {
      userId,
      ...requestData,
      status: 'pending',
      fileUrl,
      fileName,
      createdAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error("Error submitting project request:", error);
    throw error;
  }
};

export const submitContactMessage = async (messageData) => {
  try {
    const docRef = await addDoc(collection(db, 'contact_messages'), {
      ...messageData,
      status: 'unread',
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error submitting contact message:", error);
    throw error;
  }
};
