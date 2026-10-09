document.addEventListener('DOMContentLoaded', () => {
    // Static data for pre-registered users
    const staticUsers = [
        {
            id: 1,
            name: 'Conrad Fisher',
            age: 18,
            profession: 'Student (Pre-Med)',
            location: 'Cousins Beach',
            photo: 'https://static.wikia.nocookie.net/thesummeriturnedprettytrilogy/images/3/31/Conrad_S3_Portrait.jpg'
        },
        {
            id: 2,
            name: 'Belly Conklin',
            age: 16,
            profession: 'Student',
            location: 'Cousins Beach',
            photo: 'https://static.wikia.nocookie.net/thesummeriturnedprettytrilogy/images/c/c0/TSITP_Belly_S1_Portrait.jpg'
        },
        {
            id: 3,
            name: 'Jeremiah Fisher',
            age: 17,
            profession: 'Lifeguard / Student',
            location: 'Cousins Beach',
            photo: 'https://static.wikia.nocookie.net/thesummeriturnedprettytrilogy/images/e/e6/Jeremiah_S3_Portrait.jpg'
        }
    ];

    // Current user state
    let currentUser = {
        name: '',
        age: '',
        profession: '',
        photoSrc: ''
    };

    // DOM Elements
    const screens = {
        registration: document.getElementById('registration-screen'),
        users: document.getElementById('users-screen'),
        match: document.getElementById('match-screen')
    };

    const photoInput = document.getElementById('user-photo');
    const photoPreview = document.getElementById('photo-preview');
    const registrationForm = document.getElementById('registration-form');
    const usersGrid = document.getElementById('users-grid');
    const findMatchBtn = document.getElementById('find-match-btn');
    const restartBtn = document.getElementById('restart-btn');

    // Handle Photo Upload Preview
    photoInput.addEventListener('change', function(e) {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                currentUser.photoSrc = e.target.result;
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            }
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Handle Registration Submit
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!currentUser.photoSrc) {
            alert('Please upload a photo first.');
            return;
        }

        currentUser.name = document.getElementById('user-name').value;
        currentUser.age = document.getElementById('user-age').value;
        currentUser.profession = document.getElementById('user-profession').value;

        renderUsers();
        switchScreen('users');
    });

    // Render Static Users
    function renderUsers() {
        usersGrid.innerHTML = '';
        
        staticUsers.forEach((user, index) => {
            // Apply a slight delay to each card for staggered animation
            const delay = index * 0.1;
            
            const card = document.createElement('div');
            card.className = 'user-card';
            card.style.animation = `fadeIn 0.5s ease ${delay}s forwards`;
            card.style.opacity = '0';
            
            card.innerHTML = `
                <img src="${user.photo}" alt="${user.name}" class="user-photo">
                <div class="user-info">
                    <h3>${user.name}, ${user.age}</h3>
                    <div class="user-details">
                        <span><strong>Profession:</strong> ${user.profession}</span>
                        <span><strong>Location:</strong> ${user.location}</span>
                    </div>
                </div>
            `;
            
            usersGrid.appendChild(card);
        });
    }

    // Handle Find Match Button
    findMatchBtn.addEventListener('click', function() {
        // Select a random match from static users
        const randomMatch = staticUsers[Math.floor(Math.random() * staticUsers.length)];
        
        // Update match screen DOM
        document.getElementById('match-user-photo').src = currentUser.photoSrc;
        document.getElementById('match-partner-photo').src = randomMatch.photo;
        document.getElementById('match-partner-name').textContent = randomMatch.name;
        
        switchScreen('match');
    });

    // Handle Restart Button
    restartBtn.addEventListener('click', function() {
        // Reset form and state
        registrationForm.reset();
        photoPreview.innerHTML = `<span>+ Upload Photo</span>`;
        currentUser = {
            name: '',
            age: '',
            profession: '',
            photoSrc: ''
        };
        
        switchScreen('registration');
    });

    // Helper to switch screens
    function switchScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        screens[screenName].classList.add('active');
        window.scrollTo(0, 0);
    }
});
