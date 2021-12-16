import { Component, OnInit } from '@angular/core';
import { ImdbBasicsService } from '../services/imdbBasicsService';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {EditMovieComponent} from "../edit-movie/edit-movie.component";
import {Basics} from "../models/basics";
import {pipe} from "rxjs";
import {filter, map} from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  title = 'imbd-basics';

  basics: Basics[] = [{
    primaryTitle: '',
  originalTitle: '',
  startYear: 0,
  genres: '',
    img: ''
  }];

  numberOfPagination = 1;
  searchText = '';
  refModel: any;
  constructor(private imdbBasicsService: ImdbBasicsService, private ngModal: NgbModal) {}

  ngOnInit(): void {
    this.printBasics();
    this.imdbBasicsService.notifyUpdateDataBasics$.subscribe(res => {
      if(res.refresh){
        // get your grid data again. Grid will refresh automatically
        this.printBasics();
      }
    })

  }

  printBasics() {
    this.imdbBasicsService.read().subscribe(
      (data) => {
        this.basics = data;
      },
      (error) => {
        new Error('Unable to acces list imdb for reading basics: ' + error);
      }
    );
  }

  openEditMovie(data: any){
      this.refModel = this.ngModal.open(EditMovieComponent, {windowClass: 'animated slideInUp'});
    this.refModel.componentInstance.data = data;
  }
}
