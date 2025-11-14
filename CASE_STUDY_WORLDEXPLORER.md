# 🌍 Case Study: Building "WorldExplorer" - A GeoGuessr-Style Game

## Overview

**WorldExplorer** is a location-guessing game where players are shown panoramic street-view images from around the world and must guess the location on a map. The closer the guess to the actual location, the higher the score.

**Scale Requirements:**
- 1M daily active users globally
- 50K concurrent games during peak hours
- 100M location images across 195 countries
- Real-time multiplayer support (up to 5 players per game)
- Sub-second response times for game interactions
- 99.9% availability target

---

## Subtask 1: Authentication & User Management

**Learning Topics Applied:** *Authentication & Authorization, JWT, Token Management*

### Requirements:
- Users can sign up with email or via OAuth 2.0 (Google, Facebook)
- Session management for logged-in users across devices
- User profiles storing: statistics, game history, achievements, preferences
- Premium subscription tier with enhanced features

### Your Task:
1. **Design the authentication flow:**
   - Which OAuth 2.0 grant type would you use for:
     - Web application (React SPA)?
     - Native mobile apps (iOS/Android)?
     - Backend service-to-service communication?

2. **Token strategy:**
   - What would be your access token and refresh token expiration times?
   - Where would you store tokens on the client (web vs mobile)?
   - How would you implement the Backend-for-Frontend (BFF) pattern for the web app?

3. **Authorization design:**
   - How would you differentiate between free and premium users?
   - Design JWT claims structure for user identity and permissions
   - How would you handle session persistence across game rounds?

**Consider:** A user starts a game on mobile, then switches to desktop mid-game. How do you maintain their game state and authentication?

---

## Subtask 2: Image & Location Data Architecture

**Learning Topics Applied:** *Database Sharding, Caching Strategies, CDN*

### Requirements:
- 100M location records with metadata (coordinates, country, difficulty rating, image URLs)
- Each location has 6 panoramic images (N, S, E, W, Up, Down) averaging 2MB each
- Images must load quickly worldwide (<200ms)
- Location data queried by: country, difficulty, region, random selection
- Prevent the same location appearing multiple times in a single game

### Your Task:
1. **Database sharding strategy:**
   - How would you shard the location database? By geography? By location ID?
   - Design the schema for location metadata
   - How would you handle queries like "get random location in Europe with medium difficulty"?

2. **Caching architecture:**
   - Design a multi-tier caching strategy (CDN → App Cache → Database)
   - What would you cache and for how long?
   - How would you handle cache invalidation when location data is updated?
   - Which caching pattern (cache-aside, write-through, write-behind) for different data types?

3. **Image delivery:**
   - How would you distribute 100M images (1.2 petabytes) globally?
   - Design CDN strategy for low-latency image delivery
   - How would you handle different image qualities for varying bandwidth?

**Consider:** During a viral TikTok trend, 100K users simultaneously request images from the same popular location. How does your caching strategy handle this?

---

## Subtask 3: Real-Time Multiplayer Game Sessions

**Learning Topics Applied:** *Event-Driven Architecture, Load Balancing, WebSockets*

### Requirements:
- 2-5 players per game session
- Real-time updates when players make guesses
- Chat functionality during games
- 60-second timer per round (5 rounds total)
- Lobby system for matchmaking

### Your Task:
1. **Event-driven game architecture:**
   - Design the events for game lifecycle: `GameCreated`, `PlayerJoined`, `GuessSubmitted`, `RoundEnded`, `GameFinished`
   - Would you use event streaming or event sourcing for game state? Why?
   - How would you implement the game timer across distributed servers?

2. **WebSocket connection management:**
   - Design the WebSocket server architecture
   - How would you load balance WebSocket connections?
   - What happens if the WebSocket server crashes mid-game?
   - How would you handle reconnection scenarios?

3. **Game state consistency:**
   - Where would you store active game session state?
   - How would you ensure all players see consistent game state?
   - Design the flow when a player submits a guess (events, state updates, notifications)

**Consider:** A network partition splits a 5-player game into a 3-player group and a 2-player group. How would your system detect and handle this?

---

## Subtask 4: Scoring & Leaderboard System

**Learning Topics Applied:** *Eventual Consistency, CQRS, Distributed Transactions*

### Requirements:
- Score = 5000 × (1 - distance_km / 20000) for each round
- Global leaderboards (all-time, monthly, weekly, daily)
- Country-specific leaderboards
- Friend leaderboards
- Real-time score updates during multiplayer games
- Achievement system (e.g., "Perfect Score - 5000 points in a round")

