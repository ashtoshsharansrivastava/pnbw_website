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
    description: 'A beautiful villa overlooking the Arabian Sea. 3 BHK, 2 baths, private garden.'
    
  },
  {
    id: 2,
    title: 'Oceanview Plot, Kerala',
    price: 1800000,
    images: ['kerala.jpg', 'kerala2.jpg', 'kerala3.jpg'],
    status: 'Under Construction',
    rating: 3,
    description: 'Seaside plot in Kerala. Ideal for building your dream home. 200 sq. yards.'
  },
  {
    id: 3,
    title: 'Skyline Apartment, Mumbai',
    price: 6200000,
    images: ['download.jpg', 'mumbai2.jpg', 'mumbai3.jpg'],
    status: 'Resale',
    rating: 5,
    description: 'Luxury 2 BHK apartment in the heart of Mumbai, with panoramic city views.'
  },
  {
    id: 4,
    title: 'Green Fields Land, Punjab',
    price: 3000000,
    images: ['punjab.jpg', 'punjab2.jpg', 'punjab3.jpg'],
    status: 'Ready to Move',
    rating: 2,
    description: '50 acres of fertile farmland, perfect for commercial agriculture.'
  },
  {
    id: 5,
    title: 'Hilltop Cottage, Himachal',
    price: 4200000,
    images: ['himachal.jpg', 'himachal2.jpg', 'himachal3.jpg'],
    status: 'Under Construction',
    rating: 3,
    description: 'Charming cottage under construction with Himalayan views. 2 BHK, balcony.'
  },
  {
    id: 6,
    title: 'Desert Oasis Plot, Rajasthan',
    price: 2500000,
    images: ['rajasthan.jpg', 'rajasthan2.jpg', 'rajasthan3.jpg'],
    status: 'Resale',
    rating: 4,
    description: 'Plot in the Thar Desert, near Jaisalmer. Ideal for a desert resort project.'
  }
];

const brokers = [
  { phone: '9999990001', refCode: 'BRK001', leads: 5, commission: 50000, bonus: 10000, properties: [1, 3] },
  { phone: '9999990002', refCode: 'BRK002', leads: 2, commission: 20000, bonus: 4000,  properties: [2, 4] },
  { phone: '9999990003', refCode: 'BRK003', leads: 0, commission: 0,     bonus: 0,     properties: [5] }
];

const users = [
  { phone: '0000000000', email: 'admin@gmail.com', role: 'admin',   status: 'active' },
  { phone: '9999990001', role: 'broker',  status: 'active' },
  { phone: '9999990002', role: 'broker',  status: 'active' },
  { phone: '9999990003', role: 'broker',  status: 'disabled' },
  { phone: '8888880004', role: 'customer',status: 'active' }
];

let currentUser = localStorage.getItem('pnbw_user') || null;
let currentRole = null;

// ==============================
// 2. DOMContentLoaded SETUP
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  setupSidePanel();
  setupNavigation();
  renderUserStatus();
  renderProperties();
  attachEventListeners();
});

// ==============================
// 3. SIDE PANEL (SOCIAL ICONS)
// ==============================
function setupSidePanel() {
  const sidePanel = document.getElementById('side-panel');
  sidePanel.className = 'side-panel';

  const socials = [
    { href: 'https://instagram.com/PNBWOfficial', imgSrc: 'images/ig.png', alt: 'Instagram' },
    { href: 'https://linkedin.com/company/PNBWOfficial', imgSrc: 'images/linkdin.png', alt: 'LinkedIn' },
    { href: 'https://www.facebook.com/profile.php?id=61576669505023&mibextid=ZbWKwL', imgSrc: 'images/facebook.png', alt: 'Facebook' },
    { href: 'mailto:support@pnbwofficial.com', imgSrc: 'images/gmail.png', alt: 'Gmail' },
    { href: 'https://github.com/PNBWOfficial', imgSrc: 'images/github.png', alt: 'GitHub' }
  ];

  socials.forEach(s => {
    const a = document.createElement('a');
    a.href = s.href;
    a.target = '_blank';
    a.setAttribute('aria-label', s.alt);

    const img = document.createElement('img');
    img.src = s.imgSrc;
    img.alt = s.alt;
    img.className = 'side-icon';

    a.appendChild(img);
    sidePanel.appendChild(a);
  });
}

