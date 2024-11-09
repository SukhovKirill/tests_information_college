/// <reference types="cypress" />

describe('example to-do app', () => {

  beforeEach('Вход в сайт', () => {
    cy.visit('https://idemo.bspb.ru/')
    cy.get('#login-button').click()
    cy.get('#login-otp-button').click()
  })

  it('Вход', () => {
    cy.url().should('include', '/welcome')
  })
 
  it('Кредит', () => {
    cy.get('#loans-index').click()
    cy.get('#loan-application-btn').click()
    cy.url().should('include', 'loanapplications')
    cy.get('#credit-card-loan-apply').click()
    cy.get('.btn.btn-primary', { multiple: true }).click()
  })

  it('Перевод денег на другую карту', () => {
    cy.get('#cards-overview-index').click()
    cy.get('.span6', { multiple: true }).click()
    cy.get('.required.input-small.amount').type('1000')
    cy.get('.checkbox').click()
  })

  it('Открыть счёт', () => {
    cy.get('#confirm').click()
    cy.get('.btn.btn-primary', { multiple: true }).click()
    cy.get('#currencySelect').click()
    cy.get('#account-branch').click()
    cy.get('.checkbox').click()
    cy.get('#submit').click()
  })

  it('Вклад', () => {
    cy.get('#deposits-index').click()
    cy.get('#btn-show-rates').click()
    cy.get('.checkbox').click()
    cy.get('#submit').click()
  })
})

    // Проверка успешного оформления заказа
    cy.get('h1').should('contain', 'Thank you, your order has been placed.')
  })
})
