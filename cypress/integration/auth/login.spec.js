describe('login page', () => {
  beforeEach(() => {
    cy.visit('https://middle-project-6ebe9.web.app/login');
  })

  it('should go to forgot password page', () => {
    cy.contains('Forgot your password?').click();
    cy.url().should('include', '/forgot-password')
  });

  it('should go to sign up page', () => {
    cy.contains('Sign Up').click();
    cy.url().should('include', '/register')
  });

  it('should enter email and password and login', () => {
    cy.get('#email')
      .type('test@gmail.com')
      .should('have.value', 'test@gmail.com');

    cy.get('#password')
      .type('qwerty12')
      .should('have.value', 'qwerty12');

    cy.get('.mat-button').contains('Sign in').click();
    cy.url().should('include', '/portal/dashboard');
  });
})
