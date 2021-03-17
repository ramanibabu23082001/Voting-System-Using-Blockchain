//able to get all p request from any routes specifis from api/auth so only use ..
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import authinstance from '../../../ethereum/authenticationinstance';
//import { verifyPassword } from '../../../lib/auth';
//import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
    
  },
  providers: [//we can also use many provider like google facebook for many options of signing in
    Providers.Credentials({
      async authorize(credentials) {
        
        const login_email = await authinstance.methods.login(credentials.address,credentials.email).call();
        // const manager = await factory.methods.getuser().call();
        console.log(login_email);
        //console.log(login);
        if (! login_email){
        client.close();
        throw new Error('No user found!');
        }
        if(!(login_email===credentials.email))
        {
          client.close();
        throw new Error('User email is wrong');
        }

   //     const client = await connectToDatabase();

//        const usersCollection = client.db().collection('users');
//  console.log(credentials.email);
  // const user_email = await authinstance.methods.login(credentials.email).call();
  //  console.log(user_email);
   //console.log(user)
  // if (!user_email) {
  //   client.close();
  //   throw new Error('No user found!');
  // }
  console.log("after user");
  // const isValid = await verifyPassword(
  //   credentials.password,
  //   user.password
  // );

  // if (!isValid) {
  //   client.close();
  //   throw new Error('Could not log you in!');
  // }
//  client.close();
 // console.log("jjlkk");
  return { email: login_email};
      },
    }),
  ],
});
