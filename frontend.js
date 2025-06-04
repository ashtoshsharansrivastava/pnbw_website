// ==============================
// 1. DATA DEFINITIONS
// ==============================

// 1a. Property list with multiple images
const properties = [
  {
    id: 1,
    title: 'Sunset Villa, Goa',
    price: 9500000,
    images: ['goa.jpg', 'goa2.jpg', 'goa3.jpg'],
    status: 'Ready to Move',
    rating: 4,
    description: 'A beautiful villa overlooking the Arabian Sea with 3 bedrooms, 2 bathrooms, and a private pool.'
  },
  {
    id: 2,
    title: 'Oceanview Plot, Kerala',
    price: 1800000,
    images: ['kerala.jpg', 'kerala2.jpg', 'kerala3.jpg'],
    status: 'Under Construction',
    rating: 3,
    description: 'A riverside plot in Kerala, perfect for building a dream home surrounded by nature.'
  },
  {
    id: 3,
    title: 'Skyline Apartment, Mumbai',
    price: 6200000,
    images: ['download.jpg', 'mumbai2.jpg', 'mumbai 3.jpg'],
    status: 'Resale',
    rating: 5,
    description: 'Luxurious 2 BHK apartment in South Mumbai with skyline views, gym access, & 24/7 security.'
  },
  {
    id: 4,
    title: 'Green Fields Land, Punjab',
    price: 3000000,
    images: ['punjab.jpg', 'punjab2.jpg', 'punjab3.jpg'],
    status: 'Ready to Move',
    rating: 2,
    description: 'Sprawling farm land in Punjab, ideal for agricultural or residential development.'
  },
  {
    id: 5,
    title: 'Hilltop Cottage, Himachal',
    price: 4200000,
    images: ['himachal.jpg', 'himachal2.jpg', 'himachal3.jpg'],
    status: 'Under Construction',
    rating: 3,
    description: 'Cozy cottage atop a hill in Himachal Pradesh, with panoramic mountain views and cool breezes.'
  },
  {
    id: 6,
    title: 'Desert Oasis Plot, Rajasthan',
    price: 2500000,
    images: ['rajasthan.jpg', 'rajasthan2.jpg', 'rajasthan3.jpg'],
    status: 'Resale',
    rating: 4,
    description: 'Unique desert plot in Rajasthan with easy access to historical sites and tourist attractions.'
  }
];

// 1b. Brokers & Users
const brokers = [
  { phone: '9999990001', refCode: 'BRK001', leads: 5, commission: 50000, bonus: 10000, properties: [1, 3] },
  { phone: '9999990002', refCode: 'BRK002', leads: 2, commission: 20000, bonus: 4000, properties: [2, 4] },
  { phone: '9999990003', refCode: 'BRK003', leads: 0, commission: 0, bonus: 0, properties: [5] }
];

const users = [
  { identifier: '0000000000', type: 'phone', role: 'admin', status: 'active' },
  { identifier: '9999990001', type: 'phone', role: 'broker', status: 'active' },
  { identifier: '9999990002', type: 'phone', role: 'broker', status: 'active' },
  { identifier: '9999990003', type: 'phone', role: 'broker', status: 'disabled' },
  { identifier: '8888880004', type: 'phone', role: 'customer', status: 'active' },
  { identifier: 'admin@example.com', type: 'email', role: 'admin', status: 'active' },
  { identifier: 'broker1@example.com', type: 'email', role: 'broker', status: 'active' },
  { identifier: 'customer@example.com', type: 'email', role: 'customer', status: 'active' }
];

// Track current user (identifier = phone or email)
let currentUser = localStorage.getItem('pnbw_user') || null;
let currentRole = null;

// ==============================
// 2. DOMContentLoaded SETUP
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  setupHamburgerMenu();
  setupSidePanel();
  setupNavigation();
  renderUserStatus();
  renderProperties(properties);
  attachEventListeners();
});

// ==============================
// 3. HAMBURGER MENU FOR MOBILE
// ==============================
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const topNav = document.getElementById('top-nav');
  hamburger.addEventListener('click', () => {
    if (topNav.style.display === 'flex') {
      topNav.style.display = 'none';
    } else {
      topNav.style.display = 'flex';
      topNav.style.flexDirection = 'column';
    }
  });
}

// ==============================
// 4. SIDE PANEL (SOCIAL ICONS)
// ==============================
function setupSidePanel() {
  // Already statically in HTML; nothing dynamic needed here.
}

