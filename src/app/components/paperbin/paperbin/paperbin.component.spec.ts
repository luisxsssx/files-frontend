import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperbinComponent } from './paperbin.component';

describe('PaperbinComponent', () => {
  let component: PaperbinComponent;
  let fixture: ComponentFixture<PaperbinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperbinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperbinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
