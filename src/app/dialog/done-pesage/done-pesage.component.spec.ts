import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonePesageComponent } from './done-pesage.component';

describe('DonePesageComponent', () => {
  let component: DonePesageComponent;
  let fixture: ComponentFixture<DonePesageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonePesageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DonePesageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
