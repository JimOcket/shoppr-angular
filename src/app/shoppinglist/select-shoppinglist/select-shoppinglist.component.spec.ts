import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectShoppinglistComponent } from './select-shoppinglist.component';

describe('SelectShoppinglistComponent', () => {
  let component: SelectShoppinglistComponent;
  let fixture: ComponentFixture<SelectShoppinglistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectShoppinglistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectShoppinglistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
