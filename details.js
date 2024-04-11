document.addEventListener('DOMContentLoaded', showDetails)
const mealImage = document.getElementById('mealImage');
const mealName = document.getElementById('mealName')
const ingredients = document.getElementById('ingredients')
const category = document.getElementById('category')
const instructionsPara = document.getElementById('instructionsParagraph');


var mealId;

async function showDetails(){
    var data, meal, instructions, imagesrc, video, steps;
    mealId = localStorage.getItem('mealId')
    console.log(mealId)
    
    if(localStorage.getItem('selectedOption') == 'cocktails'){
        data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        meal = await data.json()
        meal = meal.drinks[0]
        mealImage.src = meal.strDrinkThumb
        mealName.innerHTML = meal.strDrink
        
    }
    if(localStorage.getItem('selectedOption') == 'random'){
        data = await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
        meal = await data.json()
        meal = meal.meals[0]
        mealImage.src = meal.strMealThumb
        mealName.innerHTML = meal.strMeal
    }
    else if(!(localStorage.getItem('selectedOption') == 'cocktails')){
        data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        meal = await data.json()
        meal = meal.meals[0]
        mealImage.src = meal.strMealThumb
        mealName.innerHTML = meal.strMeal
    }
    console.log(meal)
    category.innerHTML = `Category : ${meal.strCategory}`
    instructionsPara.textContent = meal.strInstructions;

    // Check if the meal has a YouTube link
if (meal.strYoutube) {
    const youtubeContainer = document.getElementById('youtubeContainer');
    const youtubePlayer = document.createElement('iframe');
    youtubePlayer.width = '460';
    youtubePlayer.height = '315';
    youtubePlayer.src = `https://www.youtube.com/embed/${getYouTubeID(meal.strYoutube)}`;
    youtubePlayer.frameborder = '0';
    youtubePlayer.allowfullscreen = true;
    
    // Append the YouTube player to the container
    youtubeContainer.appendChild(youtubePlayer);
}

// Function to extract the YouTube video ID from the URL
function getYouTubeID(url) {
    // Regular expression to extract the video ID from the YouTube URL
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeRegex);
    
    // Return the video ID if found, otherwise return an empty string
    return match ? match[1] : '';
}

// Loop through each ingredient (strIngredient1, strIngredient2, ...)
for (let i = 1; i <= 15; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    // Check if ingredient is not null or empty
    if (ingredient && ingredient.trim() !== '') {
        // Create an <li> element
        const li = document.createElement('li');

        // Concatenate the ingredient and measure if available
        const text = `${measure ? `${measure} - ` : ''}${ingredient}`;

        // Set the text content of the <li> element
        li.textContent = text;

        // Append the <li> element to the <ul> element
        ingredients.appendChild(li);
    }
}
}


