import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVagasComponent } from './form-vagas.component';

describe('FormVagasComponent', () => {
  let component: FormVagasComponent;
  let fixture: ComponentFixture<FormVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormVagasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