// ==============================
// 4. NAVIGATION & EVENT LISTENERS
// ==============================
function attachEventListeners() {
  // Login modal
  document.getElementById('login-btn').addEventListener('click', onLoginButtonClick);
  document.getElementById('login-close').addEventListener('click', closeLoginModal);
  document.getElementById('login-modal').addEventListener('click', onModalClickOutside);
  document.getElementById('send-otp-btn').addEventListener('click', onSendOtp);
  document.getElementById('verify-otp-btn').addEventListener('click', onVerifyOtp);

  // Property details modal close
  document.getElementById('property-close').addEventListener('click', closePropertyModal);
  document.getElementById('property-modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('property-modal')) {
      closePropertyModal();
    }
  });

  // Navigation buttons (once logged in)
  document.getElementById('home-btn')?.addEventListener('click', showHome);
  document.getElementById('broker-btn')?.addEventListener('click', showBrokerDashboard);
  document.getElementById('admin-btn')?.addEventListener('click', showAdminPanel);
}

function setupNavigation() {
  if (currentUser) {
    const usr = users.find(u => u.phone === currentUser);
    currentRole = usr ? usr.role : 'customer';
    updateNavByRole();
  }
}

function updateNavByRole() {
  const brokerBtn = document.getElementById('broker-btn');
  const adminBtn  = document.getElementById('admin-btn');

  if (brokerBtn) brokerBtn.style.display = 'none';
  if (adminBtn)  adminBtn.style.display = 'none';

  if (currentRole === 'broker') {
    brokerBtn?.style.setProperty('display', 'inline-block');
  } else if (currentRole === 'admin') {
    adminBtn?.style.setProperty('display', 'inline-block');
  }
}

function showHome() {
  document.getElementById('home-section').style.display   = 'block';
  document.getElementById('broker-section').style.display = 'none';
  document.getElementById('admin-section').style.display  = 'none';
}

function showBrokerDashboard() {
  document.getElementById('home-section').style.display   = 'none';
  document.getElementById('broker-section').style.display = 'block';
  document.getElementById('admin-section').style.display  = 'none';
  renderBrokerDashboard();
}

function showAdminPanel() {
  document.getElementById('home-section').style.display   = 'none';
  document.getElementById('broker-section').style.display = 'none';
  document.getElementById('admin-section').style.display  = 'block';
  renderAdminTabs();
  switchTab('leads-tab');
}

// ==============================
// 5. LOGIN MODAL LOGIC
// ==============================
const loginModal    = document.getElementById('login-modal');
const phoneForm     = document.getElementById('contact-form');
const phoneInput    = document.getElementById('contact-input');
const otpForm       = document.getElementById('otp-form');
const otpInput      = document.getElementById('otp-input');

function onLoginButtonClick(e) {
  e.preventDefault();
  if (currentUser) {
    localStorage.removeItem('pnbw_user');
    currentUser = null;
    currentRole = null;
    updateNavByRole();
    showHome();
    renderUserStatus();
  } else {
    openLoginModal();
  }
}

function openLoginModal() {
  loginModal.style.display = 'flex';
  contactForm.style.display = 'flex';
  otpForm.style.display   = 'none';
  contactInput.value        = '';
  otpInput.value          = '';
}

function closeLoginModal() {
  loginModal.style.display = 'none';
}

function onModalClickOutside(evt) {
  if (evt.target === loginModal) {
    closeLoginModal();
  }
}
function onSendOtp() {
  const contactVal = contactInput.value.trim();

  // Basic pattern checks
  const phonePattern = /^[0-9]{10}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!phonePattern.test(contactVal) && !emailPattern.test(contactVal)) {
    alert('Please enter a valid 10-digit phone OR a valid email address.');
    return;
  }

  setTimeout(() => {
    contactForm.style.display = 'none';
    otpForm.style.display     = 'flex';
    alert(`OTP has been sent to ${contactVal}. (Simulated)`);
  }, 500);
}

function onVerifyOtp() {
  const otpVal = otpInput.value.trim();
  if (!/^[0-9]{4,6}$/.test(otpVal)) {
    alert('Please enter a valid OTP.');
    return;
  }

  const contactVal = contactInput.value.trim();
  currentUser = contactVal;                      // could be phone or email
  localStorage.setItem('pnbw_user', currentUser);

  const usr = users.find(u => u.phone === currentUser || u.email === currentUser);
  currentRole = usr ? usr.rolae : 'customer';

  alert('Logged in successfully!');
  closeLoginModal();
  updateNavByRole();
  showHome();
  renderUserStatus();
}

