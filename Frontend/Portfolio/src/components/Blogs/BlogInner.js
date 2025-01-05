import React from "react";
import { BsThreeDots } from "react-icons/bs";
import Toc from "./Toc";
import { MDXRemote } from "react-mdx-remote";

function BlogInner({ data, content, headings }) {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row justify-between px-6">
      {/* Main Content Section */}
      <div className="lg:w-3/4 rounded-lg shadow-lg bg-white dark:bg-gray-900 pb-8">
        {/* Header Image */}
        <img
          className="object-cover w-full h-72 rounded-t-lg"
          src={data.HeaderImage || "/default-blog-img.jpg"}
          alt="Blog Cover"
        />

        {/* Blog Content */}
        <div className="p-6">
          {/* Tags */}
          <div className="flex flex-wrap justify-center mb-4">
            {data.Tags.split(" ").map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 mr-2 mb-2 text-xs font-semibold tracking-wider text-gray-50 uppercase rounded-full bg-indigo-500 dark:bg-indigo-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-semibold text-center text-gray-800 dark:text-gray-100">
            {data.Title}
          </h1>

          {/* Divider */}
          <div className="text-center text-5xl py-2">
            <BsThreeDots />
          </div>

          {/* Blog Body */}
          <article className="prose dark:prose-dark max-w-none py-7 mx-auto">
            <MDXRemote {...content} />
          </article>

          {/* Author Section */}
          <div className="mt-6 text-center">
            <div className="text-5xl pb-2">
              <BsThreeDots />
            </div>
            <p className="text-2xl pb-2">Thanks for reading!!!</p>
            <p className="font-semibold text-gray-700 dark:text-gray-100">
              {data.Author}
            </p>
            <p className="text-sm font-medium leading-4 text-gray-600 dark:text-gray-200">
              Author
            </p>
          </div>
        </div>
      </div>

      {/* Table of Contents Section */}
      <div className="lg:w-1/4 lg:ml-6 mt-8 lg:mt-0">
        <div className="sticky top-20">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}

export default BlogInner;
