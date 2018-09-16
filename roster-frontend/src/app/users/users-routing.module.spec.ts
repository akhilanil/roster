import { UsersRoutingModule } from './users-routing.module';

describe('UsersRoutingModule', () => {
  let usersRoutingModule: UsersRoutingModule;

  beforeEach(() => {
    usersRoutingModule = new UsersRoutingModule();
  });

  it('should create an instance', () => {
    expect(usersRoutingModule).toBeTruthy();
  });
});
