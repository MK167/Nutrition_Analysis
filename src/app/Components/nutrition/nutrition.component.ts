import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { main } from 'src/app/Models/Main';
import { RootObject } from '../../Models/NutritionModel';
import { NutritionServiceService } from '../../Services/nutrition-service.service';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit {
  RootObject: RootObject[]= [];
  NutritionForm! : FormGroup;
  invalidLogin! : boolean;
  // RootObjectval = Object.values(this.RootObject);

  // Nutriattion = Object.values(this.RootObject);

  constructor(public NutritionServiceService:NutritionServiceService, fb : FormBuilder) {
    this.NutritionForm = fb.group({
      Inger : ['',
      [
       Validators.required,
       Validators.minLength(3)]
      ]
    });
   }
   get Inger(){
    return this.NutritionForm.get('Inger')?.value;
  }
  get f()
  {
    return this.NutritionForm.controls;
  }

  ngOnInit(): void {
    this.GetData();
  }
GetData(){
  this.NutritionServiceService.GetAllNutrition('cooking',this.Inger).subscribe(data => {
    this.RootObject = data;
    console.log(this.RootObject);
  });
}

}
