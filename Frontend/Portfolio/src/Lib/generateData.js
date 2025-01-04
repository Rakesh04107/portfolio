const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const readingTime = require("reading-time");

// Define the directory where blog markdown files are stored
const dir = path.join(process.cwd(), "public/_contents");

// Define the output path for the blogs.json file
const outputFilePath = path.join(process.cwd(), "public", "blogs.json");

// Check if the directory exists
if (!fs.existsSync(dir)) {
  console.error(`Error: Directory ${dir} does not exist.`);
  process.exit(1); // Exit the script with an error
}

// Read all markdown files from the directory
const allFiles = fs.readdirSync(dir);

// Process each file to extract metadata and content
const allBlogs = allFiles
  .filter((file) => file.endsWith(".md")) // Process only markdown files
  .map((file) => {
    const filePath = path.join(dir, file); // Get the file's full path
    const fileContent = fs.readFileSync(filePath, "utf-8"); // Read the file content

    // Extract front matter and content using gray-matter
    const { data, content } = matter(fileContent);

    // Calculate the reading time for the content
    const readTime = readingTime(content);

    return {
      data,       // Front matter (metadata)
      content,    // Blog content
      readTime,   // Reading time for the blog post
    };
  });

// Write the processed blogs to blogs.json
fs.writeFileSync(outputFilePath, JSON.stringify(allBlogs, null, 2), "utf-8");
console.log("blogs.json has been generated successfully!");
