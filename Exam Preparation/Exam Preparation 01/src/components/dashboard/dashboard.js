export class DashboardComponent {
  constructor(shoeService, renderHandler, templateFunction) {
    this.shoeService = shoeService;
    this.renderHandler = renderHandler;
    this.templateFunction = templateFunction;
    this.showView = this._showView.bind(this);
  }

  async _showView() {
    let shoes = await this.shoeService.getAll();
    let template = this.templateFunction(shoes);
    this.renderHandler(template);
  }
}
