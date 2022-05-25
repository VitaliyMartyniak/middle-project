describe('forgot-password page', () => {
  beforeEach(() => {
    cy.visit('https://middle-project-6ebe9.web.app/forgot-password');
  })

  it('should go to login page', () => {
    cy.contains('Back To Login').click();
    cy.url().should('include', '/login')
  });

  it('should send forgot-password email and return on login page', () => {
    cy.get('#email')
      .type('test@gmail.com')
      .should('have.value', 'test@gmail.com');

    cy.get('.mat-button')
      .contains('Reset')
      .click();

    cy.get('.mat-simple-snackbar > span')
      .should('have.text', 'Request sent on your email!');

    cy.url()
      .should('include', '/login')

  });
})
