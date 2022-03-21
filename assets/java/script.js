

//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";

//function calls spooacular API to get recipe info
var getRandomRecipe = function(id) {
    // format the github api url
    var apiUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`
      
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(id) {
        console.log(id);
        });
      });
    };
    getRandomRecipe();
  