import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyUnitComponent } from './my-unit.component';

describe('MyUnitComponent', () => {
  let component: MyUnitComponent;
  let fixture: ComponentFixture<MyUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
