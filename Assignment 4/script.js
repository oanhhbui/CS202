let map, mapInitialized = false;
const shownLocations = new Set();

// Meditation points
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
];

// get distance from user's location to meditation location in meters
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

// location update
function onLocationUpdate(position) {
  const { latitude, longitude } = position.coords;
  console.log(`User at: ${latitude}, ${longitude}`);

  if (!mapInitialized) {
    map = L.map('map').setView([latitude, longitude], 17);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
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

  meditationLocations.forEach(location => {
    const dist = getDistance(latitude, longitude, location.lat, location.lon);
    const key = `${location.lat},${location.lon}`;
    console.log(`${location.name} is ${dist.toFixed(2)}m away`);

    if (dist < 30 && !shownLocations.has(key)) {
      shownLocations.add(key);
      showMeditationModal(location);
    }
  });
}

// show meditation modal
function showMeditationModal(location) {
    document.getElementById("meditationModalLabel").innerText = location.name;
    document.getElementById("meditationText").innerText =
      `You're near ${location.name}. Would you like to begin this meditation?`;
  
    const audio = document.getElementById("meditationAudio");
    audio.src = location.audio;
    audio.load();
  
    const startBtn = document.getElementById("startMeditationBtn");
  
    // decide which meditation page to link to based on the name
    if (location.name.toLowerCase().includes("moving")) {
      startBtn.href = "moving.html";
    } else if (location.name.toLowerCase().includes("mindfulness")) {
      startBtn.href = "mindfulness.html";
    } else if (location.name.toLowerCase().includes("focused")) {
      startBtn.href = "focused.html";
    } else {
      startBtn.href = "#"; // fallback
    }
  
    const modal = new bootstrap.Modal(document.getElementById('meditationModal'));
    modal.show();
  }

// start geolocation
navigator.geolocation.watchPosition(
  onLocationUpdate,
  err => alert("Location access is needed to show meditation spots."),
  { enableHighAccuracy: true, maximumAge: 1000 }
);

// moving exercise card
function setColor(color) {
    document.getElementById("currentColorNote").innerHTML = `Selected color: <strong>${color}</strong>`;
  }

// log
function saveNote() {
    const type = document.getElementById("meditationType").value;
    const note = document.getElementById("meditationNote").value.trim();
  
    if (!note) return;
  
    const entry = {
      id: Date.now(),
      type,
      note,
      timestamp: new Date().toLocaleString()
    };
  
    const existing = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
    existing.push(entry);
    localStorage.setItem("meditationNotes", JSON.stringify(existing));
  
    document.getElementById("meditationNote").value = "";
    renderNotes();
  }
  
  function renderNotes() {
    const notesList = document.getElementById("notesList");
    const existing = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
  
    notesList.innerHTML = "";
  
    if (existing.length === 0) {
      notesList.innerHTML = '<p class="text-muted">No entries yet.</p>';
      return;
    }
  
    existing.forEach((entry, index) => {
      const card = document.createElement("div");
      card.className = "card mb-3 shadow-sm";
      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title text-success">${entry.type}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${entry.timestamp}</h6>
          <p class="card-text">${entry.note}</p>
          <button class="btn btn-outline-danger btn-sm" onclick="deleteNote(${index})">Delete</button>
        </div>
      `;
      notesList.appendChild(card);
    });
  }
  
  function deleteNote(index) {
    const existing = JSON.parse(localStorage.getItem("meditationNotes") || "[]");
    existing.splice(index, 1);
    localStorage.setItem("meditationNotes", JSON.stringify(existing));
    renderNotes();
  }
  document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("notesList")) {
      renderNotes();
    }
  });
