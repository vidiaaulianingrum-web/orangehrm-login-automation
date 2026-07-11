describe('OrangeHRM Login Automation', () => {

    beforeEach(() => {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
        cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
    })

    // TC_OHRM_001
    it('TC_OHRM_001 - Login menggunakan username dan password valid', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include', '/dashboard')

    })

    // TC_OHRM_002
    it('TC_OHRM_002 - Login dengan username salah', () => {

        cy.get('input[name="username"]').type('Admin123')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    // TC_OHRM_003
    it('TC_OHRM_003 - Login dengan password salah', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin12')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    // TC_OHRM_004
    it('TC_OHRM_004 - Login dengan username dan password salah', () => {

        cy.get('input[name="username"]').type('User')
        cy.get('input[name="password"]').type('Password')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    // TC_OHRM_005
    it('TC_OHRM_005 - Login tanpa username', () => {

        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    // TC_OHRM_006
    it('TC_OHRM_006 - Login tanpa password', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    // TC_OHRM_007
    it('TC_OHRM_007 - Login tanpa username dan password', () => {

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')

    })

    // TC_OHRM_008
    it('TC_OHRM_008 - Login menggunakan spasi pada username', () => {

        cy.get('input[name="username"]').type(' ')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    // TC_OHRM_009
    it('TC_OHRM_009 - Login menggunakan spasi pada password', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type(' ')
        cy.get('button[type="submit"]').click()

        cy.contains('Required').should('be.visible')

    })

    // TC_OHRM_010
    it('TC_OHRM_010 - Login dengan username yang tidak terdaftar', () => {

        cy.get('input[name="username"]').type('Admin999')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.contains('Invalid credentials').should('be.visible')

    })

    // TC_OHRM_011
    it('TC_OHRM_011 - Verifikasi tombol Login aktif', () => {

        cy.get('button[type="submit"]')
            .should('be.visible')
            .and('not.be.disabled')

    })

    // TC_OHRM_012
    it('TC_OHRM_012 - Logout setelah berhasil login', () => {

        cy.get('input[name="username"]').type('Admin')
        cy.get('input[name="password"]').type('admin123')
        cy.get('button[type="submit"]').click()

        cy.url().should('include','dashboard')

        cy.get('.oxd-userdropdown-name').click()

        cy.contains('Logout').click()

        cy.url().should('include','login')

    })

})