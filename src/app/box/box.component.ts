import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-box',
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent {
 @Input() color: string;
 @Input() id: string;
 @Output() boxId = new EventEmitter<boolean>();

 getBox($event) {
  this.boxId.emit($event.target.id);
 }

}
