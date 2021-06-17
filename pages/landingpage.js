import React from 'react'
import {Link,Button,Grid,Box} from '@material-ui/core';

const signin = () => {
    return (
        <div>
                 <Box pt={3}>
        <h1 align="center" > Welcome to Voteblocks Signin Page  </h1>
        </Box>
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '80vh' }}
>
        <Link href="/auth"> 
         <Button color="primary" variant="contained" >  Voter Login</Button>
        </Link>
        <br/>
        <br/>
        <Link href="/admin/adminlogin"> 
         <Button color="primary" variant="contained" > Admin Login</Button>
        </Link>
        </Grid>
        </div>
    )
}

export default signin;