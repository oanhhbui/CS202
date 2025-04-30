// global variables
let map, mapInitialized = false;
const shownMeditations = new Set();

// meditation locations
const meditationLocations = [
  {
    name: "Moving Meditation",
    lat: 48.732479,
    lon: -122.485844,
    audio: "audio/Guided-Meditation-for-Positive-Energy-Lavendaire.mp3"
  },
  {
    name: "Mindfulness Meditation",
    lat: 48.732527,
    lon: -122.484529,
    audio: "audio/Positive-Affirmations-for-Self-Love.mp3"
  },
  {
    name: "Mindfulness Meditation",
    lat: 48.732343,
    lon: -122.484878,
    audio: "audio/Positive-Affirmations-for-Self-Love.mp3"
  }
];

// distance from meditation spots
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;
  const toRad = deg => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat/2)**2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2)**2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// position updates
function onLocationUpdate(position) {
  const { latitude, longitude } = position.coords;

  // initialize map once
  if (!mapInitialized) {
    map = L.map('map').setView([latitude, longitude], 17);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 1,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("You are here.")
      .openPopup();

    meditationLocations.forEach(loc => {
      L.marker([loc.lat, loc.lon])
        .addTo(map)
        .bindPopup(`Begin the ${loc.name}`);
    });

    mapInitialized = true;
  }

  // meditation popup when near marked location
  meditationLocations.forEach(location => {
    const distance = getDistance(latitude, longitude, location.lat, location.lon);
    if (distance < 20 && !shownMeditations.has(location.name)) {
      shownMeditations.add(location.name);
      showMeditationModal(location);
    }
  });
}

// modal
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

// geolocation
navigator.geolocation.watchPosition(
  onLocationUpdate,
  err => alert("Please enable location access to use the map features."),
  { enableHighAccuracy: true, maximumAge: 1000 }
);

// log
document.addEventListener("DOMContentLoaded", renderNotes);

function saveNote() {
  const type = document.getElementById("meditationType").value;
  const note = document.getElementById("meditationNote").value.trim();
  if (!note) return alert("Please write something!");

  const entry = {
    id: Date.now(),
    type,
    note,
    timestamp: new Date().toLocaleString()
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

  notes.forEach(note => {
    const card = document.createElement("div");
    card.className = "card mb-3";
    card.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${note.type} Meditation</h5>
        <h6 class="card-subtitle mb-2 text-muted">${note.timestamp}</h6>
        <p class="card-text">${note.note}</p>
        <button class="btn btn-outline-danger btn-sm" onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// breathing cycle
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

breathModal?.addEventListener('shown.bs.modal', () => {
  state = 0;
  breathingCycle();
});

breathModal?.addEventListener('hidden.bs.modal', () => {
  clearTimeout(breathInterval);
});