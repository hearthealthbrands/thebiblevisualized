document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Find the Share Button (we will add this to the HTML in a second)
    const shareBtn = document.getElementById('share-btn');
    
    // 2. Check if the browser supports native sharing (most mobiles do)
    if (shareBtn && navigator.share) {
        
        shareBtn.addEventListener('click', async () => {
            try {
                // This triggers the native iOS/Android share sheet
                await navigator.share({
                    title: document.title,
                    text: 'Check out this visualization of scripture:',
                    url: window.location.href
                });
                console.log('Shared successfully');
            } catch (err) {
                console.log('Error sharing:', err);
            }
        });
    } else if (shareBtn) {
        // Fallback for desktop browsers that don't support native share
        // We just copy the URL to the clipboard
        shareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        });
    }

/* --- EXISTING SHARE LOGIC IS ABOVE HERE --- */

    // 4. Copy Verse Logic
    const copyBtn = document.getElementById('copy-verse-btn');
    const verseTextElement = document.getElementById('daily-verse');

    if (copyBtn && verseTextElement) {
        copyBtn.addEventListener('click', async () => {
            try {
                // Get the text inside the blockquote
                const textToCopy = verseTextElement.innerText;
                
                // Use the Clipboard API
                await navigator.clipboard.writeText(textToCopy);
                
                // Visual Feedback: Change button text
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "Copied!";
                copyBtn.classList.add('copied-state'); // Optional: for CSS styling
                
                // Revert back after 2 seconds
                setTimeout(() => {
                    copyBtn.innerText = originalText;
                    copyBtn.classList.remove('copied-state');
                }, 2000);
                
            } catch (err) {
                console.error('Failed to copy!', err);
            }
        });
    }

    // 3. Dynamic Copyright Year (Automation!)
    const yearSpan = document.querySelector('#copyright-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});