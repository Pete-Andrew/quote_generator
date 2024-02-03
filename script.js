
let apiQuotes = [];
let storedQuotesArray = [];
let localJsonQuotes = [];

//quotes are zero indexed
let storedQuoteIndexNumber = 0;
let totalNumberOfQuotes = 0;
const undesirableAuthors = ["Rick Santorum", "Keith O'Brien", "Josh McDowell"];

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("new-quote");
const cycleBackButton = document.getElementById("cycle-back");
const cycleForwardButton = document.getElementById("cycle-forward");
const arrayIndexNumber = document.getElementById("array-index");
const totalQuoteDiv = document.getElementById("total-quote-number");
const loader = document.getElementById("loaderID");
const pexelsBackgroundImage = document.getElementById("body"); 

pexelsBackgroundImage.style.backgroundImage = "url('img/pexels-michael-block-1.jpg')";

// show loader
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
// hide loader
function loadingComplete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get Quotes from API
//show new quote 
function newQuote() {

    $("#quote-container").fadeOut("2000");

    //encasing the following code in the 'setTimeout function delays the new quote generation so it times with the fadeout and fadein. 
    setTimeout(function () {

        loading();
        //add as section that if the loading takes too long to use the local 'quotes.js' JSON instead


        //to pick a random quote from the API using math random
        const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
        //Check if author field is blank and replace it with 'unknown'
        if (!quote.author) {
            authorText.textContent = "Unknown";
            // a condition to weed out idiots and re-call the function :) 
        } else if (undesirableAuthors.includes(quote.author)) {
            console.log("Not my cup of tea");
            newQuote();
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
        pushToLocalStorage(quote);

        totalNumberOfQuotes++;
        // storedQuoteIndexNumber++;

        console.log("total number of quotes = " + totalNumberOfQuotes);
        // console.log("stored quote index number = " + storedQuoteIndexNumber);
        //pushes the value of totalNumberOfQuotes to the relevant div
        totalQuoteDiv.textContent = totalNumberOfQuotes;
        //each time new quote is pushed it increases total number of quotes by one

        //this line sets the current quotes number to the maximum when new quote is generated. The 'quoteNumber' function doesn't need to be called here. 
        arrayIndexNumber.textContent = totalNumberOfQuotes;
        //set quote and hide loader
        loadingComplete();
        // closing part of the setTimeout function, defines the amount of time to wait before running. 
    }, 350);

    $("#quote-container").fadeIn("2000");
}

function pushToLocalStorage(quote) {
    //push to global array
    storedQuotesArray.push(quote)
    //push array to local storage
    let storedQuotes = JSON.stringify(storedQuotesArray);
    localStorage.setItem('storedQuote', storedQuotes);
    console.log("item pushed")
    // console.log("quote = " + storedQuotes)
}
// pushToLocalStorage();

// asynchronous fetch request within a try/catch statement
// asynchronous functions can be run at any time independently and won't stop the browser loading th page. 
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json"
    // try allows us to attempt to complete a fetch request from the API, but if it doesn't work we can catch the error info and do something with it.

    apiQuotes = localQuotes;

    try {
        const response = await fetch(apiUrl);       //const wont be populated until it receives data from API. 
        // getting the JSON as a response and turning the response into a JSON object, then pass it into the API quotes global variable at the top of the code
        apiQuotes = await response.json();
        // can pull a single quote using array index e.g.
        //console.log(apiQuotes[12]);
        newQuote()

    } catch (error) {
        //Catch error here, might trigger and alert or console log etc. 
        console.log("API not responding, timeout, use local quotes JSON instead")
        //this uses the local quotes from the quotes.js file if there is no response from the API 
        apiQuotes = localQuotes;
    }
}

//this function has an added check added, without this the script was throwing 'Uncaught TypeError: Cannot read properties of undefined (reading 'text')'
function previousQuote() {
    
    $("#quote-container").fadeOut("2000");
    //set timeout delays the speed of the code it contains so that it matches with the fade in/fade out
    setTimeout(function () {
    // Retrieve the stored quote from local storage
    let calledQuote = localStorage.getItem('storedQuote');
    // console.log("calledQuote = " + calledQuote);
        
    // Check if there are stored quotes
    if (calledQuote) {
        // Parse the stored quotes
        let calledQuoteIndex = JSON.parse(calledQuote);

        // Check if there are quotes in the array
        if (calledQuoteIndex.length >= 0) {
            // Decrement the index to get the previous quote
            storedQuoteIndexNumber--;
            console.log("previous quote called");
            // Check if the index is within bounds
            if (storedQuoteIndexNumber < 0) {
                storedQuoteIndexNumber = calledQuoteIndex.length - 1;
            }

            // Update the quote text and author
            quoteText.textContent = calledQuoteIndex[storedQuoteIndexNumber].text;
            authorText.textContent = calledQuoteIndex[storedQuoteIndexNumber].author;
            quoteNumber();                  
        }
        $("#quote-container").fadeIn("2000");
        }
    },350);
}

function cycleForward() {

    $("#quote-container").fadeOut("2000");
    
    setTimeout(function () {
    // Retrieve the stored quote from local storage
    let calledQuote = localStorage.getItem('storedQuote');
    // console.log("calledQuote = " + calledQuote);

    // Check if there are stored quotes
    if (calledQuote) {
        // Parse the stored quotes
        let calledQuoteIndex = JSON.parse(calledQuote);

        // Check if there are quotes in the array
        if (calledQuoteIndex.length > 0) {
            // increment the index to get the next existing quote
            storedQuoteIndexNumber++;

            // Check if the index is within bounds
            if (storedQuoteIndexNumber < 0) {
                storedQuoteIndexNumber = calledQuoteIndex.length + 1;
            }
            // if you forward cycle past the end of the array it zero's the count and starts at the beginning so you can forward loop through the array. 
            if (storedQuoteIndexNumber >= calledQuoteIndex.length) {
                storedQuoteIndexNumber = 0;
            }

            // Update the quote text and author
            quoteText.textContent = calledQuoteIndex[storedQuoteIndexNumber].text;
            authorText.textContent = calledQuoteIndex[storedQuoteIndexNumber].author;

            quoteNumber();
        }

        $("#quote-container").fadeIn("2000");
    }
    },350);
}

function quoteNumber() {
    arrayIndexNumber.textContent = storedQuoteIndexNumber + 1;
}

//tweet quote 
function tweetQuote() {
    //using backtick
    //tweet?text - is equivalent to query parameter = text, using the back ticks alows us to pass in a variable
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    // "_blank", allows the window to open in a new tab
    window.open(twitterUrl, "_blank")
}

newQuoteButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);
cycleBackButton.addEventListener("click", previousQuote);
cycleForwardButton.addEventListener("click", cycleForward);


//on load
getQuotes();

// references

//https://www.pexels.com/api/documentation/

// black list of people who's wit and wisdom are neither witty nor wise:

//Rick Santorum
//Keith O'Brien
//Josh McDowell
//Cat Stevens