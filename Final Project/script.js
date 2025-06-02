document.addEventListener('DOMContentLoaded', () => {
  const page = document.body.dataset.page || 'index';

  if (page === 'index' || page === 'favorites') {
    fetch('recipes.json')
      .then(res => res.json())
      .then(data => {
        data.recipes.forEach((r, idx) => {
          if (!r.id) r.id = String(idx + 1);
        });
  
        const allRecipes = data.recipes;
        localStorage.setItem('allRecipes', JSON.stringify(allRecipes));
        
        // shows only recipes in index pg
        if (page === 'index') renderRecipes(allRecipes, 'recipes', false);
        
        // shows only recipes in favorites pg
        if (page === 'favorites') {
          const favIds = loadFavorites();
          const favRecipes = allRecipes.filter(r => favIds.has(String(r.id)));
          renderRecipes(favRecipes, 'favoritesContainer', true);
        }
      })

      // if catch fails, errors show
      .catch(err => console.error('Error fetching recipes:', err));
  }
  

  // filtering on index page
  const filterBtn = document.getElementById('filterButton');
  if (filterBtn) {
    filterBtn.addEventListener('click', () => {
      const cuisine = document.getElementById('cuisine').value.toLowerCase();
      const prepTime = document.getElementById('prepTime').value.toLowerCase();
      const craving = document.getElementById('craving').value.toLowerCase();

      let filtered = JSON.parse(localStorage.getItem('allRecipes')) || [];

      if (cuisine) {
        filtered = filtered.filter(r => (r.cuisine || '').toLowerCase().includes(cuisine));
      }
      // convert json data to filtering
      if (prepTime) {
        const parseMinutes = str => parseInt(str.replace(/\D/g, ''), 10) || 0;
        if (prepTime === 'under15') {
          filtered = filtered.filter(r => parseMinutes(r.prep_time) <= 15);
        } else if (prepTime === 'under30') {
          filtered = filtered.filter(r => parseMinutes(r.prep_time) <= 30);
        }
      }

      if (craving) {
        filtered = filtered.filter(r => {
          const c1 = (r.craving || '').toLowerCase().trim();
          const c2 = (r.cravings || '').toLowerCase().trim();
          return c1.includes(craving) || c2.includes(craving);
        });
      }

      renderRecipes(filtered, 'recipes', false);
    });
  }
});

// load favorites from localStorage
function loadFavorites() {
  const raw = localStorage.getItem('favoriteRecipes');
  if (!raw) return new Set();
  try {
    const arr = JSON.parse(raw);
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

// save favorites
function saveFavorites(favSet) {
  localStorage.setItem('favoriteRecipes', JSON.stringify(Array.from(favSet)));
}

// toggle favorite
function toggleFavorite(id) {
  const favorites = loadFavorites();
  if (favorites.has(id)) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }
  saveFavorites(favorites);
}

// render recipes for any container
function renderRecipes(recipes, containerId = 'recipes', isFavoritesPage = false) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';

  //empty favorites page
  if (recipes.length === 0 && isFavoritesPage) {
    container.innerHTML = '<p>No favorites yet.</p>';
    return;
  }

  recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe';

    const imageTag = recipe.image
      ? `<img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">`
      : '';

    // if recipe is favorite, heart will fill
    const isFav = loadFavorites().has(String(recipe.id));
    const heartBtn = `<button class="heart-btn" data-id="${recipe.id}">${isFav ? '❤️' : '🤍'}</button>`;

    card.innerHTML = `
      ${imageTag}
      <h2>${recipe.title}</h2>
      <p>${recipe.description || 'No description available.'}</p>
      ${heartBtn}
    `;

    const heartButton = card.querySelector('.heart-btn');
    heartButton.addEventListener('click', e => {
      // doesn't trigger the whole modal to open with a click
      e.stopPropagation();
      toggleFavorite(String(recipe.id));

      if (isFavoritesPage) {
        // remove the card 
        card.remove();

        if (container.children.length === 0) {
          container.innerHTML = '<p>No favorites yet.</p>';
        }
      } else {
        // toggle heart icon
        heartButton.textContent = loadFavorites().has(String(recipe.id)) ? '❤️' : '🤍';
      }
    });

    card.addEventListener('click', e => {
      if (!e.target.classList.contains('heart-btn')) openModal(recipe);
    });

    container.appendChild(card);
  });
}

// modal for recipe details
async function openModal(recipe) {
  const modal = document.createElement('div');
  modal.className = 'modal-overlay';

  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  let stepByStepMode = false;

  modalContent.innerHTML = `
    <span class="close-button">&times;</span>
    <h2>${recipe.title}</h2>
    <p>${recipe.description || 'No description'}</p>
    <h4>Ingredients:</h4>
    <ul>${(recipe.ingredients || []).map(i => `<li>${i}</li>`).join('')}</ul>
    <p><strong>Prep time:</strong> ${recipe.prep_time || 'N/A'}</p>
    <p><strong>Cook time:</strong> ${recipe.cook_time || 'N/A'}</p>
    <button id="toggleMode">Step-by-Step Mode</button>
    <div class="card-container"></div>
    <button id="prevCard" style="display:none;">Previous</button>
    <button id="nextCard" style="display:none;">Next</button>
  `;

  modal.appendChild(modalContent);
  document.body.appendChild(modal);

  const cardContainer = modalContent.querySelector('.card-container');

  const buildCards = () => {
    const cards = [];
    if (!stepByStepMode) {
      const overviewCard = document.createElement('div');
      overviewCard.className = 'card active';
      overviewCard.innerHTML = `
        <h4>Instructions:</h4>
        <ol>${(recipe.instructions || []).map(i => `<li>${i}</li>`).join('')}</ol>
      `;
      cards.push(overviewCard);
    } else {
      (recipe.instructions || []).forEach((step, idx) => {
        const stepCard = document.createElement('div');
        stepCard.className = 'card';
        stepCard.innerHTML = `<h4>Step ${idx + 1}</h4><p>${step}</p>`;
        cards.push(stepCard);
      });
    }
    return cards;
  };

  let cards = buildCards();
  let currentIndex = 0;

  const renderCards = () => {
    cardContainer.innerHTML = '';
    cards.forEach(c => cardContainer.appendChild(c));
    cards.forEach(c => c.classList.remove('active'));
    cards[currentIndex].classList.add('active');

    const prevBtn = modalContent.querySelector('#prevCard');
    const nextBtn = modalContent.querySelector('#nextCard');
    if (stepByStepMode && cards.length > 1) {
      prevBtn.style.display = 'inline-block';
      nextBtn.style.display = 'inline-block';
    } else {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    }
  };

  renderCards();
// step by step button toggle
  modalContent.querySelector('#toggleMode').addEventListener('click', () => {
    stepByStepMode = !stepByStepMode;
    cards = buildCards();
    currentIndex = 0;
    renderCards();
  });

  // forward button
  modalContent.querySelector('#nextCard').addEventListener('click', () => {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % cards.length;
    cards[currentIndex].classList.add('active');
  });

  // backwards button
  modalContent.querySelector('#prevCard').addEventListener('click', () => {
    cards[currentIndex].classList.remove('active');
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    cards[currentIndex].classList.add('active');
  });

  modalContent.querySelector('.close-button').addEventListener('click', () => {
    document.body.removeChild(modal);
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) document.body.removeChild(modal);
  });
}
