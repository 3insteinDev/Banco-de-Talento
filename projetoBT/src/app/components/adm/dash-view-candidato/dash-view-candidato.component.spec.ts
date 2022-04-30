import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashViewCandidatoComponent } from './dash-view-candidato.component';

describe('DashViewCandidatoComponent', () => {
  let component: DashViewCandidatoComponent;
  let fixture: ComponentFixture<DashViewCandidatoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashViewCandidatoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashViewCandidatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
