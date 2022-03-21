//Global Variables
var apiKey = "76fc45feadbe46379e4c23a107066a2f";

//function calls spooacular API to get recipe info
var getRecipeInfo = function() {
  fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
};
getRecipeInfo();