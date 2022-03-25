var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeSearch");
var recipeImgEl = document.querySelector("#recipe-img");
var recipeSearchTerm = document.querySelector("#recipe-container");
var recipeTitleEl = document.querySelector('#title')
var recipeContainer = document.querySelector('.grid-container');
//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";



var formSumbitHandler = function(event) {
    //Prevents browser from sending the form's input data to a URL
    event.preventDefault();

    //get value from input element
    var recipeSearch = nameInputEl.value.trim();

    if (recipeSearch) {
      searchRecipies(recipeSearch);
      nameInputEl.value = "";
    } else {
        alert("Invalid entry");
    }
    }

//function calls spooacular API to get recipe info
var searchRecipies = function(recipe) {
    // format the spoonacular api url
    var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&number=12`
      
    // make a request to the url
    fetch(apiUrl).then(function(response) {
       // request was successful
       if (response.ok) {
        // console.log(response);
        response.json().then(function(data) {
          // console.log(data.results);
          var htmlRecipeCards = recipeResults(data.results);
          document.getElementById("cards-container").innerHTML = htmlRecipeCards;
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Spoonacular');
    });
};
  
//display recipies on cards formatted in the HTML
  var recipeResults = function(results) { 
    var htmlCards = "";
    for (var i = 0; i < results.length; i++) {
    htmlCards += `<div class="cell small-3"><div class="card">
    <img src="${results[i].image}">
    <div class="card-section">
      <p>${results[i].title}</p>
    </div>
  </div></div>`
    }
    return htmlCards
 };

    userFormEl.addEventListener("submit", formSumbitHandler);