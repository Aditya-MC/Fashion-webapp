// Arrays for storing wardrobe images and information
let shirtImages = [];
let pantImages = [];
let shoeImages = [];

// Arrays for storing saved reminders
let savedReminders = [];

// Modal elements
const addOutfitModal = document.getElementById('add-outfit-modal');
const wardrobeModal = document.getElementById('wardrobe-modal');
const reminderModal = document.getElementById('reminder-modal');
const savedRemindersModal = document.getElementById('saved-reminders-modal');

// Button elements
const addOutfitBtn = document.getElementById('add-outfit-btn');
const viewWardrobeBtn = document.getElementById('view-wardrobe-btn');
const setReminderBtn = document.getElementById('set-reminder-btn');
const savedForLaterBtn = document.getElementById('saved-for-later-btn');

// Close buttons
const closeButtons = document.querySelectorAll('.close-btn');

// Elements for randomization
const shirtSection = document.getElementById('shirt-section');
const pantSection = document.getElementById('pants-section');
const shoeSection = document.getElementById('shoes-section');

// Variables for reminder selections
let selectedShirt = null;
let selectedPant = null;
let selectedShoe = null;

// Load data from localStorage
function loadFromLocalStorage() {
    const storedShirts = localStorage.getItem('shirtImages');
    const storedPants = localStorage.getItem('pantImages');
    const storedShoes = localStorage.getItem('shoeImages');
    const storedReminders = localStorage.getItem('savedReminders');

    if (storedShirts) {
        shirtImages = JSON.parse(storedShirts);
    }
    if (storedPants) {
        pantImages = JSON.parse(storedPants);
    }
    if (storedShoes) {
        shoeImages = JSON.parse(storedShoes);
    }
    if (storedReminders) {
        savedReminders = JSON.parse(storedReminders);
    }
}

// Save data to localStorage
function saveToLocalStorage() {
    localStorage.setItem('shirtImages', JSON.stringify(shirtImages));
    localStorage.setItem('pantImages', JSON.stringify(pantImages));
    localStorage.setItem('shoeImages', JSON.stringify(shoeImages));
    localStorage.setItem('savedReminders', JSON.stringify(savedReminders));
}

// Function to get a random image from an array
function getRandomImage(images) {
    return images[Math.floor(Math.random() * images.length)];
}

// Function to update random outfits with smooth transition
function updateRandomOutfits() {
    const randomShirt = getRandomImage(shirtImages);
    const randomPant = getRandomImage(pantImages);
    const randomShoe = getRandomImage(shoeImages);

    // Set the background images
    shirtSection.style.backgroundImage = `url(${randomShirt})`;
    pantSection.style.backgroundImage = `url(${randomPant})`;
    shoeSection.style.backgroundImage = `url(${randomShoe})`;

    // Trigger fade effect
    shirtSection.classList.add('fade');
    pantSection.classList.add('fade');
    shoeSection.classList.add('fade');

    setTimeout(() => {
        shirtSection.classList.remove('fade');
        pantSection.classList.remove('fade');
        shoeSection.classList.remove('fade');
    }, 1000); // Duration of the fade effect
}

// Initial setup
loadFromLocalStorage();
updateRandomOutfits();

// Update every 5 seconds
setInterval(updateRandomOutfits, 5000);

/* ------------------------ Add Outfit Functionality ------------------------ */
document.getElementById('save-outfit-btn').addEventListener('click', () => {
    const itemType = document.querySelector('input[name="outfit-type"]:checked').value;
    const fileInput = document.getElementById('outfit-file');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            if (itemType === 'shirt') {
                shirtImages.push(e.target.result);
            } else if (itemType === 'pant') {
                pantImages.push(e.target.result);
            } else if (itemType === 'shoes') {
                shoeImages.push(e.target.result);
            }
            alert(itemType.charAt(0).toUpperCase() + itemType.slice(1) + ' added successfully!');
            fileInput.value = '';  // Clear the input field
            addOutfitModal.style.display = 'none';  // Close the modal
            saveToLocalStorage(); // Save updated data to localStorage
        };
        reader.readAsDataURL(file);
    } else {
        alert('Please select a file to upload!');
    }
});

