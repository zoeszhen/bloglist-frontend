import React from 'react'
const Blog = ({ blog }) => {
  console.log("blog", blog)
  if (blog) {
    return < div >
      {blog.title} {blog.author}
    </div >
  }
  return null
}

export default Blog
