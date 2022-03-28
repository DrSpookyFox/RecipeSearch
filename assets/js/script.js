var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeSearch");

//Global Variables

var apiKey = "76fc45feadbe46379e4c23a107066a2f";

var formSumbitHandler = function(event) {
    //Prevents browser from sending the form's input data to a URL
    event.preventDefault();

    //get value from input element
    var recipeSearch = nameInputEl.value.trim();
    //check to see if user input matches search criteria
    if (recipeSearch) {
      searchRecipies(recipeSearch);
      nameInputEl.value = "";
    } else {
        alert("Invalid entry");
    }
    }

//function calls spooacular API to get recipe title, img and id
var searchRecipies = function(recipe) {
    // format the spoonacular api url
    var apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe}&number=12`
      
    // make a request to the url
    fetch(apiUrl).then(function(response) {
       // request was successful
       if (response.ok) {
        response.json().then(function(data) {
          var htmlRecipeCards = recipeResults(data.results);
          document.getElementById("cards-container").innerHTML = htmlRecipeCards;
          var allButtons = document.querySelectorAll('.recipe-card');

    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
      //need to trigger the modal to show
      $('#ex1').show(); 
      //Display the content in the body of the modal
      });
    }
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Spoonacular');
    });
};

 //create function to display selected recipe information
 var selectedInfo = function(id) {
  //format the spoonacular API url
  var apiUrl2 = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`

  //make a request to the url
  fetch(apiUrl2).then(function(response) {
   if (response.ok) {
     response.json().then(function(data) {
       var ingredients = "";
       for (var i = 0; i < data.extendedIngredients.length; i++ ) {
        ingredients += (data.extendedIngredients[i].name  + ", ");
       }
      //  console.log(ingredients);
      var htmlText = `<p> ${data.title} </p> 
      <p> Ingredients: </p>
      <p> ${ingredients} </p> 
      <p> Instructions: </p>
      <p> ${data.instructions}
      <p> Source:  <a href="${data.sourceUrl}">${data.sourceUrl}</a></p>`;
      
      document.querySelector("#food-modal").innerHTML += htmlText;
     });
   }
 })
};

//display recipies on cards formatted in the HTML
  var recipeResults = function(results) { 
    var htmlCards = "";
    for (var i = 0; i < results.length; i++ ) {
    htmlCards += `<div class="cell small-3 recipe-card" onclick="selectedInfo(${results[i].id})" data-id="${results[i].id}"><div class="card">
    <img src="${results[i].image}"<p><a href="#food-modal" rel="modal:open">Click For Details</a></p>
    <div class="card-section">
      <p>${results[i].title}</p>
    </div>
      <p></p>
      </div> 
  </div></div>`
    }
    return htmlCards
 };
  
userFormEl.addEventListener("submit", formSumbitHandler);

//we have a modal showing up after the grid-container / cards-container.
//when we click an invididaul card they show up in sequence in a single modal, 
//the formatting an information we want to display is all correct.
//How do we get a new modal to display each time we click a card without other card info appearing  