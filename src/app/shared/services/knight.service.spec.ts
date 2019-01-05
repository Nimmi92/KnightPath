import { TestBed } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { KnightService } from './knight.service';

describe('KnightService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let knightService: KnightService;
  beforeEach(() => {
  TestBed.configureTestingModule({
  		providers: [KnightService],
  		imports: [HttpClientModule],
  	});
  	httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
  	knightService = new KnightService(<any> httpClientSpy);
  });

  it('should be created', () => {
    const service: KnightService = TestBed.get(KnightService);
    expect(service).toBeTruthy();
  });

  it('should return expected path for the given start and end points (HttpClient called once)', () => {
	const expectedPath = "[\"B1\", \"C3\"]";
	const start = "B1";
	const end = "C3";
	   
	  httpClientSpy.get.and.returnValue(of(expectedPath));
	 
	  knightService.getPath(start,end).subscribe(
	    path => expect(path).toEqual(expectedPath, 'expected path'),
	    fail
	  );
	  expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
	});

  it('should return array of points for the given string', () => {
	const expectedArray = ["B1","C3"];
	const pointsAsString = "[\"B1\", \"C3\"]";
	const alpha = ['A','B','C','D','E','F','G','H'];
	   
	  httpClientSpy.get.and.returnValue(of(expectedArray));
	 
	  const answer = knightService.convertToArray(pointsAsString,alpha);
	  expect(answer).toEqual(expectedArray, 'expected array form')
	});

  it('should return expected travel path with class name for the given knight path', () => {
	const expectedClassType = [{"point":"B2","class":"down"},{"point":"B3","class":"right"}];
	const knightPathAsArray = ["B1","C3"];
	   
	  httpClientSpy.get.and.returnValue(of(expectedClassType));
	 
	  const answer = knightService.computeTravelPath(knightPathAsArray);
	  expect(answer).toEqual(expectedClassType, 'expected class type')
	});

});
