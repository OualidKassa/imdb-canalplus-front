import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {CrudBasicsService} from "../services/crudBasicsService";
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
  constructor(private formBuilder: FormBuilder, public ngbActiveModal: NgbActiveModal, private dataService: CrudBasicsService) { }

  formEditItem() {
    this.editForm = this.formBuilder.group({
      titre: new FormControl(this.data.originalTitle, Validators.required),
      annee: new FormControl(this.data.startYear, Validators.required),
      genre: new FormControl(this.data.genres, Validators.required)
    });
    console.log('Formulaire modale: ' +this.editForm.value.titre);
    console.log('editForm: '+ this.editForm.value);
  }

  ngOnInit(): void {
    this.formEditItem();
    console.log(this.data)
  }

  submitForm(dataToUpdate: any) {
    const basics = this.mappingDataFormToBasics(dataToUpdate);
    console.log('basics send: ' + basics.genres + ' ' + basics.originalTitle);
    this.ngbActiveModal.dismiss("Cross click");
    this.dataService.update(this.data.id, basics).subscribe(data => data = basics);
    console.log('data send: ' + dataToUpdate.value.titre);
    console.log('id send: ' + this.data.id);
    this.dataService.sendDataUpdate(basics);
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
