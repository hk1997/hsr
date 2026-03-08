import { openDB } from 'idb';

const DB_NAME = 'thyroid-fna-db';
const STORE_NAME = 'draft-forms';
const DB_VERSION = 1;

export const initDB = async () => {
    return openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        },
    });
};

export const saveDraft = async (id, formData) => {
    try {
        const db = await initDB();
        const payload = {
            id,
            data: formData,
            updatedAt: new Date().toISOString(),
        };
        await db.put(STORE_NAME, payload);
        console.log(`Draft ${id} saved to IndexedDB.`);
    } catch (err) {
        console.error('Failed to save draft to idb:', err);
    }
};

export const getDraft = async (id) => {
    try {
        const db = await initDB();
        return await db.get(STORE_NAME, id);
    } catch (err) {
        console.error('Failed to load draft from idb:', err);
        return null;
    }
};

export const clearDraft = async (id) => {
    try {
        const db = await initDB();
        await db.delete(STORE_NAME, id);
    } catch (err) {
        console.error('Failed to delete draft from idb:', err);
    }
};
