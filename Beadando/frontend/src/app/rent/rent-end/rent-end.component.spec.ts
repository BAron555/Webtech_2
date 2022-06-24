import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentEndComponent } from './rent-end.component';

describe('RentEndComponent', () => {
  let component: RentEndComponent;
  let fixture: ComponentFixture<RentEndComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentEndComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
