# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a web-based educational platform called "System Design Snacks" - an interactive learning journey application that teaches system design concepts through bite-sized, structured lessons.

## Architecture

**Single-File Application**: The entire application is contained in `simple_learning_journey.html` - a self-contained HTML file with embedded CSS and JavaScript.

**Core Components**:
- **Content Management**: All lesson content is embedded in the `contentSources` object within the JavaScript
- **Journey System**: Modular learning paths (currently "Database Sharding" and "Caching Strategies")
- **Lesson Structure**: Each lesson contains goals, content sections, exercises, and navigation
- **State Management**: Simple global state tracking current journey and lesson progress

**Key Data Structures**:
```javascript
contentSources = {
  "journey-id": {
    title, description, totalLessons, available,
    lessons: [{ id, title, duration, goals, content }]
  }
}
```

**Content Types**:
- `.concept-section`: Educational content blocks
- `.exercise`: Interactive challenges and thought exercises  
- `.learning-goals`: Learning objectives for each lesson

## Development Workflow

**Testing**: Open `simple_learning_journey.html` in a web browser - no build process required.

**Adding New Content**:
1. Add new journey to `contentSources` object
2. Follow existing lesson structure with `goals` and `content` fields
3. Use established CSS classes for consistent styling
4. Add emoji mapping in `getJourneyEmoji()` function

**Content Guidelines**:
- Each lesson should be 10-15 minutes
- Include practical exercises and real-world scenarios
- Use progressive difficulty within journeys
- Maintain consistent HTML structure in lesson content

## Key Files

- `simple_learning_journey.html`: Complete application (HTML/CSS/JavaScript)
- `CLAUDE.md`: This documentation file

## Styling System

The application uses embedded CSS with established classes:
- `.lesson-container`, `.lesson-header`: Layout structure
- `.concept-section`: Educational content blocks
- `.exercise`: Interactive challenges 
- `.learning-goals`: Learning objectives
- `.progress-dot`: Visual progress indicators
- `.nav-btn`: Navigation controls