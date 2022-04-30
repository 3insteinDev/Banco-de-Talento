import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCurriculoComponent } from './list-curriculo.component';

describe('ListCurriculoComponent', () => {
  let component: ListCurriculoComponent;
  let fixture: ComponentFixture<ListCurriculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCurriculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCurriculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
