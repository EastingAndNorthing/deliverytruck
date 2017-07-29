import { DeliverytruckPage } from './app.po';

describe('deliverytruck App', () => {
  let page: DeliverytruckPage;

  beforeEach(() => {
    page = new DeliverytruckPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
