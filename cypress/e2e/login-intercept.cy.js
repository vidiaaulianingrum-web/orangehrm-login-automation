describe('OrangeHRM Login Automation - Using Intercept', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
    })

    // TC01
    it('TC_OHRM_001 - Login dengan username dan password valid', () => {

        cy.intercept('POST', '**/auth/validate').as('tc01Login')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@tc01Login')

        cy.url().should('include', '/dashboard')
    })

    // TC02
    it('TC_OHRM_002 - Login dengan username salah', () => {

        cy.intercept('POST', '**/auth/validate').as('tc02InvalidUser')

        cy.get('input[name="username"]').type('Admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@tc02InvalidUser')

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC03
    it('TC_OHRM_003 - Login dengan password salah', () => {

        cy.intercept('POST', '**/auth/validate').as('tc03InvalidPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin12')
        cy.get('button[type="submit"]').click()

        cy.wait('@tc03InvalidPassword')

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC04
    it('TC_OHRM_004 - Login dengan username dan password salah', () => {

        cy.intercept('POST', '**/auth/validate').as('tc04InvalidCredential')

        cy.get('input[name="username"]').type('User')
        cy.get('input[name="password"]').type('Password')
        cy.get('button[type="submit"]').click()

        cy.wait('@tc04InvalidCredential')

        cy.contains('Invalid credentials').should('be.visible')
    })

    // TC05
    it('TC_OHRM_005 - Login tanpa username', () => {

        cy.intercept('POST', '**/auth/validate').as('tc05NoUsername')

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC06
    it('TC_OHRM_006 - Login tanpa password', () => {

        cy.intercept('POST', '**/auth/validate').as('tc06NoPassword')

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC07
    it('TC_OHRM_007 - Login tanpa username dan password', () => {

        cy.intercept('POST', '**/auth/validate').as('tc07EmptyCredential')

        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')
    })

    // TC08
    it('TC_OHRM_008 - Logout setelah login berhasil', () => {

        cy.intercept('POST', '**/auth/validate').as('tc08Login')

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.wait('@tc08Login')

        cy.url().should('include', '/dashboard')

        cy.get('.oxd-userdropdown-name').click()
        cy.contains('Logout').click()

        cy.url().should('include', '/login')
    })

})