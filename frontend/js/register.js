document.body.addEventListener('htmx:load', function(evt) {
    const form = document.getElementById('register-form');

    
    if (!form) {
        console.warn('Форма реєстрації не знайдена на сторінці.');
        return;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries()); 
        
        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await res.json();
            
            if (res.ok) {
                alert(result.message);
            } else {
                alert(result.error);
            }

        } catch (err) {
            console.error('Помилка при відправці запиту:', err);
            alert('Не вдалося підключитися до сервера.');
        }
    });
});