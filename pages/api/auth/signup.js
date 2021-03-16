import { hashPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
import authinstance from '../../../ethereum/authenticationinstance';
import web3 from 'web3';
async function handler(req, res) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes('@') ||
    !password ||
    password.trim().length < 7
  ) {
    res.status(422).json({
      message:
        'Invalid input - password should also be at least 7 characters long.',
    });
    return;
  }

  const client = await connectToDatabase();

  const db = client.db();

  const existingUser = await db.collection('users').findOne({ email: email });

  if (existingUser) {
    res.status(422).json({ message: 'User exists already!' });
    client.close();
    return;
  }
   

  const hashedPassword = await hashPassword(password);

  const result = await db.collection('users').insertOne({
    email: email,
    password: hashedPassword,
  });
  try{
  const accounts = await web3.eth.getAccounts();
  const sign= await authinstance.methods.signup(email).send({
    from:accounts[0]
  });
    
  const mail = await authinstance.methods.login(email).call();
  console.log(mail);
}
catch(err)
{
  console.log(err);
}
  res.status(201).json({ message: mail });
  client.close();
}

export default handler;
