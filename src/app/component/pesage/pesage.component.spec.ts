import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesageComponent } from './pesage.component';

describe('PesageComponent', () => {
  let component: PesageComponent;
  let fixture: ComponentFixture<PesageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PesageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
