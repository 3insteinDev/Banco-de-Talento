import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVagasComponent } from './view-vagas.component';

describe('ViewVagasComponent', () => {
  let component: ViewVagasComponent;
  let fixture: ComponentFixture<ViewVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewVagasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
