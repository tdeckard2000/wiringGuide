import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeterDropdownItemComponent } from './meter-dropdown-item.component';

describe('MeterDropdownItemComponent', () => {
  let component: MeterDropdownItemComponent;
  let fixture: ComponentFixture<MeterDropdownItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeterDropdownItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeterDropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
