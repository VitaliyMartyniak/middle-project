describe('sign-up page', () => {
  beforeEach(() => {
    cy.visit('https://middle-project-6ebe9.web.app/register');
  })

  it('should go to terms and conditions page', () => {
    cy.contains('Terms and Policy').click();
    cy.url().should('include', '/terms')
  });

  it('should go to login page', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');
  });

  it('should enter sign-up data and register new user', () => {
    cy.get('#name')
      .type('Name')
      .should('have.value', 'Name');

    cy.get('#age')
      .type('45')
      .should('have.value', '45');

    const email = `test${new Date().getTime()}@gmail.com`;

    cy.get('#email')
      .type(email)
      .should('have.value', email);

    cy.get('#password')
      .type('qwerty12')
      .should('have.value', 'qwerty12');

    cy.get('#confirm-password')
      .type('qwerty12')
      .should('have.value', 'qwerty12');

    cy.get('.terms')
      .click()
      .should('have.class', 'mat-checkbox-checked');

    cy.contains('Get started now').click();

    cy.url().should('include', '/portal/dashboard')
  });
})
