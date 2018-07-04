import { HomeMapModule } from './home-map.module';

describe('HomeMapModule', () => {
  let homeMapModule: HomeMapModule;

  beforeEach(() => {
    homeMapModule = new HomeMapModule();
  });

  it('should create an instance', () => {
    expect(homeMapModule).toBeTruthy();
  });
});
