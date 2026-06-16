document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btnYes');
    const btnNo = document.getElementById('btnNo');
    const questionCard = document.getElementById('questionCard');
    const successCard = document.getElementById('successCard');
    const foodCard = document.getElementById('foodCard');
    const finalCard = document.getElementById('finalCard');
    const btnNext1 = document.getElementById('btnNext1');
    const btnNext2 = document.getElementById('btnNext2');
    const selectedSummary = document.getElementById('selectedSummary');

    function moveNoButton(e) {
        const rect = btnNo.getBoundingClientRect();

        const mouseX = e ? e.clientX : rect.left + rect.width / 2;
        const mouseY = e ? e.clientY : rect.top + rect.height / 2;

        const btnCenterX = rect.left + rect.width / 2;
        const btnCenterY = rect.top + rect.height / 2;

        let dx = btnCenterX - mouseX;
        let dy = btnCenterY - mouseY;

        if (dx === 0 && dy === 0) {
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
        }

        const distanceToMouse = Math.sqrt(dx * dx + dy * dy) || 1;

        dx /= distanceToMouse;
        dy /= distanceToMouse;

        const pushDistance = 110 + Math.random() * 30;
        let targetLeft = rect.left + dx * pushDistance;
        let targetTop = rect.top + dy * pushDistance;

        const padding = 25;
        const minX = padding;
        const minY = padding;
        const maxX = window.innerWidth - rect.width - padding;
        const maxY = window.innerHeight - rect.height - padding;

        targetLeft = Math.max(minX, Math.min(maxX, targetLeft));
        targetTop = Math.max(minY, Math.min(maxY, targetTop));

        const newCenterX = targetLeft + rect.width / 2;
        const newCenterY = targetTop + rect.height / 2;
        const newDx = newCenterX - mouseX;
        const newDy = newCenterY - mouseY;
        const newDist = Math.sqrt(newDx * newDx + newDy * newDy);

        if (newDist < 80) {
            const screenCenterX = window.innerWidth / 2;
            const screenCenterY = window.innerHeight / 2;
            let dirToCenterX = screenCenterX - rect.left;
            let dirToCenterY = screenCenterY - rect.top;
            const length = Math.sqrt(dirToCenterX * dirToCenterX + dirToCenterY * dirToCenterY) || 1;

            targetLeft = rect.left + (dirToCenterX / length) * pushDistance;
            targetTop = rect.top + (dirToCenterY / length) * pushDistance;

            targetLeft = Math.max(minX, Math.min(maxX, targetLeft));
            targetTop = Math.max(minY, Math.min(maxY, targetTop));
        }

        const diffX = targetLeft - rect.left;
        const diffY = targetTop - rect.top;

        let currentX = parseFloat(btnNo.dataset.tx || 0);
        let currentY = parseFloat(btnNo.dataset.ty || 0);

        currentX += diffX;
        currentY += diffY;

        btnNo.dataset.tx = currentX;
        btnNo.dataset.ty = currentY;

        const randomRotation = (Math.random() - 0.5) * 20;
        btnNo.style.transform = `translate(${currentX}px, ${currentY}px) rotate(${randomRotation}deg) scale(0.95)`;
    }

    btnNo.addEventListener('mouseover', moveNoButton);
    btnNo.addEventListener('click', moveNoButton);

    btnYes.addEventListener('click', () => {
        btnYes.textContent = '¡Te espero entonces! 😊';
        btnYes.style.transform = 'scale(1.2)';
        btnYes.style.pointerEvents = 'none';

        setTimeout(() => {
            questionCard.classList.add('hidden');
            successCard.classList.remove('hidden');

            startHeartRain();
        }, 500);
    });

    btnNext1.addEventListener('click', () => {
        successCard.classList.add('hidden');
        foodCard.classList.remove('hidden');
        startHeartRain();
    });

    btnNext2.addEventListener('click', () => {
        const checkedFoods = Array.from(document.querySelectorAll('.food-checkbox:checked'))
            .map(cb => cb.value);

        let foodSummaryText = '';
        if (checkedFoods.length === 0) {
            foodSummaryText = '¡Prepararé las mejores sorpresas para comer! 🍿🥤🍫';
        } else {
            foodSummaryText = 'Menú elegido para consentirte:<br>' +
                checkedFoods.map(food => `✨ ${food}`).join('<br>') +
                '<br>¡Delicioso! 😋';
        }

        selectedSummary.innerHTML = foodSummaryText;

        foodCard.classList.add('hidden');
        finalCard.classList.remove('hidden');
        startHeartRain();
    });

    function startHeartRain() {
        const particleCount = 60;
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => {
                createParticle();
            }, i * 80);
        }
    }

    function createParticle() {
        const particle = document.createElement('div');
        particle.classList.add('heart-particle');

        const particles = ['🍿', '🎬', '✨', '🥰', '🥤', '😊', '🎉'];
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];

        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.fontSize = (Math.random() * 20 + 20) + 'px';

        particle.style.opacity = Math.random() * 0.4 + 0.6;

        const duration = Math.random() * 3 + 2;
        particle.style.animationDuration = duration + 's';

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
});
