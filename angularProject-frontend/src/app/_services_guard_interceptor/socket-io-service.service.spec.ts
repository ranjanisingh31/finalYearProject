import { TestBed } from '@angular/core/testing';

import { SocketIoServiceService } from './socket-io-service.service';

describe('SocketIoServiceService', () => {
  let service: SocketIoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketIoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
