import React from "react";

const blogPosts = [
  {
    title: "Welcome to Our Blog!",
    date: "2026-04-19",
    excerpt: "Discover the latest stories, tips, and behind-the-scenes from Double Take Films.",
    slug: "welcome-to-our-blog"
  },
  // Add more posts here
];

export default function Blog() {
  return (
    <section className="py-24 md:py-32 bg-brand-light-gray min-h-[60vh]">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-4xl font-serif mb-8 text-brand-black">Blog</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
              <h3 className="text-2xl font-serif mb-2 text-brand-blue">{post.title}</h3>
              <p className="text-sm text-brand-gray mb-2">{post.date}</p>
              <p className="mb-4 text-brand-gray">{post.excerpt}</p>
              <a href={`#/blog/${post.slug}`} className="text-brand-blue hover:underline font-medium">Read More</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
