import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialoguecardComponent } from './dialoguecard.component';

describe('DialoguecardComponent', () => {
  let component: DialoguecardComponent;
  let fixture: ComponentFixture<DialoguecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialoguecardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialoguecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
