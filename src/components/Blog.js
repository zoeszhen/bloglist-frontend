import React, { useState, useEffect } from 'react'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }


  const [isOpen, setIsOpen] = useState(false)
  console.log("blog", blog)
  if (blog) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <button onClick={() => setIsOpen((prevState) => !prevState)}>
            {isOpen ? "hide" : "view"}
          </button>
        </div>
        {isOpen &&
          <div>
            {blog.author}
          </div>
        }
      </div>
    )
  }
  return null
}

export default Blog