### Your Task:
1. **Scoring calculation:**
   - Design the scoring service architecture
   - How would you calculate distance between guess and actual location efficiently?
   - How would you prevent score manipulation/cheating?

2. **Leaderboard design:**
   - Would you use strong consistency or eventual consistency for leaderboards? Why?
   - Design read models using CQRS for different leaderboard views
   - How would you handle the write-heavy workload of score updates?
   - Choose your database sharding strategy for leaderboard data

3. **Global leaderboard challenges:**
   - How would you update a global leaderboard with 1M users efficiently?
   - Design a caching strategy for leaderboard queries
   - What happens if two users finish with the same score simultaneously?

**Consider:** During a tournament with 50K concurrent players, scores are updating constantly. How do you balance real-time updates with system performance?

---

## Subtask 5: High Availability & Fault Tolerance

**Learning Topics Applied:** *CAP Theorem, Fault Tolerance, Saga Patterns, Circuit Breakers*

### Requirements:
- Multi-region deployment (US-East, US-West, EU, Asia)
- <1% data loss tolerance for completed games
- Graceful degradation during outages
- Self-healing for transient failures

### Your Task:
1. **CAP theorem trade-offs:**
   - For each data type below, would you choose CP or AP? Why?
     - User authentication sessions
     - Active game state
     - Historical game results
     - Leaderboards
     - Image metadata

2. **Distributed game transaction:**
   - Design a saga for the "complete game" flow:
     - Submit final guesses → Calculate scores → Update leaderboards → Update user stats → Award achievements
   - Would you use choreography or orchestration? Why?
   - Design compensation actions for each step

3. **Failure scenarios:**
   - What happens if the scoring service is down during a multiplayer game?
   - How would you handle a complete region failure (e.g., AWS US-East outage)?
   - Design your health check strategy for game servers
   - Implement circuit breaker pattern for the image delivery service

**Consider:** A database partition prevents score updates for 30 minutes. How do you ensure players' completed games are eventually recorded correctly?

---

## Subtask 6: Observability & Operational Excellence

**Learning Topics Applied:** *Monitoring, Debugging Distributed Systems*

### Requirements:
- Track key business metrics and system health
- Debug issues across distributed services
- Performance optimization based on real user data

### Your Task:
1. **Monitoring strategy:**
   - What metrics would you track for each component?
   - Design your alerting thresholds and escalation procedures
   - How would you implement distributed tracing for a single game session?

2. **Debugging tools:**
   - Design a system to replay a specific multiplayer game for debugging
   - How would you correlate logs across services for a single user's session?
   - Create a dashboard showing real-time system health

3. **Performance optimization:**
   - You notice the 95th percentile image load time is 800ms in Asia. How do you diagnose and fix?
   - Leaderboard queries are timing out during peak hours. What's your approach?

---

## Bonus Challenges 🎯

1. **Cheat Detection:** How would you detect players using reverse image search or GPS spoofing?

2. **Content Moderation:** Design a system to flag and remove inappropriate user-generated content (custom maps)

3. **Dynamic Difficulty:** Implement an algorithm that adjusts location difficulty based on player skill level

4. **Offline Mode:** Design a mobile app feature allowing single-player games with downloaded location packs

5. **Live Events:** Design a system for time-limited challenges with real-time global participation

---

## Expected Deliverables

For each subtask, provide:

1. **Architecture diagram** showing components and data flow
2. **Technology choices** with justification (databases, message queues, etc.)
3. **API design** for key endpoints/events
4. **Trade-off analysis** explaining your decisions
5. **Failure mode analysis** and mitigation strategies
6. **Scale calculations** proving your design can handle the stated requirements

---

## How to Approach This Case Study

This comprehensive case study integrates concepts from multiple system design domains you've studied:

- **Authentication & Authorization**: OAuth flows, JWT tokens, session management
- **Database Sharding**: Partitioning strategies for location and user data
- **Caching Strategies**: Multi-tier caching, CDN integration, cache invalidation
- **Load Balancing**: WebSocket connection distribution, global traffic routing
- **Fault Tolerance**: CAP theorem trade-offs, failure handling, recovery strategies
- **Event-Driven Architecture**: Real-time game events, saga patterns, CQRS

Work through each subtask systematically, applying the patterns and best practices from your learning journeys. Document your decisions and trade-offs clearly.

Good luck! 🚀
