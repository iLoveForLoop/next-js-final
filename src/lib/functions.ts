import { db } from "./firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { getSessionId } from "@/utils/session";

export async function  addPost(content : string){
    const now = Timestamp.now();
    const expiresAt = Timestamp.fromDate(
      new Date(Date.now() + 24 * 60 * 60 * 1000)
    );

    await addDoc(collection(db, "posts"), {
      content,
      createdAt: now,
      expiresAt,
      sessionId: getSessionId(),
      reactions: { like: 0, laugh: 0, cry: 0 },
      userLikes: [], 
    });
}


export async function reactPost(newReaction : string, id: string){
        const sessionId = getSessionId();
        const postRef = doc(db, "posts", id);
        const postSnap = await getDoc(postRef);
    
        if (postSnap.exists()) {
          const postData = postSnap.data();
          const userLikes = postData.userLikes || [];
    
          const existing = userLikes.find(
            (like: any) => like.sessionId === sessionId
          );
    
          if (!existing) {
            await updateDoc(postRef, {
              [`reactions.${newReaction}`]:
                (postData.reactions?.[newReaction] || 0) + 1,
              userLikes: [...userLikes, { sessionId, reaction: newReaction }],
            });
          } else {
            if (existing.reaction !== newReaction) {
              const updatedUserLikes = userLikes.map((like: any) =>
                like.sessionId === sessionId
                  ? { ...like, reaction: newReaction }
                  : like
              );
    
              await updateDoc(postRef, {
                [`reactions.${existing.reaction}`]:
                  (postData.reactions?.[existing.reaction] || 1) - 1,
                [`reactions.${newReaction}`]:
                  (postData.reactions?.[newReaction] || 0) + 1,
                userLikes: updatedUserLikes,
              });
            }
           
          }
        }
}

export async function delPost(id: string){
    await deleteDoc(doc(db, 'posts', id));
}


export async function editPost(newContent: string, id: string){
    const postRef = doc(db, 'post', id)
    await updateDoc(postRef, {
        content: newContent
    })
}