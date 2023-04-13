import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorcalculatorComponent } from './colorcalculator.component';

describe('ColorcalculatorComponent', () => {
  let component: ColorcalculatorComponent;
  let fixture: ComponentFixture<ColorcalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColorcalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorcalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe("my Unit Test For ColorCalculator",()=>{
  it("should show color code of given color",()=>{
    let colorCode = new ColorcalculatorComponent();
    let result = colorCode.getColor("#FF0000");
    expect(result).toBe("#FF0000")
  })
})
