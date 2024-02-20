// https://www.edamam.com/

const appId = "e287fea0";
const appKey = "5f292cfd0a90b1132c7adc5e5c267d09";
const recipeURL = "https://api.edamam.com/search?q=";

const searchInput = document.querySelector(".search-input");
const searchResult = document.querySelector(".search-result");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchQuery = searchInput.value;
    fetchRecipes(searchQuery);
});

async function fetchRecipes(searchQuery) {
    const response = await fetch(
      `${recipeURL}${searchQuery}&app_id=${appId}&app_key=${appKey}&to=30`
    );
    const responseData = await response.json();
    console.log(responseData.hits);
    displayRecipes(responseData.hits);
}

function displayRecipes(recipeResults) {
    let recipeEl = "";
    recipeResults.forEach(recipeResult => {
        recipeEl += `
        <div class="item">
            <img src="${recipeResult.recipe.image}" />
            <div class="content-wrapper">
              <h2 class="recipe-title">${recipeResult.recipe.label}</h2>
              <a href="${recipeResult.recipe.url}" target="_blank" class="view-recipe">View Recipe</a>
            </div>
            <div class="recipe-desc">
              <p class="item-data">Calories:${recipeResult.recipe.calories.toFixed(2)}</p>
              <p class="item-data">Diet Label:${recipeResult.recipe.dietLabels}</p>
              <p class="item-data">Health Label:${recipeResult.recipe.healthLabels}</p>
              <p class="item-data">Source:${recipeResult.recipe.source}</p>
            </div>
        </div>
        `;
        searchResult.innerHTML = recipeEl;
    });
}
