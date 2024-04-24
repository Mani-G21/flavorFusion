const selectedOption = localStorage.getItem('selectedOption');
const introText = document.getElementById('selectedText')
console.log(selectedOption); 
document.addEventListener('DOMContentLoaded', getSelectedOption);
var cardContainer = document.getElementById('gallery')
var loader = document.getElementById('preloader-wrapper')

function displayRecipes(meals){
    meals = meals.meals
    console.log(meals)

    meals.forEach(function(meal){
        var col = document.createElement('div');
        col.className = 'col s12 m7 gallery-card';
        
        var card = document.createElement('div');
        card.className = 'card';
        card.style.backgroundColor = 'brown';
        card.style.color = 'white'
        card.style.border = '4px solid white'
        card.style.boxShadow = '0px 0px 100px white';
       
        
        var cardImage = document.createElement('div');
        cardImage.className = 'card-image';
        
        var img = document.createElement('img');
        img.src = meal.strMealThumb; // Using meal thumbnail URL
        img.className = 'meal-image';
        
       
        
        var cardAction = document.createElement('div');
        cardAction.className = 'card-action';
        
        var link = document.createElement('a');
        link.id = meal.idMeal// Linking to recipes.html with meal ID
        link.textContent = meal.strMeal; // Using meal name
        link.addEventListener('click', saveMealId)
 
        

    
        cardImage.appendChild(img);

        
        card.appendChild(cardImage);
        cardAction.appendChild(link);
        
        card.appendChild(cardAction);
        col.appendChild(card);
        gallery.appendChild(col);
    });
}
  
function saveMealId(){
    event.preventDefault();
    localStorage.setItem('mealId', `${event.target.id}`)
    window.location.href = 'details.html'
}



async function getSelectedOption(){
    if(selectedOption == 'search'){
        const storedRecipes = JSON.parse(localStorage.getItem('filteredRecipes'));
        console.log(storedRecipes)
        // introText.innerHTML = `Recipes involving ${ingredient}`;
        storedRecipes.forEach(async recipe => {
            console.log(recipe.idMeal);
            var response = await(fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipe.idMeal}`))
            data = await response.json()
            console.log(data.meals[0])
            loader.style.visibility = 'hidden';
            displayRecipes(data)
        })

        // loader.style.visibility = 'hidden';
        // displayRecipes(data)
    }
    else if(selectedOption == 'Regional'){
        nation = localStorage.getItem('Nation')
        introText.innerHTML = `${nation} cuisines`
        var response = await(fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${nation}`))
        data = await response.json()
        loader.style.visibility = 'hidden';
        displayRecipes(data)
    }
    
    else if(selectedOption == 'desserts'){
        introText.innerHTML = 'Desserts'
        var response =  await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert')
        data = await response.json()
        loader.style.visibility = 'hidden'
        displayRecipes(data)
    }
    
    if(selectedOption == 'cocktails'){
        introText.innerHTML = 'Cocktails'
        var cocktails = []
        let cocktail
        for(i=0; i<20; i++){
            response = await(fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php'))
            cocktail = await response.json()
            cocktails.push(cocktail.drinks[0])
            console.log(cocktails)
        }
        loader.style.visibility = 'hidden';
        console.log(cocktails)

        cocktails.forEach(function(meal){
            var col = document.createElement('div');
            col.className = 'col s12 m7 gallery-card';
            
            var card = document.createElement('div');
            card.className = 'card';
            card.style.backgroundColor = 'brown';
            card.style.color = 'white'
            card.style.border = '4px solid white'
            card.style.boxShadow = '0px 0px 100px white';
           
            
            var cardImage = document.createElement('div');
            cardImage.className = 'card-image';
            
            var img = document.createElement('img');
            img.src = meal.strDrinkThumb; // Using meal thumbnail URL
            img.className = 'meal-image';
            
           
            
            var cardAction = document.createElement('div');
            cardAction.className = 'card-action';
            
            var link = document.createElement('a');
            link.href = 'recipes.html'
            link.id = meal.idDrink // Linking to recipes.html with meal ID
            link.textContent = meal.strDrink; 
            link.addEventListener('click', saveMealId)// Using meal name
     
            
    
        
            cardImage.appendChild(img);
    
            
            card.appendChild(cardImage);
            cardAction.appendChild(link);
            
            card.appendChild(cardAction);
            col.appendChild(card);
            gallery.appendChild(col);
        });
    }
}



