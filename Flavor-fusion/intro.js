const randomBtn = document.getElementById('random-btn');
randomBtn.addEventListener('click', storeRandom)
const cocktailLink = document.getElementById('cocktail').addEventListener('click', storeCocktail);
const dessertLink = document.getElementById('desserts').addEventListener('click', storeDessert);

async function randomRecipe(){
    var data = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
    data = await data.json()
    console.log(data)
}

function storeCocktail(e){
    e.preventDefault();
    localStorage.setItem('selectedOption', 'cocktails')
    window.location.href = 'recipes.html'
}

function storeDessert(e){
    e.preventDefault();
    localStorage.setItem('selectedOption', 'desserts')
    window.location.href = 'recipes.html'
}

function storeRandom(e){
    e.preventDefault();
    localStorage.setItem('selectedOption', 'random')
    window.location.href = 'details.html'
}