document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('registerEmail');
    const offersInput = document.getElementById('registerOffers');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        if (!email) return;

        const response = await fetch('/api/profile/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                emailOffers: offersInput.checked
            })
        });

        if (!response.ok) {
            return;
        }

        const profile = await response.json();

        localStorage.setItem('street19_profile_id', profile.id);
        localStorage.setItem('street19_profile_email', profile.email);
        localStorage.setItem('street19_profile', JSON.stringify({
            firstName: profile.firstName || '',
            lastName: profile.lastName || '',
            email: profile.email,
            emailOffers: offersInput.checked
        }));

        window.location.href = '/profile';
    });
});
