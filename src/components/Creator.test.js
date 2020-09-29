import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Creator from './Creator'


test.only('renders content', () => {
    // const component = render(
    //     <Creator isShow={true}
    //         onChangeIsShow={() => { }}
    //         title="test title"
    //         setTitle={() => { }}
    //         author="test author"
    //         setAuthor={() => { }}
    //         url="test url"
    //         setUrl={() => { }}
    //         createNew={() => { }} />
    // )
    // const author = component.container.querySelector('#author')
    // const title = component.container.querySelector('#title')
    // const url = component.container.querySelector('#url')
    // console.log("author", author.value)
    // // expect(title).toHaveTextContent('test title');
    // expect(author.value).toHaveTextContent('test author');
    // // expect(url).toHaveTextContent('test url');


    const createAuthor = jest.fn()

    const component = render(
        <Creator isShow={true}
            onChangeIsShow={() => { }}
            title="test title"
            setTitle={() => { }}
            author="test author"
            setAuthor={createAuthor}
            url="test url"
            setUrl={() => { }}
            createNew={createAuthor} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')

    fireEvent.change(author, {
        target: { value: 'test author' }
    })

    fireEvent.change(title, {
        target: { value: 'test title' }
    })
    fireEvent.change(url, {
        target: { value: 'test url' }
    })

    expect(author.value).toBe('test author')
    expect(title.value).toBe('test title')
    expect(url.value).toBe('test url')
})
