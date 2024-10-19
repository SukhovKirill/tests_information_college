/// <reference types="cypress" />

describe('Advanced Amazon functionality tests', () => {
  beforeEach(() => {
    cy.visit('https://www.amazon.com') // Посещение сайта Amazon
  })

  it('.login() - log into Amazon account', () => {
    cy.get('#nav-link-accountList-nav-line-1').click() // Клик по ссылке входа
    cy.get('input[name="email"]').type('your-email@example.com')
    cy.get('input[name="password"]').type('your-password')
    cy.get('#signInSubmit').click() // Подтверждение входа
    cy.get('#nav-link-accountList-nav-line-1').should('contain', 'Account & Lists') // Проверка успешного входа
  })

  it('.viewProfile() - view and edit user profile', () => {
    cy.get('#nav-link-accountList-nav-line-1').click() // Клик по ссылке профиля
    cy.get('a').contains('Your Account').click()
    cy.url().should('include', 'gp/css/homepage.html') // Проверка URL страницы профиля
    cy.get('a').contains('Login & security').click()
    cy.url().should('include', 'ap/cnep?_encoding') // Проверка URL страницы редактирования
    cy.get('input[name="email"]').should('have.value', 'your-email@example.com')
    // Для безопасности внесение изменений опущено
  })

  it('.addMultipleItemsToCart() - add multiple items to the cart and verify', () => {
    cy.get('#twotabsearchtextbox').type('laptop{enter}')
    cy.get('.s-main-slot .s-result-item').first().find('span[data-component-type="s-product-image"] a').click()
    cy.get('#add-to-cart-button').click() // Добавление первого товара в корзину
    cy.wait(1000)
    cy.get('#twotabsearchtextbox').type('mouse{enter}')
    cy.get('.s-main-slot .s-result-item').first().find('span[data-component-type="s-product-image"] a').click()
    cy.get('#add-to-cart-button').click() // Добавление второго товара в корзину
    cy.get('.nav-cart-count').should('have.text', '2') // Проверка количества товаров в корзине
  })

  it('.navigateAndSort() - navigate to a category and sort products', () => {
    cy.get('#nav-hamburger-menu').click() // Открытие меню
    cy.get('.hmenu-visible a').contains('Electronics').click() // Переход в категорию
    cy.get('a').contains('Headphones').click() // Переход в подкатегорию
    cy.url().should('include', 'electronics-accessories') // Проверка URL
    cy.get('span.a-dropdown-label').contains('Sort by').click()
    cy.get('a').contains('Price: High to Low').click() // Сортировка по цене
    cy.wait(2000) // Ожидание применения сортировки
    cy.get('.s-main-slot .s-result-item').first().find('.a-price-whole').invoke('text').then(parseFloat).should('be.above', 100) // Проверка цены
  })

  it('.placeOrder() - complete a purchase', () => {
    cy.get('#twotabsearchtextbox').type('Echo Dot{enter}')
    cy.get('.s-main-slot .s-result-item').first().find('span[data-component-type="s-product-image"] a').click()
    cy.get('#add-to-cart-button').click() // Добавление товара в корзину
    cy.get('.nav-cart-icon').click() // Переход в корзину
    cy.get('input[name="proceedToRetailCheckout"]').click() // Переход к оформлению заказа

    // Авторизация пользователя (если не выполнена)
    cy.get('input[name="email"]').type('your-email@example.com')
    cy.get('input[name="password"]').type('your-password')
    cy.get('input#signInSubmit').click()

    // Проверка и подтверждение адреса доставки
    cy.get('input.a-button-input').contains('Use this address').click()

    // Выбор способа оплаты и оформление заказа
    cy.get('input.a-button-input').contains('Use this payment method').click()
    cy.get('input.a-button-input').contains('Place your order').click()

    // Проверка успешного оформления заказа
    cy.get('h1').should('contain', 'Thank you, your order has been placed.')
  })
})
