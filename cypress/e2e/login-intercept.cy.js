describe('OrangeHRM Login Automation - Intercept', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]').should('be.visible')
    })

    // TC01 - POST
    it('TC01 - Login valid', () => {

        cy.intercept('POST', '**/auth/validate').as('loginPost')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@loginPost')

        cy.url().should('include','dashboard')
    })

    // TC02 - GET
    it('TC02 - Username salah', () => {

        cy.intercept('GET', '**/core/i18n/messages').as('getMessage')

        cy.get('input[name="username"]').type('Admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC03 - Wildcard
    it('TC03 - Password salah', () => {

        cy.intercept('POST','**/auth/*').as('wildcardLogin')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin12')
        cy.get('button[type="submit"]').click()

        cy.wait('@wildcardLogin')

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC04 - Semua Method
    it('TC04 - Username dan Password salah', () => {

        cy.intercept('**/auth/validate').as('allMethod')

        cy.get('input[name="username"]').type('User')
        cy.get('input[name="password"]').type('Password')
        cy.get('button[type="submit"]').click()

        cy.wait('@allMethod')

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC05 - Regex
    it('TC05 - Tanpa Username', () => {

        cy.intercept(/auth\/validate/).as('regexIntercept')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC06 - GET Wildcard
    it('TC06 - Tanpa Password', () => {

        cy.intercept('GET','**/core/**').as('coreWildcard')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC07 - Semua Request Login
    it('TC07 - Tanpa Username dan Password', () => {

        cy.intercept('**/auth/**').as('allAuth')

        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC08 - Logout
    it('TC08 - Logout', () => {

        cy.intercept('POST','**/auth/validate').as('logoutLogin')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@logoutLogin')

        cy.get('.oxd-userdropdown-name').click()
        cy.contains('Logout').click()

        cy.url().should('include','login')
    })

})