import LoginPage from '../../pages/LoginPage'

const login = new LoginPage()

describe('Login OrangeHRM With POM', () => {

  beforeEach(() => {
    login.visit()
  })

  // TC01 - Login Berhasil
  it('TC01 - Login Berhasil', () => {

    login.login('Admin', 'admin123')

    cy.url().should('include', '/dashboard')

  })

  // TC02 - Password Salah
  it('TC02 - Password Salah', () => {

  login.login('Admin', 'admin321')

  cy.get('.oxd-alert-content-text')
    .should('be.visible')
    .and('contain.text', 'Invalid credentials')

  })

  // TC03 - Username Salah
  it('TC03 - Username Salah', () => {

    login.login('Admin123', 'admin123')

    cy.contains('Invalid credentials').should('be.visible')

  })

  // TC04 - Username Kosong
  it('TC04 - Username Kosong', () => {

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')

  })

  // TC05 - Password Kosong
  it('TC05 - Password Kosong', () => {

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')

  })

  // TC06 - Username dan Password Kosong
  it('TC06 - Username dan Password Kosong', () => {

    cy.get('button[type="submit"]').click()

    cy.contains('Required').should('be.visible')

  })

  // TC07 - Username Spasi
  it('TC07 - Username Spasi', () => {

    login.login(' ', 'admin123')

    cy.contains('Required').should('be.visible')

  })

  // TC08 - Password Kurang 1 Karakter
  it('TC08 - Password Kurang 1 Karakter', () => {

  login.login('Admin', 'admin12')

  cy.contains('Invalid credentials').should('be.visible')

  })

  // TC09 - Username Salah 2
it('TC09 - Username Salah 2', () => {

  login.login('Administrator', 'admin123')

  cy.contains('Invalid credentials').should('be.visible')

})

  // TC10 - Username Salah
it('TC10 - Username Salah', () => {

  login.login('Administrator', 'admin123')

  cy.contains('Invalid credentials').should('be.visible')

  })

  // TC11 - Password Huruf Besar
  it('TC11 - Password Huruf Besar', () => {

    login.login('Admin', 'ADMIN123')

    cy.contains('Invalid credentials').should('be.visible')

  })

})
