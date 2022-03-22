var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeName");

//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";


var formSumbitHandler = function(event) {
    //Prevents browser from sending the form's input data to a URL
    event.preventDefault();
    // get  value from input element
    var recipeName = nameInputEl.value.trim();

    if (recipeName) {
        searchRecipies(recipeName);
        nameInputEl.value = "";
        } else 
        alert("Please try again: not a valid search option!")
    }

//function calls spooacular API to get recipe info
var searchRecipies = function(data) {
    // format the github api url
    var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
      
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        console.log(response);
        response.json().then(function(data) {
        console.log(data);
        });
      });
    };
   
    userFormEl.addEventListener("submit", formSumbitHandler);
  