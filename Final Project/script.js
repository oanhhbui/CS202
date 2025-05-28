document.addEventListener('DOMContentLoaded', () => {

  fetch('recipes.json')
    .then(res => res.json())
    .then(data => {
      if (!data.recipes) throw new Error('Invalid JSON structure');

      let filteredRecipes;
      switch (filterCategory) {
        case 'favorite':
          filteredRecipes = data.recipes.filter(r => r.favorite === true);
          break;
        case 'pasta':
        case 'mealprep':
        case 'sweettreat':
          filteredRecipes = data.recipes.filter(r => r.category === filterCategory);
          break;
        default:
          filteredRecipes = data.recipes;
      }

      renderRecipes(filteredRecipes);
    })
    .catch(err => console.error('Error fetching recipes:', err));
});

function renderRecipes(recipes) {
  const container = document.getElementById('recipes');
  container.innerHTML = '';

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe';

    const imageTag = recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">`
      : '';

    card.innerHTML = `
      ${imageTag}
      <h2>${recipe.title}</h2>
      <p>${recipe.description || 'No description available.'}</p>
    `;

    card.addEventListener('click', () => openModal(recipe));
    container.appendChild(card);
  });
}

function openModal(recipe) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';

  let stepByStepMode = false; // Default: show all instructions in overview card

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Video embed
  const videoEmbed = recipe.video ? getVideoEmbed(recipe.video) : '';

  // Modal inner HTML
  modalContent.innerHTML = `
    <span class="close-button">&times;</span>
    ${videoEmbed}
    <button id="toggleMode">Step-by-Step Mode</button>
    <div class="card-container"></div>
    <button id="prevCard">Previous</button>
    <button id="nextCard">Next</button>
  `;

  const cardContainer = modalContent.querySelector('.card-container');

  // Helper: build the cards based on mode
  const buildCards = () => {
    const cards = [];

    // Overview card (ingredients and maybe all instructions)
    const ingredientsList = recipe.ingredients?.length
      ? recipe.ingredients.map(i => `<li>${i}</li>`).join('')
      : '<li>No ingredients listed.</li>';

    let instructionsHTML = '';
    if (!stepByStepMode && recipe.instructions?.length) {
      const instructionsList = recipe.instructions.map(i => `<li>${i}</li>`).join('');
      instructionsHTML = `<h4>Instructions:</h4><ol>${instructionsList}</ol>`;
    }

    const overviewCard = document.createElement('div');
    overviewCard.className = 'card';
    overviewCard.innerHTML = `
      <h2>${recipe.title}</h2>
      <p>${recipe.description || 'No description available.'}</p>
      <h4>Ingredients:</h4>
      <ul>${ingredientsList}</ul>
      <p><strong>Prep time:</strong> ${recipe.prep_time || 'N/A'}</p>
      <p><strong>Cook time:</strong> ${recipe.cook_time || 'N/A'}</p>
      ${instructionsHTML}
    `;
    cards.push(overviewCard);

    // Step-by-step instruction cards (if toggle mode is on)
    if (stepByStepMode && recipe.instructions?.length) {
      recipe.instructions.forEach((step, idx) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'card';
        stepCard.innerHTML = `
          <h4>Step ${idx + 1}</h4>
          <p>${step}</p>
        `;
        cards.push(stepCard);
      });
    }

    // Nutrition card
    const nutritionCard = document.createElement('div');
    nutritionCard.className = 'card';
    nutritionCard.innerHTML = `
      <h4>Nutritional Information</h4>
      <p>${recipe.nutrition || 'No nutritional information available.'}</p>
    `;
    cards.push(nutritionCard);

    return cards;
  };

  // Build initial cards
  let cards = buildCards();
  let currentIndex = 0;

  const renderCards = () => {
    cardContainer.innerHTML = '';
    cards.forEach(card => cardContainer.appendChild(card));
    cards.forEach(card => card.classList.remove('active'));
    currentIndex = 0;
    cards[currentIndex].classList.add('active');
  };

  renderCards();

  // Toggle mode
  modalContent.querySelector('#toggleMode').addEventListener('click', () => {
    stepByStepMode = !stepByStepMode;
    cards = buildCards();
    renderCards();
    // Update toggle button label
    modalContent.querySelector('#toggleMode').textContent = stepByStepMode
      ? 'Show All Instructions on First Card'
      : 'Step-by-Step Mode';
  });

  // Navigation
  modalContent.querySelector('#nextCard').addEventListener('click', () => {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add('active');
  });

  modalContent.querySelector('#prevCard').addEventListener('click', () => {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    cards[currentIndex].classList.add('active');
  });

  // Close modal
  modalContent.querySelector('.close-button').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  });

  modal.appendChild(modalContent);
  document.body.appendChild(modal);
}

function getVideoEmbed(videoUrl) {
  const videoId = videoUrl.includes('v=') 
    ? videoUrl.split('v=')[1].split('&')[0]
    : videoUrl.split('/').pop();

  return `
    <div class="video-container">
      <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
    </div>
  `;
}
