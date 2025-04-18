const cards = document.querySelectorAll('.card');

// flip on click or double-click
cards.forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });

// mouse hovers over card, card zooms in to scale
  card.addEventListener('mouseenter', () => {
    card.querySelector('.card-front').style.transform = 'scale(1.05)';
  });

// mouse leaves card 
  card.addEventListener('mouseleave', () => {
    card.querySelector('.card-front').style.transform = 'scale(1)';
  });
});

// keyboard event to highlight cards
document.addEventListener("keydown", function(event) {
    const key = event.key;

    if (["1", "2", "3"].includes(key)) {
      const index = parseInt(key) - 1;
      const cards = document.querySelectorAll(".card-inner");
      if (cards[index]) {
        // toggle the "flipped" state manually
        cards[index].classList.toggle("flipped");
      }
    }
  });