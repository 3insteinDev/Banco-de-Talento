import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCurriculoComponent } from './form-curriculo.component';

describe('FormCurriculoComponent', () => {
  let component: FormCurriculoComponent;
  let fixture: ComponentFixture<FormCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCurriculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
