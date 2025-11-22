import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogDelete } from './blog-delete';

describe('BlogDelete', () => {
  let component: BlogDelete;
  let fixture: ComponentFixture<BlogDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
