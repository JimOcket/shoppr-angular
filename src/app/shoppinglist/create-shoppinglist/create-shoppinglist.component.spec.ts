import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateShoppinglistComponent } from './create-shoppinglist.component';

describe('CreateShoppinglistComponent', () => {
  let component: CreateShoppinglistComponent;
  let fixture: ComponentFixture<CreateShoppinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateShoppinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateShoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
