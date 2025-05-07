document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load recipes.json');
        return res.json();
      })
      .then(data => {
        if (!data.recipes) throw new Error('Invalid JSON structure: Missing "recipes" key');
        renderRecipes(data.recipes);
      })
      .catch(error => {
        console.error('Error loading recipes:', error);
        const container = document.getElementById('recipes');
        container.innerHTML = `<p style="color:red;">Failed to load recipes. Check console for details.</p>`;
      });
  });
  
  function renderRecipes(recipes) {
    const container = document.getElementById('recipes');
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe';
      card.innerHTML = `
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
      `;
      card.addEventListener('click', () => openModal(recipe));
      container.appendChild(card);
    });
  }
  
  function openModal(recipe) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
  
    const ingredientsList = recipe.ingredients
        ? recipe.ingredients.map(i => `<li>${i}</li>`).join('')
        : '<li>No ingredients listed.</li>';
    
    const instructionsList = recipe.instructions
        ? recipe.instructions.map(i => `<li>${i}</li>`).join('')
        : '<li>No instructions listed.</li>';
    
    // content inside modal pop up for detail recipe
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>${recipe.title}</h2>
        <p>${recipe.description || 'No description available.'}</p>
        <h4>Ingredients:</h4>
        <ul>${ingredientsList}</ul>
        <p><strong>Prep time:</strong> ${recipe.prep_time || 'N/A'}</p>
        <p><strong>Cook time:</strong> ${recipe.cook_time || 'N/A'}</p>
        <h4>Instructions:</h4>
        <ul>${instructionsList}</ul>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    modal.querySelector('.close-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) document.body.removeChild(modal);
    });
  }
  