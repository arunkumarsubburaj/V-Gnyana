import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFinalScoresComponent } from './add-final-scores.component';

describe('AddFinalScoresComponent', () => {
  let component: AddFinalScoresComponent;
  let fixture: ComponentFixture<AddFinalScoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFinalScoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFinalScoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
