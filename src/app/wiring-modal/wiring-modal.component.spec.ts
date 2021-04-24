import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WiringModalComponent } from './wiring-modal.component';

describe('WiringModalComponent', () => {
  let component: WiringModalComponent;
  let fixture: ComponentFixture<WiringModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WiringModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WiringModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
