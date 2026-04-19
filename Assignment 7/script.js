document.getElementById('load-btn').addEventListener('click', fetchUsers);

async function fetchUsers() {
    const container = document.getElementById('user-container');
    const button = document.getElementById('load-btn');
    
    // UI Loading State
    container.innerHTML = '';
    button.innerText = 'Fetching Data...';
    button.disabled = true;

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const users = await response.json();
        
        // Populate container with user cards
        users.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('user-card');
            
            card.innerHTML = `
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            `;
            
            container.appendChild(card);
        });

    } catch (error) {
        container.innerHTML = `
            <p style="color: #e74c3c; font-weight: bold; grid-column: 1/-1;">
                Error: Unable to load data. Please try again later.
            </p>
        `;
        console.error('Fetch error:', error);
    } finally {
        button.innerText = 'Load User Data';
        button.disabled = false;
    }
}