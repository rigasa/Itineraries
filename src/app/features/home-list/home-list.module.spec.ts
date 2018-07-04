import { HomeListModule } from './home-list.module';

describe('HomeListModule', () => {
  let homeListModule: HomeListModule;

  beforeEach(() => {
    homeListModule = new HomeListModule();
  });

  it('should create an instance', () => {
    expect(homeListModule).toBeTruthy();
  });
});
