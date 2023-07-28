export class NavComponent {
  constructor(authService, renderHandler, templateFunction, router) {
    this.authService = authService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.router = router;
    this.logoutHandler = this._logoutHandler.bind(this);
    this.showView = this._showView.bind(this);
  }

  async _showView(ctx, next) {
    let isUserLoggedIn = this.authService.isUserLoggedIn();
    let template = this.templateFunction(isUserLoggedIn, this.logoutHandler);
    this.renderHandler(template);
    next();
  }

  async _logoutHandler() {
    await this.authService.logout();
    // TODO: Have to change in to /dashboard.
    this.router.navigate("/");
  }
}
