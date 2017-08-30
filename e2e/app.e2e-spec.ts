import { Step1Page } from './app.po';

describe('step1 App', () => {
  let page: Step1Page;

  beforeEach(() => {
    page = new Step1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
