import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoxComponent } from './box.component';

describe('BoxComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BoxComponent
      ],
    }).compileComponents();
  }));

  it('should create the box', () => {
    const fixture = TestBed.createComponent(BoxComponent);
    const box = fixture.debugElement.componentInstance;
    expect(box).toBeTruthy();
  });

});
