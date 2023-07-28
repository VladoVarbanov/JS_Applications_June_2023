export class LoginComponent {
  constructor(authService, renderHandler, templateFunction, router) {
    this.authService = authService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.loginHandler = this._loginHandler.bind(this);
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    let template = this.templateFunction(this.loginHandler);
    this.renderHandler(template);
  }

  async _loginHandler(e) {
    e.preventDefault();
    await this.authService.logout();
    // TODO: Have to change in to /dashboard.
    this.router.navigate("/");
  }
}
