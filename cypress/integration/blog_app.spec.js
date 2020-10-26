describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: "test",
            name: "test",
            password: "test"
        }
        cy.request('POST', 'http://localhost:3001/api/user/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('[data-cy=loginTitle]').should('contain', 'Log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            const user = {
                username: "test username2",
                name: "tester",
                password: "testPassword"
            }
            cy.get('[data-cy=username]').type('test username2')
            cy.get('[data-cy=password]').type('testPassword')
            cy.get('[data-cy=login-button]').click()
        })

        it('fails with wrong credentials', function () {
            cy.get('[data-cy=username]').type('wrong')
            cy.get('[data-cy=password]').type('testPassword')
            cy.get('[data-cy=login-button]').click()
            cy.get('[data-cy=message]').should('contain', 'invalid username or password')
        })
    })
})