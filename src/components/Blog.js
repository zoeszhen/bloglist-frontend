import React, { useState, propTypes } from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, updateLike, removeBlog }) => {
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
          <>
            <div>
              {blog.author}
            </div>
            <div>
              likes: {blog.likes}
              <button onClick={() => { updateLike({ ...blog, likes: blog.likes + 1 }) }}>like</button>
            </div>
            <button onClick={() => removeBlog(blog)}>delete</button>
          </>
        }
      </div>
    )
  }
  return null
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog
