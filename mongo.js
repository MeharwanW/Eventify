

const axios = require('axios');




// Send a POST request with the login credentials
axios.post(loginUrl, loginData)
    .then(response => {
        // Handle the response from the server
        console.log('Login successful');
        console.log('Response:', response.data);
        // You can extract data from the response here
        // For example, if the response contains a token
        const token = response.data.token;
        
    })
    .catch(error => {
        // Handle errors
        console.error('Login failed');
        console.error('Error:', error.response ? error.response.data : error.message);
    });