// ==============================
// 5. NAVIGATION & ROLE CHECK
// ==============================
function setupNavigation() {
  if (currentUser) {
    // Determine role
    const usr = users.find(u => u.identifier === currentUser);
    currentRole = usr ? usr.role : 'customer';
    updateNavByRole();
  }
}

function updateNavByRole() {
  const brokerLink = document.getElementById('broker-nav-link');
  const adminLink  = document.getElementById('admin-nav-link');

  if (currentRole === 'broker') {
    brokerLink.style.display = 'inline-block';
    adminLink.style.display = 'none';
  } else if (currentRole === 'admin') {
    adminLink.style.display = 'inline-block';
    brokerLink.style.display = 'none';
  } else {
    brokerLink.style.display = 'none';
    adminLink.style.display = 'none';
  }
}

// ==============================
// 6. LOGIN MODAL LOGIC
// ==============================
const loginModal    = document.getElementById('login-modal');
const loginChoice   = document.getElementById('login-choice');
const phoneForm     = document.getElementById('phone-form');
const emailForm     = document.getElementById('email-form');
const otpForm       = document.getElementById('otp-form');

function attachEventListeners() {
  // Login‐related
  document.getElementById('login-btn').addEventListener('click', onLoginButtonClick);
  document.getElementById('login-close').addEventListener('click', closeLoginModal);
  document.getElementById('login-modal').addEventListener('click', onLoginModalClickOutside);
  document.getElementById('choose-phone').addEventListener('click', showPhoneForm);
  document.getElementById('choose-email').addEventListener('click', showEmailForm);
  document.getElementById('send-otp-phone-btn').addEventListener('click', onSendOtpPhone);
  document.getElementById('send-otp-email-btn').addEventListener('click', onSendOtpEmail);
  document.getElementById('verify-otp-btn').addEventListener('click', onVerifyOtp);

  // Search‐Filter
  document.getElementById('search-input').addEventListener('input', onSearchInput);
  document.getElementById('clear-search-btn').addEventListener('click', clearSearch);

  // Property modal close
  document.getElementById('property-close').addEventListener('click', closePropertyModal);
  document.getElementById('property-modal').addEventListener('click', onPropertyModalClickOutside);

  // Admin tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });

  // Intern form submission (dummy)
  document.getElementById('intern-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Intern application submitted! Our HR will contact you soon.');
    e.target.reset();
  });
}

// LOGIN BUTTON CLICK
function onLoginButtonClick(e) {
  e.preventDefault();
  if (currentUser) {
    // Logout
    localStorage.removeItem('pnbw_user');
    currentUser = null;
    currentRole = null;
    updateNavByRole();
    renderUserStatus();
    showSection('home-section');
  } else {
    openLoginModal();
  }
}

function openLoginModal() {
  loginModal.style.display = 'flex';
  loginChoice.style.display = 'flex';
  phoneForm.style.display = 'none';
  emailForm.style.display = 'none';
  otpForm.style.display = 'none';
  document.getElementById('phone-input').value = '';
  document.getElementById('email-input').value = '';
  document.getElementById('otp-input').value = '';
}

function closeLoginModal() {
  loginModal.style.display = 'none';
}

function onLoginModalClickOutside(evt) {
  if (evt.target === loginModal) {
    closeLoginModal();
  }
}

function showPhoneForm() {
  loginChoice.style.display = 'none';
  phoneForm.style.display = 'flex';
  emailForm.style.display = 'none';
  otpForm.style.display = 'none';
}

function showEmailForm() {
  loginChoice.style.display = 'none';
  phoneForm.style.display = 'none';
  emailForm.style.display = 'flex';
  otpForm.style.display = 'none';
}

let loginMethod = null; // 'phone' or 'email'
function onSendOtpPhone() {
  const phoneVal = document.getElementById('phone-input').value.trim();
  if (!/^[0-9]{10}$/.test(phoneVal)) {
    alert('Please enter a valid 10-digit phone number.');
    return;
  }
  loginMethod = 'phone';
  setTimeout(() => {
    phoneForm.style.display = 'none';
    otpForm.style.display = 'flex';
    alert(`OTP has been sent to ${phoneVal}. (Simulated code: 1234)`);
  }, 300);
}

