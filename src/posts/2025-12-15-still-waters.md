---
layout: layouts/base.njk
title: "Still Waters"
date: 2025-12-15
image: "/images/still-waters.jpg"
verse_ref: "Psalm 23:2-3"
verse_text: "He makes me lie down in green pastures, he leads me beside quiet waters, he refreshes my soul."
tags: ["post", "advent", "peace", "psalms", "comfort"]
---

<style>
    :root {
        --accent: #5D737E;       /* Muted Slate Blue */
        --accent-hover: #415058; /* Darker Slate */
    }
    
    /* Special styling for the interactive box */
    .interactive-box {
        background-color: #F0F4F6; /* Very light slate tint */
        border: 1px solid rgba(93, 115, 126, 0.2);
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        margin-top: 40px;
    }
</style>

<div class="verse-container">
    <img 
        src="{{ image }}" 
        alt="A perfectly still mountain lake reflecting the mountains in the mist."
        style="view-transition-name: img-{{ page.fileSlug }};"
    >
    
    <h1>{{ verse_ref }}</h1>
    
    <blockquote id="daily-verse">
        "{{ verse_text }}"
    </blockquote>

    <div class="action-buttons">
        <button id="copy-verse-btn" class="action-btn">Copy Verse</button>
    </div>
    
    <div id="dynamic-share-bar"></div>
    
    <div class="reflection">
        <h3>Week 2: Peace</h3>
        <p>
            There is a biological reason the Shepherd leads the sheep to "still" waters.
        </p>
        <p>
            Sheep are notoriously poor swimmers. Their heavy wool coats act like sponges; if they fall into rushing water, the weight of the water drags them down, and they drown. Because of this, sheep have an instinctive, paralyzing fear of moving water.
        </p>
        <p>
            They will not drink from a rushing stream, even if they are dying of thirst. The fear is too great.
        </p>
        <p>
            <strong>The Shepherd knows this.</strong>
        </p>
        <p>
            He doesn't just force them to drink; He changes the environment. He finds the quiet cove. He dams up the stream. He engineers a space where the chaos of the current is removed so that the fear can subside.
        </p>
        <p>
            Biblical Peace (<em>Shalom</em>) isn't just a feeling of relaxation. It is the restoration of the soul that happens when we trust the Shepherd to handle the current.
        </p>
        <p>
            If your life feels like a rushing river right now, look for the Shepherd. He is the only one who can lead you to the quiet place where you can finally drink.
        </p>

        <div class="interactive-box">
            <h3 style="color: var(--accent); margin-top: 0;">Send Peace to someone.</h3>
            <p style="font-size: 0.95rem; margin-bottom: 20px; color: #555;">
                Do you know someone whose life feels chaotic right now? Send them this visual reminder of the Still Waters.
            </p>
            <button onclick="sharePeace()" class="action-btn" style="background-color: var(--accent); color: white; border: none;">
                Send Peace 🕊️
            </button>
        </div>

    </div>
</div>

<script>
    function sharePeace() {
        const text = "I know things have been chaotic lately. I saw this image of 'Still Waters' and prayed for your peace today. The Shepherd has you. 🕊️ https://thebiblevisualized.com/posts/2025-12-15-still-waters/";
        
        if (navigator.share) {
            navigator.share({
                title: 'Peace to you',
                text: text,
                url: window.location.href
            }).catch(console.error);
        } else {
            // Fallback for desktop
            navigator.clipboard.writeText(text).then(() => {
                const btn = document.querySelector('.interactive-box button');
                const original = btn.innerText;
                btn.innerText = "Message Copied!";
                setTimeout(() => btn.innerText = original, 3000);
            });
        }
    }
</script>