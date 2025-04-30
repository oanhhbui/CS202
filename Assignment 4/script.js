//getting users location
navigator.geolocation.getCurrentPosition((position)=>{
    let {
        latitude, 
        longitude
    }= position.coords;
    var map = L.map('map').setView
    ([latitude, longitude], 19);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom:  1,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // location markers
    var marker = L.marker([48.732479, -122.485844]).
    addTo(map)
    marker.bindPopup('Begin the Moving Meditation!')
    .openPopup();
    var marker = L.marker([48.732527, -122.484529]).
    addTo(map)
    marker.bindPopup('Begin the Mindfulness Meditation!')
    .openPopup();
    var marker = L.marker([ 48.750616, -122.480675
    ]).
    addTo(map)
    marker.bindPopup('test')
    .openPopup();
});

const meditationLocations = [
    { name: "Moving Meditation", 
        lat: 48.732479, 
        lon: -122.485844,
        audio: "audio/Guided-Meditation-for-Positive-Energy-Lavendaire.mp3"
    },
    { name: "Mindfulness Meditation", 
        lat: 48.732527, 
        lon: -122.484529,
        audio: "audio/Positive-Affirmations-for-Self-Love.mp3"},
        { name: "test Meditation", 
            lat: 48.750616, 
            lon: -122.480675,
            audio: "audio/Positive-Affirmations-for-Self-Love.mp3"}
];

//accessing user's current location
navigator.geolocation.watchPosition(onLocationUpdate, console.error, {
    enableHighAccuracy: true,
    maximumAge: 1000
  });

//calculating distance to each meditation location
let shownMeditations = new Set();

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)**2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

//meditation popup
function onLocationUpdate(position) {
    const userLat = position.coords.latitude;
    const userLng = position.coords.longitude;
  
    meditationLocations.forEach(location => {
      const distance = getDistance(userLat, userLng, location.lat, location.lng);
  
      if (distance < 20 && !shownMeditations.has(location.name)) {
        shownMeditations.add(location.name);
        showMeditationModal(location);
      }
    });
}

//notes page

document.addEventListener("DOMContentLoaded", renderNotes);

function showMeditationModal(location) {
    document.getElementById("meditationModalLabel").innerText = location.name;
    document.getElementById("meditationText").innerText =
    `You're near ${location.name}. Would you like to begin this meditation?`;
        
    const audio = document.getElementById("meditationAudio");
    audio.src = location.audio;
    audio.load();
      
    const modal = new bootstrap.Modal(document.getElementById('meditationModal'));
    modal.show();
}

function saveNote() {
    const type = document.getElementById("meditationType").value;
    const note = document.getElementById("meditationNote").value.trim();
    if (!note) return alert("Please write something!");

    const entry = {
      type,
      note,
      timestamp: new Date().toLocaleString(),
    };

    const existing = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
    existing.unshift(entry);
    localStorage.setItem("meditationNotes", JSON.stringify(existing));
    document.getElementById("meditationNote").value = "";
    renderNotes();
  }
  function deleteNote(id) {
    const existing = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
    const updated = existing.filter(note => note.id !== id);
    localStorage.setItem("meditationNotes", JSON.stringify(updated));
    renderNotes();
  }

  function renderNotes() {
    const notes = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
    const container = document.getElementById("notesList");
    container.innerHTML = "";

    if (notes.length === 0) {
      container.innerHTML = "<p class='text-muted'>No notes yet. Your reflections will appear here.</p>";
      return;
    }

    notes.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "card mb-3";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${entry.type} Meditation</h5>
          <h6 class="card-subtitle mb-2 text-muted">${entry.timestamp}</h6>
          <p class="card-text">${entry.note}</p>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteNote(${entry.id})">Delete</button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  //breathing exercise for focused meditation
  const instruction = document.getElementById('instruction');
  const breathModal = document.getElementById('breathModal');

  let breathInterval;
  let state = 0;

  const cycle = [
    { action: "Inhale...", duration: 4000 },
    { action: "Exhale...", duration: 4000 },
  ];

  function breathingCycle() {
    const current = cycle[state];
    instruction.textContent = current.action;

    state = (state + 1) % cycle.length;

    breathInterval = setTimeout(breathingCycle, current.duration);
  }

  // start breathing cycle when modal open
  breathModal.addEventListener('shown.bs.modal', function () {
    state = 0;
    breathingCycle();
  });

  // stop breathing cycle when modal close
  breathModal.addEventListener('hidden.bs.modal', function () {
    clearTimeout(breathInterval);
  });