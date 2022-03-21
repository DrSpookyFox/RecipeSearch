
//this api will summarize ingredients and provides price per serving,
//but we will need the recipie ID
// `https://api.spoonacular.com/recipies/{id}/summary?apiKey={apiKey}`;

//this api will provide price "totalCost" and "totalCostPerServing"
//need to determine unit conversion for price...doesnt make sense in dollars
// `https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget.json?apiKey={apiKey}`;

//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";

//List of querySelectors to be used throughout script
var cheapButtonEl = document.querySelector('#cheap-btn');
var vegetarianButtonEl = document.querySelector('#vegetarian-btn');
var popularButtonEl = document.querySelector('#popular-btn');
var randomButtonEl = document.querySelector('#random-btn');

var buttonClickHandler = function(event) {
    //prevents the page from refreshing
    event.preventDefault();
};

//function calls spooacular API to get recipe info
var getRecipeInfo = function(data) {

    //format API url
    var apiUrl = `https://api.spoonacular.com/recipes/{id}/information?apiKey={apiKey}`;

    console.log(id);
};

var getRandomRecipe = function(data) {
    var apiUrl2 = `https://api.spoonacular.com/recipes/random`;
    fetch(apiUrl2)
        .then(function(response) {
            if (response.ok) {
                response.json().then(function(data) {
                    console.log(data);
                });
            }
        })
};

document.querySelector('#random-btn').addEventListener("click", getRandomRecipe);