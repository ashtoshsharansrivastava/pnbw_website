// script.js

// 1. Hard‐coded property list, now with status field
//   Make sure your images live in an 'images/' folder at the same level as index.html
const properties = [
  {
    id: 1,
    title: 'Sunset Villa, Goa',
    price: 9500000,
    image: 'images/villa_goa.jpg',
    status: 'Ready to Move'
  },
  {
    id: 2,
    title: 'Oceanview Plot, Kerala',
    price: 1800000,
    image: 'images/plot_kerala.jpg',
    status: 'Under Construction'
  },
  {
    id: 3,
    title: 'Skyline Apartment, Mumbai',
    price: 6200000,
    image: 'images/apartment_mumbai.jpg',
    status: 'Resale'
  },
  {
    id: 4,
    title: 'Green Fields Land, Punjab',
    price: 3000000,
    image: 'images/land_punjab.jpg',
    status: 'Ready to Move'
  },
  {
    id: 5,
    title: 'Hilltop Cottage, Himachal',
    price: 4200000,
    image: 'images/cottage_himachal.jpg',
    status: 'Under Construction'
  },
  {
    id: 6,
    title: 'Desert Oasis Plot, Rajasthan',
    price: 2500000,
    image: 'images/plot_rajasthan.jpg',
    status: 'Resale'
  }
];

// 2. Hard-coded broker & user data (simulate backend data)
const brokers = [
  { phone: '9999990001', refCode: 'BRK001', leads: 5, commission: 50000, bonus: 10000, properties: [1,3] },
  { phone: '9999990002', refCode: 'BRK002', leads: 2, commission: 20000, bonus: 4000, properties: [2,4] },
  { phone: '9999990003', refCode: 'BRK003', leads: 0, commission: 0, bonus: 0, properties: [5] }
];

const users = [
  { phone: '0000000000', role: 'admin', status: 'active' },
  { phone: '9999990001', role: 'broker', status: 'active' },
  { phone: '9999990002', role: 'broker', status: 'active' },
  { phone: '9999990003', role: 'broker', status: 'disabled' },
  { phone: '8888880004', role: 'customer', status: 'active' }
];

// 3. Track “logged-in user” (phone) in localStorage
let currentUser = localStorage.getItem('pnbw_user') || null;
let currentRole = null;

// 4. When DOM is ready, initialize UI
document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  renderUserStatus();
  renderProperties();
  document.getElementById('login-btn').addEventListener('click', login);
  document.getElementById('home-btn').addEventListener('click', showHome);
  document.getElementById('broker-btn').addEventListener('click', showBrokerDashboard);
  document.getElementById('admin-btn').addEventListener('click', showAdminPanel);

  // If logged in, set role and show relevant nav
  if (currentUser) {
    const usr = users.find(u => u.phone === currentUser);
    if (usr) currentRole = usr.role;
    updateNavByRole();
  }
});

// 5. Navigation logic
function setupNavigation() {
  // Default view: Home
  showHome();
}
function updateNavByRole() {
  const brokerBtn = document.getElementById('broker-btn');
  const adminBtn = document.getElementById('admin-btn');

  if (currentRole === 'broker') {
    brokerBtn.style.display = 'inline-block';
    adminBtn.style.display = 'none';
  } else if (currentRole === 'admin') {
    adminBtn.style.display = 'inline-block';
    brokerBtn.style.display = 'none';
  } else {
    brokerBtn.style.display = 'none';
    adminBtn.style.display = 'none';
  }
}
function showHome() {
  document.getElementById('home-section').style.display = 'block';
  document.getElementById('broker-section').style.display = 'none';
  document.getElementById('admin-section').style.display = 'none';
}
function showBrokerDashboard() {
  document.getElementById('home-section').style.display = 'none';
  document.getElementById('broker-section').style.display = 'block';
  document.getElementById('admin-section').style.display = 'none';
  renderBrokerDashboard();
}
function showAdminPanel() {
  document.getElementById('home-section').style.display = 'none';
  document.getElementById('broker-section').style.display = 'none';
  document.getElementById('admin-section').style.display = 'block';
  renderAdminTabs();
  // Show first tab by default
  switchTab('leads-tab');
}

// 6. Update header to show either “Login” or “Logout” + phone
function renderUserStatus() {
  const statusEl = document.getElementById('user-status');
  const btn = document.getElementById('login-btn');

  if (currentUser) {
    statusEl.textContent = `Logged in: ${currentUser}`;
    btn.textContent = 'Logout';
  } else {
    statusEl.textContent = '';
    btn.textContent = 'Login';
  }
}

// 7. Mock login/logout flow
// - If no user, prompt for phone → store in localStorage
// - If logged‐in, clear localStorage
function login() {
  if (currentUser) {
    // Logging out
    localStorage.removeItem('pnbw_user');
    currentUser = null;
    currentRole = null;
    updateNavByRole();
    showHome();
  } else {
    // Logging in
    const phone = prompt('Enter your phone number:');
    if (phone && phone.trim() !== '') {
      currentUser = phone.trim();
      localStorage.setItem('pnbw_user', currentUser);
      const usr = users.find(u => u.phone === currentUser);
      currentRole = usr ? usr.role : 'customer';
      alert('Logged in successfully');
      updateNavByRole();
      showHome();
    }
  }
  renderUserStatus();
}

// 8. Build property cards and insert into #properties grid, including status
function renderProperties() {
  const container = document.getElementById('properties');
  container.innerHTML = ''; // Clear any existing cards

  properties.forEach((p) => {
    const card = document.createElement('div');
    card.className = 'card';

    // Status badge color based on status
    let badgeColor = '#50e3c2'; // default teal
    if (p.status === 'Resale') badgeColor = '#f5a623';
    if (p.status === 'Under Construction') badgeColor = '#e94e77';
    
    // Each card: status, image → title → price → Enquire button
    card.innerHTML = `
      <span class="status-badge" style="background:${badgeColor}">${p.status}</span>
      <img src="${p.image}" alt="${p.title}" />
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>₹${p.price.toLocaleString()}</p>
        <button onclick="enquire(${p.id})">Enquire</button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Called when user clicks “Enquire” on a specific property
function enquire(id) {
  if (!currentUser) {
    alert('Please log in to make an enquiry.');
    return;
  }
  const property = properties.find((p) => p.id === id);
  alert(`Enquiry registered for ${property.title} by ${currentUser}`);
}

// 9. Render Broker Dashboard (fetch data from brokers array)
function renderBrokerDashboard() {
  const brokerData = brokers.find(b => b.phone === currentUser);
  if (!brokerData) return;

  document.getElementById('ref-code').textContent = brokerData.refCode;
  document.getElementById('leads-count').textContent = brokerData.leads;
  document.getElementById('commission-amt').textContent = brokerData.commission + brokerData.bonus;

  // List of property titles owned by this broker
  const propListEl = document.getElementById('broker-properties');
  propListEl.innerHTML = '';
  brokerData.properties.forEach(pid => {
    const p = properties.find(prop => prop.id === pid);
    if (p) {
      const li = document.createElement('li');
      li.textContent = p.title + ' (₹' + p.price.toLocaleString() + ')';
      propListEl.appendChild(li);
    }
  });
}

// 10. Render Admin Tabs content
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

  // Attach tab button events
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.target));
  });
}
function switchTab(targetId) {
  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.style.display = pane.id === targetId ? 'block' : 'none';
  });
}