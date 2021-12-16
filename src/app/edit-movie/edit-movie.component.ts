import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ImdbBasicsService} from "../services/imdbBasicsService";
import {Basics} from "../models/basics";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {

  @Input()
  data: any;
  editForm: any
  constructor(private formBuilder: FormBuilder, public ngbActiveModal: NgbActiveModal, private dataService: ImdbBasicsService) { }

  formEditItem() {
    this.editForm = this.formBuilder.group({
      titre: new FormControl(this.data.originalTitle, Validators.required),
      annee: new FormControl(this.data.startYear, Validators.required),
      genre: new FormControl(this.data.genres, Validators.required)
    });
  }

  ngOnInit(): void {
    this.formEditItem();
    console.log(this.data)
  }

  submitForm(dataToUpdate: any) {
    const basics = this.mappingDataFormToBasics(dataToUpdate);
    this.ngbActiveModal.dismiss("Cross click");
    this.dataService.update(this.data.id, basics).subscribe(data => this.data = data);
    this.refreshDataDashboardComponent();
  }

  refreshDataDashboardComponent(){
    this.dataService.notifyOther({refresh: true});
  }

  mappingDataFormToBasics(dataForm: any): Basics{
    const basics: Basics = dataForm.value;
    basics.genres = dataForm.value.genre;
    basics.originalTitle = dataForm.value.titre;
    basics.startYear = dataForm.value.annee;
    basics.primaryTitle = this.data.primaryTitle;
    basics.img = this.data.img;
    return basics;
  }
}
