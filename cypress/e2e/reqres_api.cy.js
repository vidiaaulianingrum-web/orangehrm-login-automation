describe('ReqRes API Automation', () => {

    const API_KEY = 'free_user_3GXBiEr944UIsfPGqqvIeVVY645'

    // TC01 - GET List Users
    it('TC01 - GET List Users', () => {
        cy.request({
            method: 'GET',
            url: '/users?page=2',
            headers: {
                'x-api-key': API_KEY
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.page).to.eq(2)
            expect(response.body.data).to.have.length(6)
        })
    })

    // TC02 - GET Single User
    it('TC02 - GET Single User', () => {
        cy.request({
            method: 'GET',
            url: '/users/2',
            headers: {
                'x-api-key': API_KEY
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
            expect(response.body.data.first_name).to.eq('Janet')
        })
    })

    // TC03 - GET User Not Found
    it('TC03 - GET User Not Found', () => {
        cy.request({
            method: 'GET',
            url: '/users/23',
            headers: {
                'x-api-key': API_KEY
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404)
            expect(response.body).to.deep.equal({})
        })
    })

    // TC04 - GET List Resource
    it('TC04 - GET List Resource', () => {
        cy.request({
            method: 'GET',
            url: '/unknown',
            headers: {
                'x-api-key': API_KEY
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.length).to.be.greaterThan(0)
        })
    })

    // TC05 - GET Single Resource
    it('TC05 - GET Single Resource', () => {
        cy.request({
            method: 'GET',
            url: '/unknown/2',
            headers: {
                'x-api-key': API_KEY
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.id).to.eq(2)
        })
    })

    // TC06 - POST Create User
    it('TC06 - POST Create User', () => {
        cy.request({
            method: 'POST',
            url: '/users',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                name: 'Vidia',
                job: 'QA Engineer'
            }
        }).then((response) => {
            expect(response.status).to.eq(201)
            expect(response.body.name).to.eq('Vidia')
            expect(response.body.job).to.eq('QA Engineer')
            expect(response.body.id).to.exist
        })
    })

    // TC07 - PUT Update User
    it('TC07 - PUT Update User', () => {
        cy.request({
            method: 'PUT',
            url: '/users/2',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                name: 'Vidia',
                job: 'Senior QA'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.job).to.eq('Senior QA')
        })
    })

    // TC08 - PATCH Update User
    it('TC08 - PATCH Update User', () => {
        cy.request({
            method: 'PATCH',
            url: '/users/2',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                job: 'Automation QA'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.job).to.eq('Automation QA')
        })
    })

    // TC09 - DELETE User
    it('TC09 - DELETE User', () => {
        cy.request({
            method: 'DELETE',
            url: '/users/2',
            headers: {
                'x-api-key': API_KEY
            }
        }).then((response) => {
            expect(response.status).to.eq(204)
            expect(response.body).to.be.empty
        })
    })

    // TC10 - Register Success
    it('TC10 - Register Success', () => {
        cy.request({
            method: 'POST',
            url: '/register',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'pistol'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.id).to.exist
            expect(response.body.token).to.exist
        })
    })

    // TC11 - Login Success
    it('TC11 - Login Success', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            headers: {
                'x-api-key': API_KEY
            },
            body: {
                email: 'eve.holt@reqres.in',
                password: 'cityslicka'
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.token).to.exist
        })
    })

    // TC12 - Login Failed
    it('TC12 - Login Failed', () => {
        cy.request({
            method: 'POST',
            url: '/login',
            headers: {
                'x-api-key': API_KEY
            },
            failOnStatusCode: false,
            body: {
                email: 'peter@klaven'
            }
        }).then((response) => {
            expect(response.status).to.eq(400)
            expect(response.body.error).to.eq('Missing password')
        })
    })

})