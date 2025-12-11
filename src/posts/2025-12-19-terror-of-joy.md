---
layout: layouts/base.njk
title: "The Terror of Joy"
date: 2025-12-19
image: "/images/shepherds.jpg"
verse_ref: "Luke 2:9"
verse_text: "An angel of the Lord appeared to them, and the glory of the Lord shone around them, and they were terrified."
tags: ["post", "advent", "joy", "luke", "shepherds"]
---

<!-- 
    ART DIRECTION: 
    Week 3 (Joy) uses a Deep Burnt Rose/Fire theme.
    This connects the "Pink Candle" tradition with the 
    intensity of the Angel's light.
-->
<style>
    :root {
        --accent: #D95D39;       /* Burnt Rose / Fire */
        --accent-hover: #B54223; /* Darker Ember */
    }
    
    /* Special styling for the interactive box */
    .interactive-box {
        background-color: #FFF8F6; /* Very light rose tint */
        border: 1px solid rgba(217, 93, 57, 0.3);
        padding: 30px;
        border-radius: 12px;
        text-align: center;
        margin-top: 40px;
    }
</style>

<div class="verse-container">
    <img 
        src="{{ image }}" 
        alt="A shepherd shielding his eyes as the night sky tears open with blinding angelic light."
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
        <h3>Week 3: Joy</h3>
        <p>
            We tend to associate "Joy" with softness—a gentle feeling of happiness. But in the Christmas story, Joy arrives with the force of a shockwave.
        </p>
        <p>
            When the angel appeared to the shepherds, the text does not say they were comforted. It says they were <em>"sore afraid"</em> (KJV) or <em>"terrified"</em> (NIV).
        </p>
        <p>
            <strong>Why? Because the glory of God is traumatic to the darkness.</strong>
        </p>
        <p>
            The shepherds were sitting in total obscurity, and suddenly, Heaven tore open. The "Good News of Great Joy" didn't feel safe; it felt like an invasion.
        </p>
        <p>
            This is the paradox of Advent Joy. It isn't the absence of intensity; it is the presence of God entering our reality. It shakes us. It wakes us up. It disrupts the status quo.
        </p>
        <p>
            The angel’s command—<em>"Do not be afraid"</em>—is the bridge. It acknowledges the terror while inviting them into the celebration. Joy is on the other side of the fear.
        </p>

        <!-- INTERACTIVE ELEMENT -->
        <div class="interactive-box">
            <h3 style="color: var(--accent); margin-top: 0;">Share the Good News</h3>
            <p style="font-size: 0.95rem; margin-bottom: 20px; color: #555;">
                Real joy is contagious. Who needs to hear "Good News" today?
            </p>
            <button onclick="shareJoy()" class="action-btn" style="background-color: var(--accent); color: white; border: none;">
                Share Joy 🕊️
            </button>
        </div>

    </div>
</div>

<script>
    function shareJoy() {
        const text = "I'm thinking of you this week. Just wanted to remind you that even in the chaos, there is 'Good News of Great Joy' available to you. 🕊️ https://thebiblevisualized.com/posts/2025-12-19-terror-of-joy/";
        
        if (navigator.share) {
            navigator.share({
                title: 'Great Joy',
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