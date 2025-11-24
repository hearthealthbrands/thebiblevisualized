---
layout: layouts/base.njk
title: "Strength for the Weary"
date: 2025-11-24
image: "/images/2025-11-24-isaiah40.jpg"
verse_ref: "Isaiah 40:29"
verse_text: "[The Lord] gives strength to the weary and increases the power of the weak."
tags: ["post", "strength", "hope", "isaiah"]
---

<div class="verse-container">
    <img 
        src="{{ image }}" 
        alt="AI Visualization of {{ verse_ref }}"
        style="view-transition-name: img-{{ page.fileSlug }};"
    >
    
    <h1>{{ verse_ref }}</h1>
    
    <blockquote id="daily-verse">
        "{{ verse_text }}"
    </blockquote>

    <div class="action-buttons">
        <button id="copy-verse-btn" class="action-btn">Copy Verse</button>
    </div>
    
    <div class="reflection">
        <h3>Morning Reflection</h3>
        <p>
            Here is where you write your reflection...
        </p>
        <p>
            It helps to write 2-3 short paragraphs to help with SEO and give the user something to meditate on while looking at the art.
        </p>
    </div>
</div>