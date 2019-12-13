import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToRecipeComponent } from './add-product-to-recipe.component';

describe('AddProductToRecipeComponent', () => {
  let component: AddProductToRecipeComponent;
  let fixture: ComponentFixture<AddProductToRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductToRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductToRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
