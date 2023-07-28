export class homeComponent {
  constructor(renderHandler, templateFunction) {
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    let template = this.templateFunction(isUserLoggedIn, this.logoutHandler);
    this.renderHandler(template);
  }
}
