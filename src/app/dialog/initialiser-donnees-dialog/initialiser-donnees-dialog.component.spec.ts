import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialiserDonneesDialogComponent } from './initialiser-donnees-dialog.component';

describe('InitialiserDonneesDialogComponent', () => {
  let component: InitialiserDonneesDialogComponent;
  let fixture: ComponentFixture<InitialiserDonneesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialiserDonneesDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialiserDonneesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
