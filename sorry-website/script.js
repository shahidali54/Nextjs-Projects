document.addEventListener('DOMContentLoaded', () => {
    // Music control
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isMusicPlaying = false;

    musicBtn.addEventListener('click', () => {
        if (isMusicPlaying) {
            bgMusic.pause();
            musicBtn.style.animation = 'none';
        } else {
            bgMusic.play();
            musicBtn.style.animation = 'rotate 3s linear infinite';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Add click effect to the heart
    const heart = document.querySelector('.heart-shape');
    heart.addEventListener('click', () => {
        heart.style.transform = 'rotate(45deg) scale(1.3)';
        setTimeout(() => {
            heart.style.transform = 'rotate(45deg) scale(1)';
        }, 200);
        createHeartBurst();
    });

    // Create heart burst effect
    function createHeartBurst() {
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = '50%';
            heart.style.top = '50%';
            heart.style.transform = `rotate(${i * 45}deg) translateY(-100px)`;
            document.querySelector('.floating-hearts').appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 2000);
        }
    }

    // Create additional floating hearts on click
    document.addEventListener('click', (e) => {
        if (e.target === musicBtn) return;
        
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        const hearts = ['❤️', '💖', '💝', '💗', '💓'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${e.clientX}px`;
        heart.style.top = `${e.clientY}px`;
        document.querySelector('.floating-hearts').appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    });

    // Add hover effect to images
    const images = document.querySelectorAll('.image-container');
    images.forEach(image => {
        image.addEventListener('mouseover', () => {
            image.style.transform = 'scale(1.05) rotate(2deg)';
        });
        image.addEventListener('mouseout', () => {
            image.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animate name on hover
    const name = document.querySelector('.name');
    name.addEventListener('mouseover', () => {
        name.style.transform = 'scale(1.1)';
        name.style.color = '#ff6b6b';
    });
    name.addEventListener('mouseout', () => {
        name.style.transform = 'scale(1)';
        name.style.color = '#ff4b4b';
    });

    // Create floating particles
    function createParticles() {
        const particles = document.querySelector('.particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 3 + 2}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particles.appendChild(particle);
        }
    }

    createParticles();
}); 