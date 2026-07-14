class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

    // Tunggu sampai halaman login tampil
    cy.get('input[name="username"]', { timeout: 10000 }).should('be.visible')
  }

  login(username, password) {

    if (username !== '') {
      cy.get('input[name="username"]').clear().type(username)
    }

    if (password !== '') {
      cy.get('input[name="password"]').clear().type(password)
    }

    cy.get('button[type="submit"]').click()

  }

}

export default LoginPage