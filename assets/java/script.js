
//this api will find a list of 10 random recipies and provides ID number
`https://api.spoonacular.com/recipes/complexSearch?apiKey={apiKey}`;

//this api will summarize ingredients and provides price per serving,
//but we will need the recipie ID
`https://api.spoonacular.com/recipies/{id}/summary?apiKey={apiKey}`;

//this api will provide price "totalCost" and "totalCostPerServing"
//need to determine unit conversion for price...doesnt make sense in dollars
`https://api.spoonacular.com/recipes/{id}/priceBreakdownWidget.json?apiKey={apiKey}`;

var apiKey = "76fc45feadbe46379e4c23a107066a2f";