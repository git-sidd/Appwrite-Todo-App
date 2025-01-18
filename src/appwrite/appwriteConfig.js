import {Client,Databases,Account} from "appwrite";

const client=new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject("6788a94f00209115c923")

export const account=new Account(client);

export const databases=new Databases(client,"6788a99600291d715f66")