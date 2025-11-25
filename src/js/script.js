document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SHARE BUTTON LOGIC (Footer)
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
                heart.innerText = ❤️"; 
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

    // 8. DYNAMIC SHARE BAR INJECTOR (Single Post)
    const sharePlaceholder = document.getElementById('dynamic-share-bar');
    
    if (sharePlaceholder) {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        // Find the Hero Image for Pinterest
        const heroImg = document.querySelector('.verse-container img');
        const media = heroImg ? encodeURIComponent(heroImg.src) : '';

        // SVG Icons
        const icons = {
            x: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"/></svg>`,
            fb: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>`,
            pin: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.199.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.852-2.433-4.587 0-3.728 2.705-7.149 7.833-7.149 4.105 0 7.292 2.934 7.292 6.852 0 4.089-2.578 7.38-6.16 7.38-1.205 0-2.344-.629-2.735-1.371 0 0-.599 2.289-.744 2.852-.271 1.026-1.002 2.302-1.492 3.111 1.118.327 2.298.502 3.523.502 6.627 0 12-5.368 12-11.987C24.017 5.367 18.647 0 12.017 0z"/></svg>`,
            link: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`
        };

        const html = `
            <div class="share-bar">
                <span class="share-label">Share:</span>
                <a href="https://twitter.com/intent/tweet?text=${title}&url=${url}" target="_blank" class="share-icon" aria-label="Share on X">${icons.x}</a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${url}" target="_blank" class="share-icon" aria-label="Share on Facebook">${icons.fb}</a>
                <a href="https://pinterest.com/pin/create/button/?url=${url}&media=${media}&description=${title}" target="_blank" class="share-icon" aria-label="Share on Pinterest">${icons.pin}</a>
                <button id="copy-link-btn" class="share-icon" aria-label="Copy Link">${icons.link}</button>
            </div>
        `;

        sharePlaceholder.innerHTML = html;

        // Logic for the Copy Link button
        document.getElementById('copy-link-btn').addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            // Visual feedback
            const btn = document.getElementById('copy-link-btn');
            const originalColor = btn.style.color;
            btn.style.color = 'var(--accent)';
            btn.style.borderColor = 'var(--accent)';
            setTimeout(() => {
                btn.style.color = originalColor;
                btn.style.borderColor = '';
            }, 1000);
        });
    }

});