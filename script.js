let apiQuotes = [];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");

// Get Quotes from API

//show new quote 
function newQuote() {
    //to pick a random quote from the API using math random
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    //Check if author field is blank and replace it with 'unknown'
    if(!quote.author) {
        authorText.textContent = "Unknown"
    } else {
        authorText.textContent = quote.author; 
    }

    // change the font size for long quotes.
    //passes in the CSS class  
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    //.textContent will allow us to pass in a string that is then shown in that element e.g. the Author span in the Quote-author div
    //quote.author and quote.tex breaks sends the relevant part of the authorText object to the relevant div
    quoteText.textContent = quote.text; 
    
    console.log(quote);
}


// asynchronous fetch request within a try/catch statement
// asynchronous functions can be run at any time independently and won't stop the browser loading th page. 
async function getQuotes() {
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    // try allows us to attempt to complete a fetch request from the API, but if it doesn't work we can catch the error info and do something with it.

    try {
        const response = await fetch(apiUrl);       //const wont be populated until it receives data from API. 
        // getting the JSON as a response and turning the response into a JSON object, then pass it into the API quotes global variable at the top of the code
        apiQuotes = await response.json();
        // can pull a single quote using array index e.g.
        //console.log(apiQuotes[12]);
        newQuote()
        
    } catch (error) {
        //Catch error here, might trigger and alert or console log etc. 
    }
}

getQuotes();

