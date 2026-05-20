document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');
    const emailInput = document.getElementById('registerEmail');
    const codeInput = document.getElementById('registerCode');
    const offersInput = document.getElementById('registerOffers');
    const sendCodeBtn = document.getElementById('sendCodeBtn');
    const submitBtn = document.getElementById('registerSubmitBtn');
    const status = document.getElementById('registerStatus');

    let codeSentFor = '';

    function text(key, fallback, values = {}) {
        let value = window.Street19Preferences?.t?.(key, fallback) || fallback;
        Object.entries(values).forEach(([name, replacement]) => {
            value = value.replace(`{${name}}`, replacement);
        });
        return value;
    }

    function setStatus(message, type = '') {
        status.textContent = message;
        status.className = `register-status ${type}`.trim();
    }

    function setLoading(isLoading, message = '') {
        sendCodeBtn.disabled = isLoading;
        submitBtn.disabled = isLoading;
        if (message) {
            setStatus(message);
        }
    }

    sendCodeBtn.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        if (!email) {
            setStatus(text('register.emailRequired', 'Enter your email first.'), 'error');
            emailInput.focus();
            return;
        }

        setLoading(true, text('register.sending', 'Sending code...'));

        try {
            const response = await fetch('/api/profile/send-code', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || 'Could not send code');
            }

            codeSentFor = email;
            codeInput.disabled = false;
            codeInput.focus();

            if (data.devCode) {
                setStatus(text('register.devCode', 'Local test code: {code}', { code: data.devCode }), 'success');
            } else {
                setStatus(text('register.codeSent', 'Code sent. Check your email.'), 'success');
            }
        } catch (error) {
            setStatus(error.message || text('register.submitError', 'Could not finish sign in. Try again.'), 'error');
        } finally {
            setLoading(false);
        }
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value.trim();
        const verificationCode = codeInput.value.trim();

        if (!email) {
            setStatus(text('register.emailRequired', 'Enter your email first.'), 'error');
            emailInput.focus();
            return;
        }

        if (!verificationCode || verificationCode.length < 6 || codeSentFor !== email) {
            setStatus(text('register.codeRequired', 'Enter the 6-digit code from email.'), 'error');
            codeInput.disabled = false;
            codeInput.focus();
            return;
        }

        setLoading(true, text('register.creating', 'Checking code...'));

        try {
            const response = await fetch('/api/profile/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    verificationCode,
                    emailOffers: offersInput.checked
                })
            });

            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data.message || text('register.verifyFailed', 'Code is incorrect or expired.'));
            }

            localStorage.setItem('street19_profile_id', data.id);
            localStorage.setItem('street19_profile_email', data.email);
            localStorage.setItem('street19_profile', JSON.stringify({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email,
                emailOffers: offersInput.checked,
                emailVerified: Boolean(data.emailVerified)
            }));

            window.location.href = '/profile';
        } catch (error) {
            setStatus(error.message || text('register.submitError', 'Could not finish sign in. Try again.'), 'error');
            setLoading(false);
        }
    });
});
