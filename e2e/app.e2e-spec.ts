import { Ng2MemoryGamePage } from './app.po';

describe('ng2-memory-game App', function() {
  let page: Ng2MemoryGamePage;

  beforeEach(() => {
    page = new Ng2MemoryGamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
