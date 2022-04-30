import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashVagasComponent } from './dash-vagas.component';

describe('DashVagasComponent', () => {
  let component: DashVagasComponent;
  let fixture: ComponentFixture<DashVagasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashVagasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashVagasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
