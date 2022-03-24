var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeSearch");
var recipeImgEl = document.querySelector("#recipe-search-img");
var recipeSearchTerm = document.querySelector("#recipe-container");

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
        console.log(response);
        response.json().then(function(data) {
          console.log(data);
          displayRecipies(data, results);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Spoonacular');
    });
};

    var displayRecipies = function(results, searchTerm) {
     //check if api returned any results
     if (results.length === 0) {
         recipeImgEl.textContent = "No recipies found.";
         return;
    }

        recipeSearchTerm.textContent = searchTerm;

        for(var i = 0; i < results.length; i++) {
            var recipeName = results[i].img + '/' + results[i].title;
        }
    };

    userFormEl.addEventListener("submit", formSumbitHandler);