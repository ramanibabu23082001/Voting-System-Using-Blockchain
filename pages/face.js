import React from 'react';
async function createUser(imgurl1, imgurl2) {
  const response = await fetch('http://localhost:5000/', {
    method: 'POST',
    body: JSON.stringify({ imgurl1, imgurl2 }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong!');
  }

  return data;
}

function Face() {
  async function switchAuthModeHandler() {
    const result = await createUser("https://ipfs.io/ipfs/QmejVqvC5Crg7KoiZ3CKDQvmTg4wT3fQMZ7n8YaBpUofu9", "https://ipfs.io/ipfs/QmejVqvC5Crg7KoiZ3CKDQvmTg4wT3fQMZ7n8YaBpUofu9");
        console.log(result.verified);
    
  }
  return (
    <div >
        
<button  onClick={switchAuthModeHandler} >
    onclick
</button>
     
    </div>
  );
}

export default Face;