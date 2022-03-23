var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeSearch");

//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";
var resultsArray = [];


var formSumbitHandler = function(event) {
    //Prevents browser from sending the form's input data to a URL
    event.preventDefault();
    // get  value from input element
    var recipeSearch = nameInputEl.value.trim();

    if (recipeSearch) {
        searchRecipies(recipeSearch);
        nameInputEl.value = "";
        } else 
        alert("Please try again: not a valid search option!")
    }

//function calls spooacular API to get recipe info
var searchRecipies = function(data) {
    // format the spoonacular api url
    var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=pizza`
      
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
        displayQuery(data);
        });
      });
    };

    var displayQuery = function(data) {
        console.log(data);
        console.log(recipeSearch);
    };

    var getRecipeInformation = function(data) {
        // format the spoonacular api url
        var apiUrl2 = `https://api.spoonacular.com/recipes/{id}/information?=apiKey=${apiKey}`

        //make a request to the url
        fetch(apiUrl2).then(function(response) {
            console.log(response);
            response.json().then(function(id) {
                searchRecipies(id);
            });
        });
    };
   
    userFormEl.addEventListener("submit", formSumbitHandler);