function onSendOtpEmail() {
  const emailVal = document.getElementById('email-input').value.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
    alert('Please enter a valid email address.');
    return;
  }
  loginMethod = 'email';
  setTimeout(() => {
    emailForm.style.display = 'none';
    otpForm.style.display = 'flex';
    alert(`OTP has been sent to ${emailVal}. (Simulated code: 1234)`);
  }, 300);
}

function onVerifyOtp() {
  const otpVal = document.getElementById('otp-input').value.trim();
  if (!/^[0-9]{4,6}$/.test(otpVal)) {
    alert('Please enter a valid 4-6 digit OTP.');
    return;
  }
  // Simulate checking OTP: always accept "1234"
  if (otpVal !== '1234') {
    alert('Incorrect OTP. Try 1234 for simulation.');
    return;
  }

  // Determine identifier
  let identifier;
  if (loginMethod === 'phone') {
    identifier = document.getElementById('phone-input').value.trim();
  } else {
    identifier = document.getElementById('email-input').value.trim();
  }

  // Check if user exists and is active
  const usr = users.find(u => u.identifier === identifier);
  if (!usr || usr.status !== 'active') {
    alert('No active account found for this identifier.');
    return;
  }

  currentUser = identifier;
  localStorage.setItem('pnbw_user', currentUser);
  currentRole = usr.role;

  alert('Logged in successfully!');
  closeLoginModal();
  updateNavByRole();
  renderUserStatus();
  showSection('home-section');
}

// ==============================
// 7. HEADER LOGIN STATUS
// ==============================
function renderUserStatus() {
  const statusEl = document.getElementById('user-status');
  const btn      = document.getElementById('login-btn');

  if (currentUser) {
    statusEl.textContent = `Logged in: ${currentUser}`;
    btn.textContent      = 'Logout';
  } else {
    statusEl.textContent = '';
    btn.textContent      = 'Login';
  }
}

// ==============================
// 8. SEARCH & FILTER PROPERTIES
// ==============================
function onSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();
  if (!query) {
    renderProperties(properties);
    return;
  }
  const filtered = properties.filter(p => {
    return (
      p.title.toLowerCase().includes(query) || 
      p.status.toLowerCase().includes(query)
    );
  });
  renderProperties(filtered);
}

function clearSearch() {
  document.getElementById('search-input').value = '';
  renderProperties(properties);
}

// ==============================
// 9. PROPERTY GRID RENDERING
// ==============================
function renderProperties(list) {
  const container = document.getElementById('properties');
  container.innerHTML = '';

  list.forEach((p) => {
    // Create card element
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.status = p.status; // for CSS badge color

    // Badge color is managed by CSS data-attribute selectors

    // Create image-slider
    const sliderDiv = document.createElement('div');
    sliderDiv.className = 'image-slider';
    p.images.forEach(imgFile => {
      const img = document.createElement('img');
      img.src = `images/${imgFile}`;
      img.alt = p.title;
      sliderDiv.appendChild(img);
    });

    // Star rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= p.rating ? '★' : '☆';
    }

    // Card content
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    cardContent.innerHTML = `
      <span class="status-badge">${p.status}</span>
      <h3>${p.title}</h3>
      <p class="stars">${stars}</p>
      <p>₹${p.price.toLocaleString()}</p>
      <button class="enquire-btn" data-id="${p.id}">Enquire</button>
    `;

    // Append slider + content
    card.appendChild(sliderDiv);
    card.appendChild(cardContent);
    container.appendChild(card);
  });

  // Attach event listeners to new Enquire buttons
  document.querySelectorAll('.enquire-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = parseInt(e.target.dataset.id, 10);
      openPropertyModal(pid);
    });
  });
}

// ==============================
// 10. PROPERTY DETAIL MODAL LOGIC
// ==============================
const propertyModal = document.getElementById('property-modal');

