import React from 'react';
import {Link,Button,Grid,Box} from '@material-ui/core';

const landingpage = () => {
    return (
        <div>
            <Box pt={3}>
        <h1 align="center" > Welcome to Voteblocks </h1>
        </Box>
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justify="center"
  style={{ minHeight: '90vh' }}
>
        <Link href="/landingpage"> 
         <Button color="primary" variant="contained" > Click here to vote &gt;&gt;&gt;</Button>
        </Link>
        </Grid>
        </div>
    )
}

export default landingpage;