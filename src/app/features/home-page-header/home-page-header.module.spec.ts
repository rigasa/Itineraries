import { HomePageHeaderModule } from './home-page-header.module';

describe('HomePageHeaderModule', () => {
  let homePageHeaderModule: HomePageHeaderModule;

  beforeEach(() => {
    homePageHeaderModule = new HomePageHeaderModule();
  });

  it('should create an instance', () => {
    expect(homePageHeaderModule).toBeTruthy();
  });
});