/* ------------------------ View Wardrobe Functionality ------------------------ */
function loadWardrobeGallery() {
    const shirtGallery = document.getElementById('wardrobe-shirts');
    const pantGallery = document.getElementById('wardrobe-pants');
    const shoeGallery = document.getElementById('wardrobe-shoes');

    // Clear previous content
    shirtGallery.innerHTML = '';
    pantGallery.innerHTML = '';
    shoeGallery.innerHTML = '';

    // Load shirts
    shirtImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        shirtGallery.appendChild(imgElement);
    });

    // Load pants
    pantImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        pantGallery.appendChild(imgElement);
    });

    // Load shoes
    shoeImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        shoeGallery.appendChild(imgElement);
    });
}

/* ------------------------ Set Reminder Functionality ------------------------ */
function loadReminderGallery() {
    const reminderShirtGallery = document.getElementById('reminder-shirts');
    const reminderPantGallery = document.getElementById('reminder-pants');
    const reminderShoeGallery = document.getElementById('reminder-shoes');

    reminderShirtGallery.innerHTML = '';
    reminderPantGallery.innerHTML = '';
    reminderShoeGallery.innerHTML = '';

    // Load shirts for reminder
    shirtImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.addEventListener('click', () => {
            selectedShirt = image;
            alert('Shirt selected!');
        });
        reminderShirtGallery.appendChild(imgElement);
    });

    // Load pants for reminder
    pantImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.addEventListener('click', () => {
            selectedPant = image;
            alert('Pant selected!');
        });
        reminderPantGallery.appendChild(imgElement);
    });

    // Load shoes for reminder
    shoeImages.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image;
        imgElement.addEventListener('click', () => {
            selectedShoe = image;
            alert('Shoes selected!');
        });
        reminderShoeGallery.appendChild(imgElement);
    });
}

// Save reminder
document.getElementById('save-reminder-btn').addEventListener('click', () => {
    const selectedDate = document.getElementById('reminder-date').value;
    const reminderTitle = document.getElementById('reminder-title').value;

    if (selectedShirt && selectedPant && selectedShoe && selectedDate) {
        savedReminders.push({
            title: reminderTitle,
            shirt: selectedShirt,
            pant: selectedPant,
            shoes: selectedShoe,
            date: selectedDate
        });
        alert('Reminder set successfully!');
        selectedShirt = null;
        selectedPant = null;
        selectedShoe = null;
        reminderModal.style.display = 'none';  // Close the modal
        saveToLocalStorage(); // Save updated data to localStorage
    } else {
        alert('Please select all items and date!');
    }
});

/* ------------------------ Saved for Later Functionality ------------------------ */
function displaySavedReminders() {
    const savedRemindersGallery = document.getElementById('saved-reminders');
    savedRemindersGallery.innerHTML = '';

    savedReminders.forEach(reminder => {
        const reminderItem = document.createElement('div');
        reminderItem.classList.add('wardrobe-gallery');

        reminderItem.innerHTML = `
            <div class="outfit-desc">
            <h3>${reminder.title}</h3>
            <h4>Date: ${reminder.date}</h4>
            </div>
            <div>
            <img src="${reminder.shirt}" alt="Shirt">
            <img src="${reminder.pant}" alt="Pant">
            <img src="${reminder.shoes}" alt="Shoes">
            </div>
        `;

        savedRemindersGallery.appendChild(reminderItem);
    });
}

/* ------------------------ Event Listeners for Modals ------------------------ */
addOutfitBtn.addEventListener('click', () => {
    addOutfitModal.style.display = 'flex';  // Show the add outfit modal
});

viewWardrobeBtn.addEventListener('click', () => {
    loadWardrobeGallery();
    wardrobeModal.style.display = 'flex';  // Show the wardrobe modal
});

setReminderBtn.addEventListener('click', () => {
    loadReminderGallery();
    reminderModal.style.display = 'flex';  // Show the reminder modal
});

savedForLaterBtn.addEventListener('click', () => {
    displaySavedReminders();
    savedRemindersModal.style.display = 'flex';  // Show the saved reminders modal
});

// Close modals
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.closest('.modal').style.display = 'none';
    });
});

// Close modals when clicking outside of them
window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
});
