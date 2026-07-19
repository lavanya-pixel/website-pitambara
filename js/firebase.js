/* 
   Pitambara Dudh Dairy – Firebase & Contact Form Integration
   Stores contact form submissions in Firebase Firestore (if configured)
   or falls back to local storage with a notification.
*/

// --- Firebase Configuration ---
// Replace the placeholders with your actual Firebase project settings when deploying:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "YOUR_DATABASE_URL" // If using Realtime Database
};

let isFirebaseActive = false;

// Attempt to initialize Firebase if configurations are filled out
if (typeof firebase !== 'undefined' && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
        firebase.initializeApp(firebaseConfig);
        isFirebaseActive = true;
        console.log("Firebase initialized successfully for Pitambara Dudh Dairy Form.");
    } catch (error) {
        console.error("Firebase initialization failed:", error);
    }
} else {
    console.log("Running in demo mode: Form submissions will save to local storage. Configure firebaseConfig in js/firebase.js to connect to a real database.");
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = document.getElementById('contactName').value.trim();
            const phone = document.getElementById('contactPhone').value.trim();
            const email = document.getElementById('contactEmail').value.trim();
            const message = document.getElementById('contactMessage').value.trim();
            
            // Simple validation
            if (!name || !phone || !message) {
                showCustomToast("Please fill in all required fields.", "info");
                return;
            }

            const formData = {
                name: name,
                phone: phone,
                email: email || "Not Provided",
                message: message,
                timestamp: new Date().toISOString()
            };

            if (isFirebaseActive) {
                // Submit to Firebase Realtime Database
                try {
                    // Using Realtime Database (compat)
                    const db = firebase.database();
                    const messagesRef = db.ref('contact_messages');
                    await messagesRef.push(formData);
                    
                    showCustomToast("Thank you! Your message has been sent.", "success");
                    contactForm.reset();
                } catch (error) {
                    console.error("Firebase submit error:", error);
                    showCustomToast("Failed to send message via Firebase. Saving locally...", "info");
                    saveLocally(formData);
                    contactForm.reset();
                }
            } else {
                // Fallback: save to LocalStorage
                saveLocally(formData);
                showCustomToast("Message submitted successfully! (Saved locally)", "success");
                contactForm.reset();
            }
        });
    }
});

// Local storage fallback helper
function saveLocally(data) {
    let localMessages = [];
    try {
        const stored = localStorage.getItem('pitambara_contact_messages');
        if (stored) {
            localMessages = JSON.parse(stored);
        }
    } catch (e) {
        console.error("Failed to read messages from localStorage", e);
    }
    
    localMessages.push(data);
    
    try {
        localStorage.setItem('pitambara_contact_messages', JSON.stringify(localMessages));
        console.log("Saved submission to localStorage:", data);
    } catch (e) {
        console.error("Failed to write message to localStorage", e);
    }
}
