/* ==========================================================================
   1. DOM Selection & Manipulation
   ========================================================================== */

// Select elements
const container = document.querySelector('.container');
const allButtons = document.querySelectorAll('.btn');

// Modify content and attributes
const heading = document.querySelector('h1');
if (heading) {
  heading.textContent = 'Updated Title';
  heading.setAttribute('data-status', 'active');
}

// Modify classes
const card = document.querySelector('.card');
if (card) {
  card.classList.add('highlight');
  card.classList.remove('hidden');
  card.classList.toggle('is-open');
}

/* ==========================================================================
   2. Event Listeners & Delegation
   ========================================================================== */

// Event delegation pattern (attaching listener to parent for dynamically added items)
document.body.addEventListener('click', (event) => {
  // Check if click target matches specific selector
  if (event.target.matches('.btn-primary')) {
    console.log('Primary button clicked:', event.target);
  }
});

// Form submit event handling
const form = document.querySelector('#login-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Submitted Data:', data);
  });
}

/* ==========================================================================
   3. Asynchronous Data Fetching (Fetch API)
   ========================================================================== */

async function fetchPosts(url) {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return null;
  }
}

/* ==========================================================================
   4. Dynamic UI Rendering
   ========================================================================== */

function renderCardList(items, targetContainer) {
  if (!targetContainer) return;

  // Map array items into HTML templates
  const cardMarkup = items.map(item => `
    <div class="card" data-id="${item.id}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button class="btn btn-outline" data-action="delete">Delete</button>
    </div>
  `).join('');

  targetContainer.innerHTML = cardMarkup;
}

/* ==========================================================================
   5. Local Storage Utility
   ========================================================================== */

const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key, defaultValue = null) {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  },
  remove(key) {
    localStorage.removeItem(key);
  }
};