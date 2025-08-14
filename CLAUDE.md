# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based educational platform called "System Design Snacks" - an interactive learning journey application that teaches system design concepts through bite-sized, structured lessons.

## Architecture

**Multi-File Application**: The application consists of a main HTML file with external journey data files to enable modular content management.

**Core Components**:
- **Main Application**: `simple_learning_journey.html` contains the UI, styling, and core JavaScript logic
- **External Journey Data**: Individual `.js` files in the `journeys/` directory contain lesson content
- **Journey System**: Modular learning paths (currently "Database Sharding" and "Caching Strategies")
- **Lesson Structure**: Each lesson contains goals, content sections, exercises, and navigation
- **State Management**: Simple global state tracking current journey and lesson progress

**Key Data Structures**:
```javascript
// In journey files (e.g., journeys/database-sharding.js)
window.journeyData = window.journeyData || {};
window.journeyData['journey-id'] = {
  title, description, totalLessons, available,
  lessons: [{ id, title, duration, goals, content }]
};
```

**Content Types**:
- `.concept-section`: Educational content blocks
- `.exercise`: Interactive challenges and thought exercises  
- `.learning-goals`: Learning objectives for each lesson

## Development Workflow

**Testing**: Open `simple_learning_journey.html` in a web browser - no build process required.

**Adding New Content**:
1. Create a new `.js` file in the `journeys/` directory (e.g., `journeys/new-topic.js`)
2. Follow the established data structure with `window.journeyData['topic-id']` format
3. Include the new script in the HTML file's `<head>` section
4. Follow existing lesson structure with `goals` and `content` fields
5. Use established CSS classes for consistent styling
6. Add emoji mapping in `getJourneyEmoji()` function

**Content Guidelines**:
- Each lesson should be 10-15 minutes
- Include practical exercises and real-world scenarios
- Use progressive difficulty within journeys
- Maintain consistent HTML structure in lesson content

## Key Files

- `simple_learning_journey.html`: Main application (HTML/CSS/JavaScript logic)
- `journeys/`: Directory containing external journey data files
  - `database-sharding.js`: Database sharding lesson content
  - `caching-strategies.js`: Caching strategies lesson content  
- `CLAUDE.md`: This documentation file

## Styling System

The application uses embedded CSS with established classes:
- `.lesson-container`, `.lesson-header`: Layout structure
- `.concept-section`: Educational content blocks
- `.exercise`: Interactive challenges 
- `.learning-goals`: Learning objectives
- `.progress-dot`: Visual progress indicators
- `.nav-btn`: Navigation controls