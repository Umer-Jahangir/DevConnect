import { Client, Account, Databases, Storage, ID, Query } from "appwrite";

const client = new Client();

client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT) // ✅ Your Appwrite endpoint
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID); // ✅ Your Appwrite project ID

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// ✅ Export everything needed in your app
export { ID, Query, client };
