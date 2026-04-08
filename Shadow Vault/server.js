const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(bodyParser.json());

// --- DATABASE SIMULATION ---
const users = [
    { username: 'dev', password: bcrypt.hashSync('admin123', 10), role: 'admin' }
]; 
const permanentChats = { 'General': [] };
const phantomRooms = {}; 
const globalBans = new Set();
const safetyLogs = []; // FEATURE 6: Safety Log for Developers

// --- FEATURE 6: SAFETY FILTER ---
function checkSafety(text) {
    const forbidden = ['illegal', 'harmful', 'attack', 'bomb', 'leak','ILLEGAL','HARMFUL','ATTACK','BOMB','LEAK','DRUGS','drugs','human trafficking','Human Trafficking','HUMAN TRAFFICKING','Drugs','Leaks','Bomb','Attack','Illegal']; 
    return forbidden.some(word => text.toLowerCase().includes(word));
}

io.on('connection', (socket) => {
    let currentUser = null;

    // --- NEW: RECONNECT LOGIC FOR NEW TABS ---
    socket.on('reconnect_user', (username) => {
        currentUser = username;
        console.log(`[SYNC] Tab opened for: ${username}`);
    });

    // --- FEATURE 3: SIGN UP & LOGIN ---
    socket.on('signup', ({ username, password }) => {
        if (users.find(u => u.username === username)) return socket.emit('error', 'Username taken.');
        users.push({ username, password: bcrypt.hashSync(password, 10), role: 'user' });
        console.log(`[AUTH] New User: ${username}`);
        socket.emit('signup_success', 'Account created! Please login.');
    });

    socket.on('login', ({ username, password }) => {
        const user = users.find(u => u.username === username);
        if (user && bcrypt.compareSync(password, user.password)) {
            if (globalBans.has(username)) return socket.emit('error', 'You are permanently banned by Devs.');
            currentUser = username;
            socket.emit('login_success', { username, role: user.role });
        } else {
            socket.emit('error', 'Invalid credentials.');
        }
    });

    // --- FEATURE 1: PHANTOM CHATS (PRIVATE) ---
    socket.on('create_phantom', ({ timerMinutes }) => {
        const roomId = "P-" + Math.random().toString(36).substr(2, 4).toUpperCase();
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        
        phantomRooms[roomId] = { 
            otp, 
            creator: currentUser, 
            messages: [],
            expiry: Date.now() + (timerMinutes * 60000)
        };

        // THE ADJUSTABLE NUKE
        setTimeout(() => {
            delete phantomRooms[roomId];
            io.to(roomId).emit('nuke_notice', 'This chat has been nuked from existence.');
        }, timerMinutes * 60000);

        socket.emit('phantom_created', { roomId, otp });
    });

    socket.on('join_phantom', ({ roomId, otp }) => {
        const room = phantomRooms[roomId];
        if (room && room.otp === otp) {
            socket.join(roomId);
            socket.emit('joined_room', { roomId, type: 'phantom', history: room.messages });
        } else {
            socket.emit('error', 'Invalid Room ID or OTP.');
        }
    });

    // --- FEATURE 2: PERMANENT CHATS (COMMUNITIES + SAFETY API) ---
    socket.on('join_perm', (community) => {
        socket.join(community);
        socket.emit('joined_room', { roomId: community, type: 'perm', history: permanentChats[community] });
    });

    socket.on('send_msg', ({ roomId, msg, type }) => {
        if (!currentUser) return;

        // Apply Safety API to Permanent Chats only
        if (type === 'perm' && checkSafety(msg)) {
            const logEntry = {
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString(),
                username: currentUser,
                message: msg,
                community: roomId
            };
            safetyLogs.push(logEntry);
            console.log("\n--- SAFETY LOG UPDATED ---");
            console.table(safetyLogs); // FEATURE 6: Print to Terminal
            return socket.emit('error', 'Message blocked: Potential safety violation.');
        }

        const messageData = { user: 'Anonymous Ghost', text: msg, time: new Date().toLocaleTimeString() };
        
        if (type === 'perm') {
            permanentChats[roomId].push(messageData);
        } else if (phantomRooms[roomId]) {
            phantomRooms[roomId].messages.push(messageData);
        }

        io.to(roomId).emit('new_msg', messageData);
    });

    // --- FEATURE 4: DEV BAN ---
    socket.on('dev_ban', (targetUser) => {
        const admin = users.find(u => u.username === currentUser);
        if (admin && admin.role === 'admin') {
            globalBans.add(targetUser);
            console.log(`[DEV BAN] ${targetUser} has been removed.`);
        }
    });
});

server.listen(3000, () => console.log('Ghost Protocol Active: http://localhost:3000'));