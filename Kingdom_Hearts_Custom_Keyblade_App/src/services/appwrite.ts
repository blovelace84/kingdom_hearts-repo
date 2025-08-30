import { Client, Account, Databases } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://[YOUR_APPWRITE_ENDPOINT]/v1") // replace with your Appwrite endpoint
  .setProject("[YOUR_PROJECT_ID]"); // replace with your project ID

export const account = new Account(client);
export const databases = new Databases(client);