// ==============================
// 6. HEADER LOGIN STATUS
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
// 7. PROPERTY RENDERING (MULTIPLE IMAGES & STATUS BADGE)
// ==============================
function renderProperties() {
  const container = document.getElementById('properties');
  container.innerHTML = '';

  properties.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';  // position: relative

    // 1) Status badge
    const badgeSpan = document.createElement('span');
    badgeSpan.className = 'status-badge';
    let badgeColor = '#ffcc00';
    if (p.status === 'Resale') badgeColor = '#f63a3a';
    if (p.status === 'Under Construction') badgeColor = '#ff99c9';
    badgeSpan.style.background = badgeColor;
    badgeSpan.textContent = p.status;
    card.appendChild(badgeSpan);

    // 2) Image slider container
    const sliderDiv = document.createElement('div');
    sliderDiv.className = 'image-slider';
    p.images.forEach(imgName => {
      const imgEl = document.createElement('img');
      imgEl.src = `images/${imgName}`;
      imgEl.alt = p.title;
      imgEl.className = 'slider-image';
      sliderDiv.appendChild(imgEl);
    });
    card.appendChild(sliderDiv);

    // 3) Card content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'card-content';
    let stars = '';
    for (let i = 1; i <= 5; i++) {
      stars += i <= p.rating ? '★' : '☆';
    }
    contentDiv.innerHTML = `
      <h3>${p.title}</h3>
      <p class="stars">${stars}</p>
      <p>₹${p.price.toLocaleString()}</p>
      <button onclick="enquire(${p.id})">Enquire</button>
    `;
    card.appendChild(contentDiv);

    container.appendChild(card);
  });
}

// ==============================
// 8. ENQUIRE → PROPERTY DETAILS MODAL
// ==============================
const propertyModal = document.getElementById('property-modal');
const propertyClose = document.getElementById('property-close');
const propertyContainer = document.getElementById('property-details-container');

function enquire(id) {
  if (!currentUser) {
    alert('Please log in to view property details.');
    return;
  }
  const property = properties.find(p => p.id === id);
  if (!property) return;

  openPropertyModal(property);
}

function openPropertyModal(property) {
  // Clear previous content
  propertyContainer.innerHTML = '';

  // Title
  const titleEl = document.createElement('h2');
  titleEl.textContent = property.title;
  propertyContainer.appendChild(titleEl);

  // Image slider for details
  const sliderDiv = document.createElement('div');
  sliderDiv.className = 'property-slider';
  property.images.forEach(imgName => {
    const imgEl = document.createElement('img');
    imgEl.src = `images/${imgName}`;
    imgEl.alt = property.title;
    sliderDiv.appendChild(imgEl);
  });
  propertyContainer.appendChild(sliderDiv);

  // Property info block
  const infoDiv = document.createElement('div');
  infoDiv.className = 'property-info';

  // Status & badge
  let badgeColor = '#ffcc00';
  if (property.status === 'Resale') badgeColor = '#f63a3a';
  if (property.status === 'Under Construction') badgeColor = '#ff99c9';

  infoDiv.innerHTML = `
    <p><strong>Status:</strong> <span style="color:${badgeColor}; font-weight:600;">${property.status}</span></p>
    <p><strong>Price:</strong> ₹${property.price.toLocaleString()}</p>
    <p class="stars"><strong>Rating:</strong> ${'★'.repeat(property.rating) + '☆'.repeat(5 - property.rating)}</p>
    <p><strong>Description:</strong> ${property.description}</p>
  `;
  propertyContainer.appendChild(infoDiv);

  // “Confirm Enquiry” button
  const confirmBtn = document.createElement('button');
  confirmBtn.textContent = 'Confirm Enquiry';
  confirmBtn.style.marginTop = '12px';
  confirmBtn.onclick = () => {
    alert(`Enquiry confirmed for "${property.title}" by ${currentUser}.`);
    closePropertyModal();
  };
  propertyContainer.appendChild(confirmBtn);

  // Show the modal
  propertyModal.style.display = 'flex';
}

function closePropertyModal() {
  propertyModal.style.display = 'none';
  propertyContainer.innerHTML = '';
}

// ==============================
// 9. BROKER DASHBOARD RENDERING
// ==============================
function renderBrokerDashboard() {
  const brokerData = brokers.find(b => b.phone === currentUser);
  if (!brokerData) return;

  document.getElementById('ref-code').textContent       = brokerData.refCode;
  document.getElementById('leads-count').textContent    = brokerData.leads;
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
// 10. ADMIN PANEL RENDERING
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
    row.innerHTML = `<td>${u.phone}</td><td>${u.role}</td><td>${u.status}</td>`;
    userTbody.appendChild(row);
  });

  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
}

function switchTab(targetId) {
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.style.display = (pane.id === targetId ? 'block' : 'none');
  });
}
