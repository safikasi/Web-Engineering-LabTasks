let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
let editIndex = null;

document.getElementById('recipeForm').addEventListener('submit', saveRecipe);

function saveRecipe(e) {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let ingredients = document.getElementById('ingredients').value;
  let instructions = document.getElementById('instructions').value;
  let imageInput = document.getElementById('image').files[0];
  let imageUrl = imageInput ? URL.createObjectURL(imageInput) : "";

  if (!title || !ingredients || !instructions) {
    alert("Please fill all fields");
    return;
  }

  let recipe = { title, ingredients, instructions, imageUrl };

  if (editIndex === null) {
    recipes.push(recipe);
  } else {
    recipes[editIndex] = recipe;
    editIndex = null;
  }

  localStorage.setItem('recipes', JSON.stringify(recipes));
  document.getElementById('recipeForm').reset();
  displayRecipes();
}

function displayRecipes() {
  let list = document.getElementById('recipeList');
  list.innerHTML = "";
  recipes.forEach((r, i) => {
    list.innerHTML += `
      <div class="recipe">
        <h3>${r.title}</h3>
        <img src="${r.imageUrl}" alt="">
        <p><b>Ingredients:</b> ${r.ingredients}</p>
        <p><b>Instructions:</b> ${r.instructions}</p>
        <button onclick="editRecipe(${i})">Edit</button>
        <button onclick="deleteRecipe(${i})">Delete</button>
      </div>
    `;
  });
}

function editRecipe(i) {
  let r = recipes[i];
  document.getElementById('title').value = r.title;
  document.getElementById('ingredients').value = r.ingredients;
  document.getElementById('instructions').value = r.instructions;
  editIndex = i;
}

function deleteRecipe(i) {
  if (confirm("Delete this recipe?")) {
    recipes.splice(i, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
  }
}

displayRecipes();
