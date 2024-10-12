/// <reference types="cypress" />

describe('SauceDemo Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('Заполнение формы логина и авторизация', () => {
    cy.get('[data-test=username]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test=login-button]').click()
    cy.url().should('include', '/inventory.html')
  })

  it('Сортировка по цене и проверка цен, что отфильтровалось в зависимости от стратегии asc/desc', () => {
    // Логин
    cy.get('[data-test=username]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test=login-button]').click()

    // Сортировка по возрастанию цены
    cy.get('.product_sort_container').select('lohi')
    cy.wait(1000) // Добавлена задержка
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get()
      const sortedPrices = [...prices].sort((a, b) => a - b)
      expect(prices).to.deep.equal(sortedPrices)
    })

    // Сортировка по убыванию цены
    cy.get('.product_sort_container').select('hilo')
    cy.wait(1000) // Добавлена задержка
    cy.get('.inventory_item_price').then(($prices) => {
      const prices = $prices.map((index, html) => parseFloat(html.innerText.replace('$', ''))).get()
      const sortedPrices = [...prices].sort((a, b) => b - a)
      expect(prices).to.deep.equal(sortedPrices)
    })
  })

  it('Добавление двух товаров в корзину и создание заказа', () => {
    // Логин
    cy.get('[data-test=username]').type('standard_user')
    cy.get('[data-test=password]').type('secret_sauce')
    cy.get('[data-test=login-button]').click()

    // Добавление товаров в корзину
    cy.get('[data-test=add-to-cart-sauce-labs-backpack]').click()
    cy.get('[data-test=add-to-cart-sauce-labs-bike-light]').click()
    cy.get('.shopping_cart_link').click()
    
    // Проверка добавленных товаров
    cy.get('.cart_item').should('have.length', 2)

    // Оформление заказа
    cy.get('[data-test=checkout]').click()
    cy.get('[data-test=firstName]').type('Иван')
    cy.get('[data-test=lastName]').type('Иванов')
    cy.get('[data-test=postalCode]').type('123456')
    cy.get('[data-test=continue]').click()
    cy.get('[data-test=finish]').click()
    cy.get('.complete-header').should('have.text', 'Thank you for your order!')
  })
})


