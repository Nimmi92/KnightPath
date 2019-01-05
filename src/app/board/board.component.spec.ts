import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardComponent } from './board.component';
import { HttpClientModule } from '@angular/common/http';
import { Component, 
    OnInit, 
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory } from '@angular/core';
    import { BoxComponent } from '../box/box.component';

describe('BoardComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      declarations: [
        BoardComponent,
        BoxComponent
      ],
    }).compileComponents();
  }));

  it('should create the board', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const board = fixture.debugElement.componentInstance;
    expect(board).toBeTruthy();
  });

});