function openPropertyModal(propertyId) {
  // Find property
  const prop = properties.find(p => p.id === propertyId);
  if (!prop) return;

  // Check login
  if (!currentUser) {
    alert('Please log in to view property details and enquire.');
    return;
  }

  // Populate slider
  const sliderDiv = document.getElementById('property-slider');
  sliderDiv.innerHTML = '';
  prop.images.forEach(imgFile => {
    const img = document.createElement('img');
    img.src = `images/${imgFile}`;
    img.alt = prop.title;
    sliderDiv.appendChild(img);
  });

  // Populate details
  document.getElementById('property-title').textContent = prop.title;
  document.getElementById('property-status').textContent = prop.status;

  // Assign badge color class (reuse card data-status)
  const statusEl = document.getElementById('property-status');
  statusEl.className = 'status-badge';
  if (prop.status === 'Ready to Move') statusEl.style.backgroundColor = 'var(--badge-ready)';
  if (prop.status === 'Resale') statusEl.style.backgroundColor = 'var(--badge-resale)';
  if (prop.status === 'Under Construction') statusEl.style.backgroundColor = 'var(--badge-construction)';

  document.getElementById('property-price').textContent = `₹${prop.price.toLocaleString()}`;
  let stars = '';
  for (let i = 1; i <= 5; i++) {
    stars += i <= prop.rating ? '★' : '☆';
  }
  document.getElementById('property-rating').textContent = stars;
  document.getElementById('property-description').textContent = prop.description || '';

  // Show modal
  propertyModal.style.display = 'flex';

  // When user submits enquiry
  document.getElementById('enquiry-form').onsubmit = (e) => {
    e.preventDefault();
  };
  document.getElementById('submit-enquiry-btn').onclick = () => {
    const msg = document.getElementById('enquiry-message').value.trim();
    if (!msg) {
      alert('Please type your enquiry message.');
      return;
    }
    // Simulate storing enquiry (in a real app, send to backend)
    alert(`Enquiry for "${prop.title}" submitted!\nMessage: ${msg}`);
    document.getElementById('enquiry-message').value = '';
    closePropertyModal();
  };
}

function closePropertyModal() {
  propertyModal.style.display = 'none';
}

function onPropertyModalClickOutside(evt) {
  if (evt.target === propertyModal) {
    closePropertyModal();
  }
}

// ==============================
// 11. BROKER DASHBOARD RENDERING
// ==============================
function renderBrokerDashboard() {
  if (!currentUser || currentRole !== 'broker') return;

  const brokerData = brokers.find(b => b.phone === currentUser || b.email === currentUser);
  if (!brokerData) return;

  document.getElementById('ref-code').textContent      = brokerData.refCode;
  document.getElementById('leads-count').textContent   = brokerData.leads;
  document.getElementById('commission-amt').textContent = brokerData.commission + brokerData.bonus;

  const propListEl = document.getElementById('broker-properties');
  propListEl.innerHTML = '';
  brokerData.properties.forEach(pid => {
    const p = properties.find(prop => prop.id === pid);
    if (p) {
      const li = document.createElement('li');
      li.textContent = `${p.title} (₹${p.price.toLocaleString()})`;
      propListEl.appendChild(li);
    }
  });
}

// ==============================
// 12. ADMIN PANEL RENDERING
// ==============================
function renderAdminTabs() {
  // Leads Tracking
  const leadsTbody = document.getElementById('leads-table');
  leadsTbody.innerHTML = '';
  brokers.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${b.phone}</td><td>${b.refCode}</td><td>${b.leads}</td>`;
    leadsTbody.appendChild(row);
  });

  // Commission Dashboard
  const commTbody = document.getElementById('comm-table');
  commTbody.innerHTML = '';
  brokers.forEach(b => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${b.phone}</td><td>${b.commission}</td><td>${b.bonus}</td>`;
    commTbody.appendChild(row);
  });

  // User & Broker Management
  const userTbody = document.getElementById('user-table');
  userTbody.innerHTML = '';
  users.forEach(u => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${u.identifier}</td><td>${u.role}</td><td>${u.status}</td>`;
    userTbody.appendChild(row);
  });
}

function switchTab(targetId) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    if (btn.dataset.target === targetId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.style.display = (pane.id === targetId ? 'block' : 'none');
  });
}

// ==============================
// 13. SECTION NAVIGATION HELPER
// ==============================
function showSection(sectionId) {
  // Hide all main sections
  document.querySelectorAll('main > section').forEach(sec => {
    sec.style.display = 'none';
  });
  // Show the requested section
  const target = document.getElementById(sectionId);
  if (target) target.style.display = 'block';

  // If showing broker or admin, also render content
  if (sectionId === 'broker-section') {
    renderBrokerDashboard();
  }
  if (sectionId === 'admin-section') {
    renderAdminTabs();
  }
}

// When nav links clicked, show/hide sections
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const secId = href.substring(1);
      showSection(secId);
      // Close mobile menu if open
      const topNav = document.getElementById('top-nav');
      if (window.innerWidth <= 768) {
        topNav.style.display = 'none';
      }
    }
  });
});

// By default, show Home on load
showSection('home-section');
