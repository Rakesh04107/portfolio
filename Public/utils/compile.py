import os
import frontmatter
from datetime import datetime
import json
import random

# Define constants
METADATA_KEYS = {'title': True, 'author': True, 'id': False, 'headerImage': False, 'time': False}
BLOG_PATH = "Public/blogs/"
RAW_BLOG_PATH = "Public/raw_blogs/"
INDEX_FILE = "Public/raw_blogs/blogs.json"

# Custom exception for metadata validation
class MetadataValidationException(Exception):
    pass

# --- Utility Functions ---
def get_file_path(directory, file_name):
    """Returns the full path of a file in a directory."""
    return os.path.join(os.getcwd(), directory, file_name)

def create_directory(directory):
    """Ensures the target directory exists."""
    os.makedirs(directory, exist_ok=True)

def load_frontmatter(file_path):
    """Loads frontmatter from a markdown file."""
    return frontmatter.load(file_path)

def save_frontmatter(file_path, file_data):
    """Saves frontmatter to a markdown file."""
    with open(file_path, "w") as f:
        f.write(frontmatter.dumps(file_data))

# --- Metadata Handling ---
def add_missing_metadata(file_data, missing_key):
    """Adds missing metadata to the file."""
    if missing_key == "id":
        file_data[missing_key] = file_data["title"].replace(" ", "_").lower()
    elif missing_key == "headerImage":
        file_data[missing_key] = f"https://picsum.photos/{(lambda: random.randint(100, 999))()}"
    elif missing_key == "time":
        file_data[missing_key] = datetime.now().strftime("%d %m %Y")
    elif missing_key == "author":
        file_data[missing_key] = "Anurag Ranjan"
    elif missing_key == "title":
        first_line = file_data.content.splitlines()[0] if file_data.content else "Untitled Blog"
        file_data[missing_key] = first_line.strip("#").strip(" ")

def ensure_metadata_completeness(file_data):
    """Ensures all required metadata is present."""
    for key, required in METADATA_KEYS.items():
        if key not in file_data:
            # if required:
            #     raise MetadataValidationException(f"{key} is required in the blog")
            add_missing_metadata(file_data, key)

# --- File Processing ---
def process_blog_file(file_name):
    """Reads and processes a single blog file."""
    try:
        print(f"Processing file: {file_name}")
        input_path = get_file_path(BLOG_PATH, file_name)
        file_data = load_frontmatter(input_path)

        # Ensure metadata is complete
        ensure_metadata_completeness(file_data)

        # Write updated file to RAW_BLOG_PATH
        output_file_name = f"{file_data['id']}.md"
        output_path = get_file_path(RAW_BLOG_PATH, output_file_name)
        save_frontmatter(output_path, file_data)
        print(f"Saved processed file to: {output_path}")
    except MetadataValidationException as e:
        print(f"Metadata error in {file_name}: {e}")
    except Exception as e:
        print(f"Error processing file {file_name}: {e}")

def process_all_blog_files():
    """Processes all blog files in the BLOG_PATH directory."""
    try:
        blog_dir = get_file_path("", BLOG_PATH)
        create_directory(RAW_BLOG_PATH)  # Ensure RAW_BLOG_PATH exists
        all_files = [file for file in os.listdir(blog_dir) if file.endswith('.md')]
        print(f"Found blog files: {all_files}")

        for file_name in all_files:
            process_blog_file(file_name)
    except Exception as e:
        print(f"Error processing blog files: {e}")

# --- Metadata Indexing ---
def extract_metadata(file_name):
    """Extracts metadata from a blog file."""
    try:
        file_path = get_file_path(RAW_BLOG_PATH, file_name)
        file_data = load_frontmatter(file_path)
        return {key: file_data.get(key, None) for key in METADATA_KEYS}
    except Exception as e:
        print(f"Error extracting metadata from {file_name}: {e}")
        return None

def create_index_file():
    """Creates a JSON file containing metadata for all blogs."""
    try:
        raw_blog_dir = get_file_path("", RAW_BLOG_PATH)
        all_files = [file for file in os.listdir(raw_blog_dir) if file.endswith('.md')]
        print(f"Found processed blog files: {all_files}")

        blogs_metadata = []
        for file_name in all_files:
            metadata = extract_metadata(file_name)
            if metadata:
                blogs_metadata.append(metadata)

        # Save metadata to JSON index file
        index_file_path = get_file_path("", INDEX_FILE)
        with open(index_file_path, "w") as f:
            json.dump(blogs_metadata, f, indent=4)
        print(f"Blog index file created at: {index_file_path}")
    except Exception as e:
        print(f"Error creating index file: {e}")

# --- Main Execution ---
if __name__ == "__main__":
    process_all_blog_files()
    create_index_file()
