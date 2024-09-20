import { Keyword, IKeywordRepository } from "@/types/index";
import { arrayUnion, collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { KEYWORDS_COLLECTION } from "@/app/utils/constants";

export class KeywordRepository implements IKeywordRepository {
    // async getKeywords(): Promise<Keyword[]> {
    //     return [];
    // }


    async addChannelToKeyword(channelId: string): Promise<void> {
        return;
    }

    async addKeyword(userId: string, channelId: string, keyword: string,): Promise<void> {
        try {
            console.log(`AddKeyword: ${keyword} to channel ${channelId}`);

            // Give me this behavior in firebase
            // /keywords/ChannelID_789/words/word/document (words collection can be empty for now)
            const keywordRef = doc(db, KEYWORDS_COLLECTION, channelId);
            const keywordDoc = await getDoc(keywordRef);
            // If the keyword channel doesn't exist, create it
            if (!keywordDoc.exists()) {
                await setDoc(keywordRef, {});
                // const wordsCollectionRef = collection(keywordRef, "words");
                // Optionally, you can add a dummy document to ensure the collection is created
                // await setDoc(doc(wordsCollectionRef, keyword), {});
            }

            const wordsCollectionRef = collection(keywordRef, "words");
            // The data inserted into wordsCollectionRef will also be a collection, with keyword as id
            // Get a reference to the specific keyword document
            const keywordDocRef = doc(wordsCollectionRef, keyword);
            const keywordDocSnapshot = await getDoc(keywordDocRef);

            // If the keyword doesn't exist, create it
            if (!keywordDocSnapshot.exists()) {
                await setDoc(keywordDocRef, {
                    tags: [],
                    user_ids: []
                });
            }

            // Update the keyword document with the new user_id and tag
            await updateDoc(keywordDocRef, {
                // tags: arrayUnion("tag1"), // You can modify this to accept tags as a parameter if needed
                tags: [],
                user_ids: arrayUnion(userId)
            });


            // await setDoc(doc(wordsCollectionRef, keyword), {
            //     user_ids: [],
            //     tags: []
            // });

            console.log(`Channel ${channelId} added to keyword ${channelId} with a words collection.`);


        }
        catch (error) {
            console.log("Error", error);
        }
    }
    async updateKeyword(keyword: Keyword): Promise<void> {
        return;
    }
    async deleteKeyword(keyword: Keyword): Promise<void> {

    }
}