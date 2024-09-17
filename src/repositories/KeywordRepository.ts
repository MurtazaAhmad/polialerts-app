import { Keyword, IKeywordRepository } from "@/types/index";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { KEYWORDS_COLLECTION } from "@/app/utils/constants";

export class KeywordRepository implements IKeywordRepository {
    // async getKeywords(): Promise<Keyword[]> {
    //     return [];
    // }


    async addChannelToKeyword(channelId: string): Promise<void> {

        return;
    }

    async addKeyword(keyword: string, channelId: string): Promise<void> {
        try {
            console.log(`AddKeyword: ${keyword} to channel ${channelId}`);


            // Give me this behavior in firebase
            // /keywords/ChannelID_789/words/word/document (words collection can be empty for now)
            const keywordRef = doc(db, KEYWORDS_COLLECTION, channelId);
            const keywordDoc = await getDoc(keywordRef);
            // If the keyword channel doesn't exist, create it
            if (!keywordDoc.exists()) {
                await setDoc(keywordRef, {});
                const wordsCollectionRef = collection(keywordRef, "words");
                // Optionally, you can add a dummy document to ensure the collection is created
                await setDoc(doc(wordsCollectionRef, keyword), {});
            } else {
                const wordsCollectionRef = collection(keywordRef, "words");
                await setDoc(doc(wordsCollectionRef, keyword), {
                    user_ids: [],
                    tags: []
                });
            }

            console.log(`Channel ${channelId} added to keyword ${channelId} with a words collection.`);


        }
        catch (error) {
            console.log("Error", error);
        }
        return;
    }
    async updateKeyword(keyword: Keyword): Promise<void> {
        return;
    }
    async deleteKeyword(keyword: Keyword): Promise<void> {
        return;
    }
}