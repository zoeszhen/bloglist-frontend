import React from 'react'

const Creator = ({ isShow, onChangeIsShow, title, setTitle, author, setAuthor, url, setUrl, createNew }) => (
    isShow ? <div>
        <h2>Create New</h2>
        <form onSubmit={() => createNew({ author: author, url: url, title: title })}>
            <div>
                title
          <input
                    type="text"
                    id="title"
                    data-cy="create-title"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
          <input
                    type="author"
                    id="author"
                    data-cy="create-author"
                    value={author}
                    name="author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
          <input
                    type="url"
                    id="url"
                    value={url}
                    name="url"
                    data-cy="create-url"
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button data-cy="create-submit" type="submit">create</button>
        </form>
    </div> :
        <button data-cy="create-isshow" onClick={() => onChangeIsShow(true)}>Create</button>
)

export default Creator