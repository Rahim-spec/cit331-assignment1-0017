document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const statusMsg = document.getElementById('status-message');
    const container = document.getElementById('display-container');
    const clearBtn = document.getElementById('clear-btn');


function renderRegistrations() {
        const list = JSON.parse(localStorage.getItem('club_regs')) || [];
        if (list.length === 0) {
            container.innerHTML = '<p>No registrations saved yet.</p>';
            return;
        }

        let tableHTML = '<table><tr><th>Name</th><th>Email</th><th>Event</th></tr>';
        list.forEach(item => {
            tableHTML += `<tr><td>${item.fullname}</td><td>${item.email}</td><td>${item.eventSelect}</td></tr>`;
        });
        tableHTML += '</table>';
        container.innerHTML = tableHTML;
}


if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const fullname = document.getElementById('fullname').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const eventSelect = document.getElementById('event-select').value;
            const hear = document.querySelector('input[name="hear"]:checked').value;

            const entry = { fullname, email, phone, eventSelect, hear };
            const list = JSON.parse(localStorage.getItem('club_regs')) || [];
            list.push(entry);
            localStorage.setItem('club_regs', JSON.stringify(list));

             statusMsg.textContent = 'Successfully registered!';
            statusMsg.style.color = 'green';
            form.reset();
            renderRegistrations();
    });
}

  
    if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('club_regs');
        statusMsg.textContent = 'All registrations cleared.';
        statusMsg.style.color = 'red';
        renderRegistrations();
    });
}

 
     renderRegistrations();
});