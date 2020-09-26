import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Creator from './components/Creator'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const messagePositive = {
  color: 'green',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const messageNegative = {
  color: 'red',
  background: 'lightgrey',
  fontSize: 20,
  borderStyle: 'solid',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
};

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isShow, setIsShow] = useState(false)
  const [message, setMessage] = useState({ message: "", style: messagePositive })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      blogService.getAll().then(blogs => {
        console.log("blogs", blogs)
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
      }
      )
    }
  }, [])

  const handleLogin = async (event) => {

    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      blogService.getAll().then(blogs =>
        setBlogs(blogs)
      )
    } catch (exception) {
      setMessage({ message: exception.message, style: messageNegative })
      setTimeout(() => {
        setMessage({ message: "", style: messageNegative })
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )


  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload();
  }

  const removeBlog = ({ id, title }) => {
    if (window.confirm(`Do you really want delete ${title}`)) {
      blogService.delete(id)
        .then((blogs) => {
          setBlogs(blogs.sort((a, b) => b.likes - a.likes))
        })
        .error((error) => {
          setMessage({ message: error.message, style: messageNegative })
          setTimeout(() => {
            setMessage({ message: "", style: messageNegative })
          }, 5000)
        })
    }

  }

  const createNew = (newItem) => {
    blogService
      .create(newItem)
      .then(() => {
        setMessage({ message: `a new blog ${title} by ${author} added`, style: messageNegative })
      })
      .catch((error) => {
        setMessage({
          message: `error: ${error.message}`,
          style: messageNegative
        })
      })
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <Notification message={message.message} messageStyle={message.style}></Notification>
      <h2>blogs</h2>
      <div>You have been logged in
        <button onClick={() => { logout() }}>
          logout
        </button>
      </div>
      <Creator title={title}
        setUrl={setUrl}
        setTitle={setTitle}
        url={url}
        author={author}
        setAuthor={setAuthor}
        createNew={createNew}
        onChangeIsShow={setIsShow}
        isShow={isShow}
      />
      {
        blogs.map(blog => <Blog key={blog.id} blog={blog} updateLike={createNew} removeBlog={removeBlog} />)
      }
    </div >
  )
}

export default App