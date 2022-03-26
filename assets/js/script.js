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
          var allButtons = document.querySelectorAll('.recipe-card');
          console.log("Found", allButtons.length);
    
    for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
      console.log(this.getAttribute("data-id"));
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

// Get the modal
var modal = document.getElementById("imgModal");

// Get the button that opens the modal
var btn = document.getElementById("imgBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
  
//display recipies on cards formatted in the HTML
  var recipeResults = function(results) { 
    var htmlCards = "";
    for (var i = 0; i < results.length; i++ ) {
    htmlCards += `<div class="cell small-3 recipe-card" data-id="${results[i].id}"><div class="card">
    <button id="imgBtn">click<img src="${results[i].image}"></button>
    <div class="card-section" id="imgModal" class="modal">
      <p>${results[i].title}</p>
    </div>
    <div class="modal-content">
      <span class="close">&times;</span>
      <p></p>
      </div>
      </div>
  </div></div>`
    }
    return htmlCards
 };

 //create function to display selected recipe information
 var selectedInfo = function(id) {
   //format the spoonacular API url
   var apiUrl2 = `https://api.spoonacular.com/recipes/644860/information?apiKey=${apiKey}`

   //make a request to the url
   fetch(apiUrl2).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data);
      });
    }
  })
};

 //create function to display selected recipe information
 var selectedInfo = function(id) {
  //format the spoonacular API url
  var apiUrl2 = `https://api.spoonacular.com/recipes/644860/information?apiKey=${apiKey}`

  //make a request to the url
  fetch(apiUrl2).then(function(response) {
   if (response.ok) {
     response.json().then(function(data) {
       console.log(data);
     });
   }
 })
};

  
userFormEl.addEventListener("submit", formSumbitHandler);
selectedInfo();

//with hard coded id we are able to console.log recipe information by id number. We need to isolate the following 
  //Object:
  //summary
  //servings
  //readyInMinutes
  //sourceUrl
  //display this information in modals when user clicks on searched image

    // var recipeResults = function(results) { 
    //   var htmlCards = "";
    //   for (var i = 0; i < results.length; i++ ) {
    //   htmlCards += `<div class="cell small-3 recipe-card" data-id="${results[i].id}"><div class="card">
    //   <img src="${results[i].image}">
    //   <div class="card-section">
    //     <p>${results[i].title}</p>
    //   </div>
    // </div></div>`
    //   }
    //   return htmlCards
   