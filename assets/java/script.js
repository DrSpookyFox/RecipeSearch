var userFormEl = document.querySelector("#search-form");
var nameInputEl = document.querySelector("#recipeSearch");

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
      document.getElementById("searchBtn").style.background='#05537b';
    } else {
        alert("Invalid entry");
      document.getElementById("searchBtn").style.background='#05537b';
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
        response.json().then(function(data) {
          var htmlRecipeCards = recipeResults(data.results);
          document.getElementById("cards-container").innerHTML = htmlRecipeCards;
          var allButtons = document.querySelectorAll('.recipe-card');

    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
      //trigger the modal to show
      $('#food-modal').show(); 
      });
    }
        });
      } else {
        alert('Error: Unable to connect to Spoonacular' + response.statusText);
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
        ingredients += (data.extendedIngredients[i].amount + " " + data.extendedIngredients[i].unit + " " + data.extendedIngredients[i].name  + ", ");
       }
      document.querySelector("#htmlText2").remove();

      var htmlText = ` <div id="htmlText2"> 
      <p class="card-title">${data.title}</p> 
      <p> ${data.summary}</p> 
      <p class="card-detail">Ingredients:</p>
      <p> ${ingredients} </p> 
      <p class="card-detail">Instructions:</p>
      <p> ${data.instructions}
      <p class="card-detail"> Source: <a class="sourceURL" href="${data.sourceUrl}">${data.sourceUrl}</a></p> 
      <div id=btnClose> <a class="closeBtn" href="#" rel="modal:close">Close</a> </div>
      </div>`;
      
      document.querySelector("#food-modal").innerHTML += htmlText;
     });
   }
 })
};


//display recipies on cards formatted in the HTML
  var recipeResults = function(results) { 
    var htmlCards = "";
    for (var i = 0; i < results.length; i++ ) {
    htmlCards += `
  <div class="cell small-3 recipe-card" onclick="selectedInfo(${results[i].id})" data-id="${results[i].id}">
    <div class="card">
  
      <div class="card-section">
      <a href="#food-modal" rel="modal:open"> <img src="${results[i].image}"> </a>
      <a href="#food-modal" rel="modal:open"> <p class="food-title">${results[i].title}</p> </a>
      </div>
    </div>
  </div>`
    }
    return htmlCards
 };
  
userFormEl.addEventListener("submit", formSumbitHandler);