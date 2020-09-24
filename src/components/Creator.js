import React from 'react'

const Creator = ({ isShow, onChangeIsShow, title, setTitle, author, setAuthor, url, setUrl, createNew }) => (
    isShow ? <div>
        <h2>Create New</h2>
        <form onSubmit={createNew}>
            <div>
                title
          <input
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
          <input
                    type="author"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
          <input
                    type="url"
                    value={url}
                    name="url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">create</button>
        </form>
    </div> :
        <button onClick={() => onChangeIsShow(true)}>Create</button>
)

export default Creator