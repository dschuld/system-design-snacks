// Database Sharding Journey Data
window.journeyData = window.journeyData || {};
window.journeyData['database-sharding'] = {
  "title": "Database Sharding Mastery",
  "description": "3 lessons, ~10 min each",
  "totalLessons": 3,
  "available": true,
  "lessons": [
    {
      "id": 1,
      "title": "Why Do Databases Need Sharding?",
      "duration": 10,
      "goals": [
        "Understand the difference between vertical and horizontal scaling",
        "Identify when sharding becomes necessary",
        "Recognize the trade-offs of database sharding"
      ],
      "content": "<div class=\"concept-section\">\n<h3>The Database Growth Problem</h3>\n<p>Imagine you're building Instagram. You start with 1,000 users and a single PostgreSQL database. Everything works perfectly!</p>\n<p>But what happens when you reach:</p>\n<ul>\n<li><strong>1 million users:</strong> Database starts getting slower</li>\n<li><strong>10 million users:</strong> Timeouts during peak hours</li>\n<li><strong>100 million users:</strong> Single database can't handle the load</li>\n</ul>\n</div>\n\n<div class=\"concept-section\">\n<h3>Two Approaches to Scaling</h3>\n<p><strong>Vertical Scaling (Scale Up):</strong></p>\n<ul>\n<li>✅ Buy a bigger, more powerful server</li>\n<li>✅ Simple - no code changes needed</li>\n<li>❌ Eventually hits hardware limits</li>\n<li>❌ Very expensive for high-end servers</li>\n<li>❌ Single point of failure</li>\n</ul>\n\n<p><strong>Horizontal Scaling (Scale Out):</strong></p>\n<ul>\n<li>✅ Use multiple smaller servers working together</li>\n<li>✅ Nearly unlimited scaling potential</li>\n<li>✅ Better fault tolerance</li>\n<li>❌ Complex to implement</li>\n<li>❌ Data consistency challenges</li>\n</ul>\n</div>\n\n<div class=\"exercise\">\n<h3>🧠 Understanding Check</h3>\n<p><strong>Scenario:</strong> Your startup's user table has 50 million rows. Database queries take 5+ seconds during peak hours. Your server has 64GB RAM and 32 CPU cores.</p>\n<p><strong>Question:</strong> Would you try vertical or horizontal scaling first? Why?</p>\n<p><em>Think about this - we'll explore the solutions in the next lessons!</em></p>\n</div>"
    },
    {
      "id": 2,
      "title": "Range-Based Sharding Strategy",
      "duration": 10,
      "goals": [
        "Learn how range-based sharding works",
        "Understand the advantages and disadvantages",
        "Identify when to use range-based sharding"
      ],
      "content": "<div class=\"concept-section\">\n<h3>What is Range-Based Sharding?</h3>\n<p>Think of organizing books in a library:</p>\n<ul>\n<li>Shelf 1: Books A-F</li>\n<li>Shelf 2: Books G-M</li>\n<li>Shelf 3: Books N-Z</li>\n</ul>\n<p>Range-based sharding works the same way - we split data into continuous ranges.</p>\n</div>\n\n<div class=\"concept-section\">\n<h3>Example: User ID Sharding</h3>\n<p><strong>Shard 1:</strong> User IDs 1 - 10,000,000</p>\n<p><strong>Shard 2:</strong> User IDs 10,000,001 - 20,000,000</p>\n<p><strong>Shard 3:</strong> User IDs 20,000,001 - 30,000,000</p>\n\n<p>When your app needs to find user 15,555,555:</p>\n<ol>\n<li>Check: 15,555,555 > 10,000,000? Yes</li>\n<li>Check: 15,555,555 ≤ 20,000,000? Yes</li>\n<li>Route query to Shard 2</li>\n</ol>\n</div>\n\n<div class=\"concept-section\">\n<h3>Pros and Cons</h3>\n<p><strong>✅ Advantages:</strong></p>\n<ul>\n<li>Very simple to implement</li>\n<li>Range queries work efficiently</li>\n<li>Easy to add new shards</li>\n<li>Predictable data location</li>\n</ul>\n\n<p><strong>❌ The Big Problem: Hotspots!</strong></p>\n<ul>\n<li>New users get higher IDs</li>\n<li>All new user activity hits the last shard</li>\n<li>Uneven load distribution</li>\n<li>Some shards idle while others are overloaded</li>\n</ul>\n</div>\n\n<div class=\"exercise\">\n<h3>🛠️ Design Exercise</h3>\n<p><strong>Your task:</strong> You're designing sharding for a blog platform with 1 million posts.</p>\n<p><strong>Think about:</strong></p>\n<ul>\n<li>What field would you shard by? (post_id, user_id, creation_date?)</li>\n<li>How would you handle new posts?</li>\n<li>What queries would be fast vs slow?</li>\n</ul>\n<p><em>We'll learn a better approach in the next lesson!</em></p>\n</div>"
    },
    {
      "id": 3,
      "title": "Hash-Based Sharding Strategy",
      "duration": 12,
      "goals": [
        "Understand how hash-based sharding solves hotspot problems",
        "Learn the trade-offs between range-based and hash-based approaches",
        "Know when to choose each strategy"
      ],
      "content": "<div class=\"concept-section\">\n<h3>Solving the Hotspot Problem</h3>\n<p>Range-based sharding had a big issue: hotspots. Hash-based sharding solves this by distributing data pseudo-randomly.</p>\n<p>Instead of predictable ranges, we use a hash function to scatter data evenly across all shards.</p>\n</div>\n\n<div class=\"concept-section\">\n<h3>How Hash-Based Sharding Works</h3>\n<p><strong>Step 1:</strong> Take the user ID and run it through a hash function</p>\n<p><strong>Step 2:</strong> Use modulo to determine the shard</p>\n\n<p><strong>Example with 3 shards:</strong></p>\n<ul>\n<li>User ID 12345 → hash(12345) = 7891 → 7891 % 3 = 1 → Shard 1</li>\n<li>User ID 67890 → hash(67890) = 3456 → 3456 % 3 = 0 → Shard 0</li>\n<li>User ID 99999 → hash(99999) = 8765 → 8765 % 3 = 2 → Shard 2</li>\n</ul>\n\n<p>Result: Even distribution across all shards, no matter what the user IDs are!</p>\n</div>\n\n<div class=\"concept-section\">\n<h3>Comparison: Range vs Hash</h3>\n<p><strong>Range-Based Sharding:</strong></p>\n<ul>\n<li>✅ Range queries efficient (get all users 1000-2000)</li>\n<li>✅ Easy to understand and debug</li>\n<li>❌ Hotspot problems</li>\n<li>❌ Uneven distribution</li>\n<li><strong>Best for:</strong> Time-series data, archival systems</li>\n</ul>\n\n<p><strong>Hash-Based Sharding:</strong></p>\n<ul>\n<li>✅ Perfect even distribution</li>\n<li>✅ No hotspots</li>\n<li>❌ Range queries impossible</li>\n<li>❌ Adding/removing shards requires data migration</li>\n<li><strong>Best for:</strong> User data, high-traffic systems</li>\n</ul>\n</div>\n\n<div class=\"exercise\">\n<h3>🧮 Quick Math Practice</h3>\n<p>Calculate which shard these users belong to (with 4 shards):</p>\n<ul>\n<li>User 55555: hash(55555) = 12345 → Shard = ?</li>\n<li>User 99999: hash(99999) = 8765 → Shard = ?</li>\n</ul>\n<p><strong>Answers:</strong> 12345 % 4 = 1, 8765 % 4 = 1</p>\n<p>Both users end up on Shard 1 - that's just random chance with hashing!</p>\n</div>\n\n<div class=\"concept-section\">\n<h3>🎉 Congratulations!</h3>\n<p>You've completed Database Sharding fundamentals! You now understand:</p>\n<ul>\n<li>✅ When and why to use database sharding</li>\n<li>✅ Range-based vs hash-based strategies</li>\n<li>✅ Trade-offs and when to use each approach</li>\n</ul>\n<p><strong>Next steps:</strong> Practice designing sharding strategies for different scenarios, or explore advanced topics like consistent hashing!</p>\n</div>"
    }
  ]
};