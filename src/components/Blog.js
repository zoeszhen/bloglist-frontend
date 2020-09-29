import React, { useState } from 'react'
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
  if (blog) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title}
          <div>
            {blog.author}
          </div>
          <button onClick={() => setIsOpen((prevState) => !prevState)}>
            {isOpen ? "hide" : "view"}
          </button>
        </div>
        {isOpen &&
          <>
            {blog.likes && <div>
              likes: {blog.likes}
              <button onClick={() => { updateLike({ ...blog, likes: blog.likes + 1 }) }}>like</button>
            </div>}
            {blog.url && <div>
              url: {blog.url}
            </div>}
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
