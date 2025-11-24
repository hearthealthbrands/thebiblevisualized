document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SHARE BUTTON LOGIC
    const shareBtn = document.getElementById('share-btn');
    
    if (shareBtn && navigator.share) {
        shareBtn.addEventListener('click', async () => {
            try {
                await navigator.share({
                    title: document.title,
                    text: 'Check out this visualization of scripture:',
                    url: window.location.href
                });
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    } else if (shareBtn) {
        // Fallback for desktop
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        });
    }

    // 2. DYNAMIC YEAR
    const yearSpan = document.querySelector('#copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 3. COPY VERSE LOGIC + "AMEN" EFFECT
    const copyBtn = document.getElementById('copy-verse-btn');
    const verseTextElement = document.getElementById('daily-verse');

    if (copyBtn && verseTextElement) {
        // Ensure the button is positioned relatively so the heart floats from IT
        copyBtn.style.position = 'relative';

        copyBtn.addEventListener('click', async () => {
            try {
                const textToCopy = verseTextElement.innerText;
                await navigator.clipboard.writeText(textToCopy);
                
                // A. Button State Change
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                copyBtn.classList.add('copied-state');
                
                // B. The "Amen" Particle Effect
                const heart = document.createElement('span');
                heart.innerText = "❤️"; 
                heart.classList.add('amen-particle');
                
                // Center the heart on the button
                heart.style.left = '50%';
                heart.style.top = '0';
                heart.style.marginLeft = '-10px'; // Half the width to center it
                
                copyBtn.appendChild(heart);

                // Remove heart after animation
                setTimeout(() => {
                    heart.remove();
                }, 1000);
                
                // Revert button text
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.classList.remove('copied-state');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }

    // 4. VISUAL PEACE (Blur-Up Image Loader)
    const images = document.querySelectorAll('.image-wrapper img, .verse-container img');

    images.forEach(img => {
        const reveal = () => {
            img.classList.add('loaded');
        };

        if (img.complete) {
            reveal();
        } else {
            img.addEventListener('load', reveal);
        }
    });

    // 5. SCROLL REVEAL (The "Gentle Reveal")
    const observerOptions = {
        threshold: 0.2 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const reflectionSection = document.querySelector('.reflection');
    if (reflectionSection) {
        observer.observe(reflectionSection);
    }

    // 6. NAVIGATION (Keyboard & Swipe)
    const body = document.body;
    const prevUrl = body.getAttribute('data-prev');
    const nextUrl = body.getAttribute('data-next');

    // Helper: Go to URL if it exists
    const navigate = (url) => {
        if (url) {
            // Slight visual feedback before moving
            document.body.style.opacity = '0.5';
            document.body.style.transition = 'opacity 0.2s ease';
            setTimeout(() => {
                window.location.href = url;
            }, 100);
        }
    };

    // A. Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return; // Ignore if typing

        if (e.key === 'ArrowLeft' && prevUrl) {
            navigate(prevUrl);
        } else if (e.key === 'ArrowRight' && nextUrl) {
            navigate(nextUrl);
        }
    });

    // B. Touch Swipe Support
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50; 
        
        // Swipe Left (Go Next)
        if (touchStartX - touchEndX > swipeThreshold) {
            if (nextUrl) navigate(nextUrl);
        }
        
        // Swipe Right (Go Previous)
        if (touchEndX - touchStartX > swipeThreshold) {
            if (prevUrl) navigate(prevUrl);
        }
    }

});