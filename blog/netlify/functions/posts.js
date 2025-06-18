// netlify/functions/posts.js
const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
  try {
    // In production, you'd query a CMS or database
    const mockPosts = [
      {
        slug: "web-dev-kenya",
        title: "Web Development Trends in Kenya",
        date: "2023-11-15",
        excerpt: "Exploring the latest web technologies adopted by Kenyan businesses...",
        category: "Web Development",
        image: "/img/web-dev.jpg"
      }
    ];

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(mockPosts)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed fetching posts" })
    };
  }
};