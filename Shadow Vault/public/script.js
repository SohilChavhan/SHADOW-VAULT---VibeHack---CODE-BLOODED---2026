const socket = io();
let currentRoom = null;
let currentType = null;
let myDashboardRooms = [];

// --- AUTHENTICATION ---
function signup() {
    socket.emit('signup', { username: gId('username').value, password: gId('password').value });
}

function login() {
    socket.emit('login', { username: gId('username').value, password: gId('password').value });
}

socket.on('signup_success', (msg) => alert(msg));
socket.on('login_success', (data) => {
    // Save user to session so the next tab knows who you are
    sessionStorage.setItem('ghostUser', data.username);
    
    // Open the dashboard in a new tab
    window.open('/dashboard.html', '_blank');
});
socket.on('error', (msg) => alert(msg));

// --- CHAT LOGIC ---
function createPhantom() {
    const mins = gId('timer').value;
    socket.emit('create_phantom', { timerMinutes: parseInt(mins) });
}

socket.on('phantom_created', (data) => {
    alert(`Room Created!\nID: ${data.roomId}\nOTP: ${data.otp}`);
    addToDashboard(data.roomId, 'phantom');
});

function joinPerm(name) {
    socket.emit('join_perm', name);
    addToDashboard(name, 'perm');
}

function joinPhantom() {
    const id = gId('join-room-id').value;
    const otp = gId('join-otp').value;
    socket.emit('join_phantom', { roomId: id, otp: otp });
}

socket.on('joined_room', (data) => {
    currentRoom = data.roomId;
    currentType = data.type;
    gId('room-header').innerText = `${data.type.toUpperCase()}: ${data.roomId}`;
    gId('chat-box').innerHTML = '';
    data.history.forEach(m => addMessageToUI(m));
    showScreen('chat-room');
});

function sendMessage() {
    const msg = gId('message-input').value;
    if (!msg) return;
    socket.emit('send_msg', { roomId: currentRoom, msg: msg, type: currentType });
    gId('message-input').value = '';
}

socket.on('new_msg', (data) => {
    addMessageToUI(data);
});

socket.on('nuke_notice', (msg) => {
    alert(msg);
    exitChat();
    myDashboardRooms = myDashboardRooms.filter(r => r.id !== currentRoom);
    updateDashboardUI();
});

// --- UI HELPERS ---
function showScreen(id) {
    ['auth-screen', 'dashboard', 'chat-room'].forEach(s => gId(s).classList.add('hidden'));
    gId(id).classList.remove('hidden');
}

function gId(id) { return document.getElementById(id); }

function addMessageToUI(data) {
    const div = document.createElement('div');
    div.className = 'msg';
    div.innerHTML = `<span class="timestamp">[${data.time}]</span> <b>${data.user}:</b> ${data.text}`;
    gId('chat-box').appendChild(div);
    gId('chat-box').scrollTop = gId('chat-box').scrollHeight;
}

function addToDashboard(id, type) {
    if (!myDashboardRooms.find(r => r.id === id)) {
        myDashboardRooms.push({ id, type });
        updateDashboardUI();
    }
}

function updateDashboardUI() {
    gId('active-list').innerHTML = 'Recent: ' + myDashboardRooms.map(r => r.id).join(', ');
}

function exitChat() {
    showScreen('dashboard');
}