import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import Jumbotron from '../components/Jumbotron';
function Success() {
  
  return (
    <div>
      <Jumbotron>
        <h1>Success!</h1>
        <h2>Thank you for your purchase!</h2>
        {/* <h2>You will now be redirected to the home page</h2> */}
      </Jumbotron>
    </div>
  );
}

export default Success;
