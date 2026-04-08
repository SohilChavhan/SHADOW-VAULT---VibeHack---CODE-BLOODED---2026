👻 SHADOW VAULT: THE GHOST PROTOCOL

A Privacy-First, AI-Moderated Anonymous Interaction System

📌 PROJECT OVERVIEW
Shadow Vault is a secure, low-stakes social platform built for VibeHack: Vibe Coding Hackathon. It addresses the psychological pressure of modern social media by facilitating spontaneous, low-pressure communication through temporary, anonymous conversations.

🚀 CORE FEATURES

1. SECURE AUTHENTICATION

    OTP Login: Users enter through a professional Sign-in interface verified via One-Time Passwords.
    Masked Identity: Randomized, system-generated aliases ensure interaction is based on ideas, not social standing.

2. CENTRALIZED DASHBOARD

    The Commons: Access permanent community boards for campus-wide Q&A and interest-based networking.
    Phantom Portal: A dedicated entry point for creating or joining high-privacy, temporary sessions.

3. PHANTOM CHATS (THE 6-DIGIT CODE)

    Dynamic Generation: Creating a chat generates a unique 6-digit room code.
    Zero-Friction Access: Other members enter the code to join the session instantly without needing links or friend requests.
    Ephemeral Persistence: Rooms exist only as long as active; once the timer expires, all data is automatically purged from the server's memory.

4. PROACTIVE AI SAFETY LAYER

    Implicit Word Detection: Real-time AI scanning monitors messages for toxic, implicit, or harmful language.
    Automatic Recording: If the AI detects high-risk content, the segment is recorded to ensure ethical data handling and accountability.
    Privacy Preservation: Clean messages are never stored, fulfilling the "Ghost Protocol" promise.

🛠️ TECHNOLOGY STACK

        1.Backend (The "Brain"):
                           Node.js: The core runtime environment that allows JavaScript to run on the server.
                           Express.js: A web framework for Node.js used to serve the website files and handle
                                       the routing between the login page and the dashboard.
                           Socket.io: The most critical component for this project. It enables bi-directional, real-time communication
                                       between the users, which is essential for the "Phantom" and "Permanent" chat features.
                           Bcryp.js: A library used to hash passwords. This ensures that even the developers cannot see the users' plain-text
                                       credentials, maintaining the "Semi-Private" security model.
                           Body-parser: Middleware used to process incoming request bodies, specifically for handling the sign-up and login data.
 
       2. Frontend (The "Interface"): HTML5 & CSS3: Used to build the structure and the "v0" inspired high-fidelity dark-mode UI.
                                   Vanilla JavaScript: Used for client-side logic, such as triggering the "Nuke" alerts and managing the session synchronization between tabs.
                                  Session Storage: A web API used to securely store the user's "Ghost Identity" locally in the browser tab,
                                                  ensuring the session is wiped once the tab is closed.
 
       3. Data & Security Layer: In-Memory Data Structures: Instead of a permanent database like SQL, we used JavaScript objects and arrays
                                                              to store active chats. This ensures that when a "Nuke" timer triggers, the data is
                                                                physically erased from the server's RAM.

                              TTL (Time-To-Live) Logic: Custom JavaScript setTimeout functions are used to implement the Adjustable Nuke Timer,
                                                          which automates the destruction of Phantom Chats.

                               Safety Filter Logic: A custom-built interceptor that scans every message in "Permanent" communities against a dictionary
                                                      of forbidden intents before broadcasting them.

       4. Developer Oversight: Console Table Logging: A developer-only feature that formats and prints the Safety Log directly to the terminal,
                                      linking anonymous messages to real student identities for threat protection.

⚙️ SYSTEM LOGIC: THE "BURN" MECHANISM

    AI Pulse: Every Phantom Message is analyzed by the AI Safety Layer.
    Soft Burn: Safe content is stored in volatile memory and deleted immediately after the session ends.
    Shadow Log: Flagged content is moved to encrypted storage for 24 hours for moderator review before a permanent hard delete.

🤖 MANDATORY AI DISCLOSURE

In accordance with VibeHack Rules:

    Tools Used: ChatGPT, Gemini, GitHub Copilot and Prezi
    Usage: AI assisted in generating burn timer logic, debugging.
    Human Oversight: All AI-assisted components were reviewed and integrated by the team to ensure complete technical understanding.

🏁 SUBMISSION REQUIREMENTS

    Source Code: [Insert Link].

    Project Demo: [Insert Link].

    Team: [Your Team Name]

    "Build boldly, think creatively, and speak freely."

Developed for the Data Science Club: VibeHack 2026