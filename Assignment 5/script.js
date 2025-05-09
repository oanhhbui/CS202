document.addEventListener('DOMContentLoaded', () => {
    fetch('recipes.json')
      .then(res => res.json())
      .then(data => {
        if (!data.recipes) throw new Error('Invalid JSON structure');
  
        let filteredRecipes = [];
  
        switch (filterCategory) {
        // only favorite recipes go in favorites
          case 'favorite':
            filteredRecipes = data.recipes.filter(r => r.favorite === true);
            break;

        // matches each category
          case 'pasta':
          case 'mealprep':
          case 'sweettreat':
            filteredRecipes = data.recipes.filter(r => r.category === filterCategory);
            break;

        // default all recipe to home page
          case 'all':
          default:
            filteredRecipes = data.recipes;
            break;
        }
  
        renderRecipes(filteredRecipes);
      })
  });
  
  function renderRecipes(recipes) {
    const container = document.getElementById('recipes');
    recipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe';
  
      // image at the front of each recipe card
      const imageTag = recipe.image
        ? `<img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">`
        : '';
  
      card.innerHTML = `
        ${imageTag}
        <h2>${recipe.title}</h2>
        <p>${recipe.description}</p>
      `;
  
      card.addEventListener('click', () => openModal(recipe));
      container.appendChild(card);
    });
  }
  
  // modal recipe content 
  function openModal(recipe) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
  
    const ingredientsList = recipe.ingredients
      ? recipe.ingredients.map(i => `<li>${i}</li>`).join('')
      : '<li>No ingredients listed.</li>';
  
    const instructionsList = recipe.instructions
      ? recipe.instructions.map(i => `<li>${i}</li>`).join('')
      : '<li>No instructions listed.</li>';
  
    // embed the video
    let videoEmbed = '';
    if (recipe.video) {
      if (recipe.video.includes('youtube.com') || recipe.video.includes('youtu.be')) {
        const videoId = recipe.video.split('v=')[1]?.split('&')[0] || recipe.video.split('/').pop();
        videoEmbed = `
          <div class="video-container">
            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
          </div>
        `;
      }
    }
  
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-button">&times;</span>
        <h2>${recipe.title}</h2>
        <p>${recipe.description || 'No description available.'}</p>
        ${videoEmbed}
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