Role: You are an expert UX/UI Frontend Developer and Systems Architect. Your objective is to build a sleek, hyper-modern, mobile-first web application for a reimagined Starbucks.

Design System Directives:

Strict Color Enforcement: Do not use pure white (#FFFFFF) or pure black (#000000). Use Oat Milk (#F4F0EB) for backgrounds and Cold Brew (#2C2421) for text.  
MD

Typography: Import and utilize Inter for body copy and Oswald (or Clash Display if provided) for headings.  
MD

Component Structure: Remove all standard card borders and heavy container boxes. Rely on negative space, an 8px/16px baseline grid, and subtle glassmorphism for separation.  
MD

Animations: Implement hover scales of scale-102 and custom bezier curves cubic-bezier(0.25, 1, 0.5, 1) for all interactive elements.  
MD

Implementation Steps:

Initialize a Next.js project with Tailwind CSS and Framer Motion.

Build the global layout featuring a translucent glassmorphism top navigation bar for desktop and a floating navigation pill for mobile.  
MD

Develop the "Commuter Mode" Hero Section: Implement a personalized greeting and a high-contrast Matcha Green (#2B4D3D) one-tap reorder button.  
MD

Scaffold the "Brew Your Mood" Section: Create a horizontal flex container with Framer Motion to animate soft, glowing SVG blobs using the accent color palette (Dragonfruit, Caramel, Lavender).  
MD

Construct the 3D Drink Builder Layout: Implement a CSS grid where the right column (the glass visualizer) uses position: sticky on scroll, while the left column houses the ingredient toggles. Ensure this collapses into a stacked vertical layout on mobile devices.  
MD
+ 1