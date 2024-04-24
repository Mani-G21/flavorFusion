// www.themealdb.com/api/json/v1/1/list.php?i=list
var gallery = document.getElementById('gallery')
const searchForm = document.getElementById('search')
window.addEventListener('DOMContentLoaded', showIngredients)
document.getElementById('cancelSearch').addEventListener('click', deleteFilters);
function deleteFilters(){
    location.reload();
}

// Add an event listener to the search form
document.getElementById('searchForm').addEventListener('submit', searchIngredients);

async function searchIngredients(event) {
    event.preventDefault(); // Prevent form submission

    // Get the search query from the input field
    let searchQuery = document.getElementById('search').value.trim().toLowerCase();

    // Fetch the list of ingredients from the API
    let response = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list");
    let data = await response.json();
    let ingredients = data.meals;

    // Filter ingredients based on the search query
    let filteredIngredients = ingredients.filter(function (mealIngredient) {
        return mealIngredient.strIngredient.toLowerCase().includes(searchQuery);
    });

    // Display the filtered ingredients or a message if no results found
    displayFilteredIngredients(filteredIngredients);
}

function displayFilteredIngredients(filteredIngredients) {
    // Clear the previous search results
    gallery.innerHTML = '';

    // Loop through the filtered ingredients and create gallery cards
    filteredIngredients.forEach(function (mealIngredient) {
        var col = document.createElement('div');
        col.className = 'col s12 m7 gallery-card';
        var card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = '#FFDDCC'
        card.style.borderTopLeftRadius = '20%'
        card.style.borderTopRightRadius = '20%'
        card.style.border = '2px solid #664444'
        card.style.boxShadow = '7px 7px 10px gray'
        // card.style.border = '5px solid black'
        var cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        var img = document.createElement('img');
        img.style.width = '80%'
        img.style.margin = 'auto'
        // img.style.border = '4px solid black'

        // Construct the URL for the image
        img.src = `https://www.themealdb.com/images/ingredients/${mealIngredient.strIngredient}.png`;

        var cardAction = document.createElement('div');
        cardAction.className = 'card-action';
        var link = document.createElement('a');
        link.style.color = '#663333';
        link.style.fontWeight = '900';
        link.style.fontSize = 'large'
        link.style.margin = '0px'
        link.href = 'multipleSelect.html';
        link.textContent = mealIngredient.strIngredient;
        link.id = mealIngredient.strIngredient;
        link.addEventListener('click', getClickedItem);

        cardImage.appendChild(img);
        card.appendChild(cardImage);
        cardAction.appendChild(link);
        card.appendChild(cardAction);
        col.appendChild(card);
        gallery.appendChild(col);
    });

    if (filteredIngredients.length === 0) {
        var message = document.createElement('p');
        message.textContent = 'No ingredients found.';
        gallery.appendChild(message);
    }
}

async function showIngredients(){
    ingredientsArray = await(fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list"))
    ingredientsArray = await(ingredientsArray.json())
    ingredient = ingredientsArray.meals
    console.log(ingredient)
    
    ingredient.forEach(function(mealIngredient){

      var col = document.createElement('div');
      col.className = 'col s12 m7 gallery-card';
      var card = document.createElement('div');
      card.className = 'card';
      card.style.backgroundColor = '#FFDDCC'
      card.style.borderTopLeftRadius = '20%'
      card.style.borderTopRightRadius = '20%'
      card.style.border = '2px solid #664444'
      card.style.boxShadow = '7px 7px 10px gray'
      var cardImage = document.createElement('div');
      cardImage.className = 'card-image';
      var img = document.createElement('img');
      img.style.width = '80%'
      img.style.margin = 'auto'
    //   img.style.border = '4px solid gray'
   
      
      img.src = `https://www.themealdb.com/images/ingredients/${mealIngredient.strIngredient}.png`;      var cardTitle = document.createElement('span');
  
      var cardAction = document.createElement('div');
      cardAction.className = 'card-action';
      var link = document.createElement('a');
      link.href = 'multipleSelect.html';
      link.textContent = mealIngredient.strIngredient;
      link.style.color = '#663333';
      link.style.fontWeight = '900';
      link.style.fontSize = 'large'
      link.style.margin = '0px';
      link.id = mealIngredient.strIngredient;
      link.addEventListener('click', getClickedItem);

      cardImage.appendChild(img);
      cardImage.appendChild(cardTitle);
      card.appendChild(cardImage);
      cardAction.appendChild(link);
      card.appendChild(cardAction);
      col.appendChild(card);
      gallery.appendChild(col);

    })
}

function getClickedItem(){
    item = event.target.textContent;
    localStorage.setItem('selectedOption', 'search')
    localStorage.setItem('ingredient', `${item}`)
}

