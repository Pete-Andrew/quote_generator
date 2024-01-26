let apiQuotes = [];

// Get Quotes from API

// asynchronous fetch request within a try/catch statement
// asynchronous functions can be run at any time independently and won't stop the browser loading th page. 

async function getQuotes() {
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    // try allows us to attempt to complete a fetch request from the API, but if it doesn't work we can catch the error info and do something with it.

    try {
        const response = await fetch(apiUrl);       //const wont be populated until it receives data from API. 
        // getting the JSON as a response and turning the response into a JSON object, then pass it into the API quotes global variable at the top of the code
        apiQuotes = await response.json();
        // can pull a single quote using array index
        console.log(apiQuotes[12]);
         
    } catch (error) {
        //Catch error here, might trigger and alert or console log etc. 
    }
}

getQuotes();