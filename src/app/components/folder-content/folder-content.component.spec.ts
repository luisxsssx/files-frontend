import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FolderContentComponent } from './folder-content.component';

describe('FolderContentComponent', () => {
  let component: FolderContentComponent;
  let fixture: ComponentFixture<FolderContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FolderContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FolderContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
