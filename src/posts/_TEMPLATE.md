---
layout: layouts/base.njk
title: "Title of the Art"
date: 2025-11-24
image: "/images/FILENAME.jpg"
verse_ref: "Book Chapter:Verse"
verse_text: "Paste the scripture text here."
tags: ["post", "theme", "book"]
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
        <h3>Reflection</h3>
        <p>
            Write your thoughts on the visualization or the scripture here.
        </p>
    </div>
</div>