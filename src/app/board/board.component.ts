import { Component, 
    OnInit, 
    ViewChild,
    ViewContainerRef,
    ComponentFactoryResolver,
    ComponentRef,
    ComponentFactory } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { KnightService } from '../shared/services/knight.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  entryComponents: [BoxComponent],
})

export class BoardComponent implements OnInit {
@ViewChild('boxcontainer', { read: ViewContainerRef }) entry: ViewContainerRef;

private alpha: string[] = ['A','B','C','D','E','F','G','H'];
private num: string[] = ['1','2','3','4','5','6','7','8'];
private start: string;
private end: string;
private knightPath: string;
private travelPath: string[];

constructor(private resolver: ComponentFactoryResolver, public knightService: KnightService) {

}

ngOnInit() {

}

startGame(val) {
	if(!this.start) {
	  this.start = val;
	  document.getElementById(this.start).classList.add('start');
	}
	else {
      if(this.end && this.knightPath) {
      	this.knightPath = '';
      }
	  this.end = val;
	  const boxes = document.querySelectorAll('.box');
	  for(let i=0;i<boxes.length;i++) {
	  	boxes[i].classList.remove('end');
	  	boxes[i].classList.remove('up');
	  	boxes[i].classList.remove('down');
	  	boxes[i].classList.remove('left');
	  	boxes[i].classList.remove('right');
	  	boxes[i].classList.remove('point');
	  }
	  document.getElementById(this.end).classList.add('end');
	  this.knightService.getPath(this.start,this.end).subscribe((data: string) => {
	  	this.knightPath = data;
	  	let pathAsArray = this.knightService.convertToArray(data, this.alpha);
	  	this.travelPath = this.knightService.computeTravelPath(pathAsArray);
	  	this.mapClassName(this.travelPath);
        this.markPoints(pathAsArray);
	  });
	}
}

mapClassName(data) {
    for(let i in data) {
    	document.getElementById(data[i].point).classList.add(data[i].class);
    }	
}

markPoints(data) {
	for(let i=1;i<data.length;i++) {
	  document.getElementById(data[i]).classList.add('point');
	  let ele = <HTMLElement> document.getElementById(data[i]).childNodes[2].childNodes[0];
	  if(ele) 
	    ele.innerText = i.toString();
	}
}

createComponent(i,j) {
    const factory = this.resolver.resolveComponentFactory(BoxComponent);
    const componentRef = this.entry.createComponent(factory);
    if(i%2 == 0) {
     if(j%2 == 0) {
      componentRef.instance.color = 'black';
     } 
 	 else{
      componentRef.instance.color = 'white';
     }   
    }
    else {
         if(j%2 == 0) {
         componentRef.instance.color = 'white';
         }  
	    else {
	    componentRef.instance.color = 'black';
	    }	    
    }
    componentRef.instance.id = this.alpha[j] + this.num[i];
    componentRef.instance.boxId.subscribe(val => this.startGame(val));
}

ngAfterContentInit() {
	const board = document.querySelector('.board');
	for(let i=0;i<8;i++) {
	 	for(let j=0;j<8;j++) {
	 	   this.createComponent(i,j)
	 	}
	}	
}

clearBoard() {
	if(this.start) {
	  document.querySelector('.start').classList.remove('start');
	  this.start = '';
	}
	if(this.end) {
	  document.querySelector('.end').classList.remove('end');
	  this.end = '';
	}
	if(this.knightPath) {
	  this.knightPath = '';
	}
	const boxes = document.querySelectorAll('.box');
	  for(let i=0;i<boxes.length;i++) {
	  	boxes[i].classList.remove('up');
	  	boxes[i].classList.remove('down');
	  	boxes[i].classList.remove('left');
	  	boxes[i].classList.remove('right');
	  	boxes[i].classList.remove('point');
	  }
}


}
