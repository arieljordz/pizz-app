import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PizzatypeComponent } from './pizzatype.component';

describe('PizzatypeComponent', () => {
  let component: PizzatypeComponent;
  let fixture: ComponentFixture<PizzatypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PizzatypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PizzatypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
