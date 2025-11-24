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

    // 3. COPY VERSE LOGIC
    const copyBtn = document.getElementById('copy-verse-btn');
    const verseTextElement = document.getElementById('daily-verse');

    if (copyBtn && verseTextElement) {
        copyBtn.addEventListener('click', async () => {
            try {
                const textToCopy = verseTextElement.innerText;
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual Feedback
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                copyBtn.classList.add('copied-state');
                
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
    // Selects both gallery thumbnails and the main hero image
    const images = document.querySelectorAll('.image-wrapper img, .verse-container img');

    images.forEach(img => {
        const reveal = () => {
            img.classList.add('loaded');
        };

        // If the image is already cached (instant load), reveal it immediately
        if (img.complete) {
            reveal();
        } else {
            // Otherwise wait for the download to finish
            img.addEventListener('load', reveal);
        }
    });

});