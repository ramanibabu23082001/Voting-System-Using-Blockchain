import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
   'mongodb+srv://ramani:ragulramani@cluster0-1azzz.mongodb.net/voteblockchain?retryWrites=true&w=majority'
  );

  return client;
}
