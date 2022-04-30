import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashCandidatosComponent } from './dash-candidatos.component';

describe('DashCandidatosComponent', () => {
  let component: DashCandidatosComponent;
  let fixture: ComponentFixture<DashCandidatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashCandidatosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashCandidatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
