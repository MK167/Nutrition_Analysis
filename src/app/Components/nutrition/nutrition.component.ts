import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RootObject } from 'src/app/Models/Test';
// import { main } from 'src/app/Models/Main';
import { NutritionServiceService } from '../../Services/nutrition-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Ingredient } from './../../Models/Ingredient Structure';
declare function InputData(): any;
@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit {

  RootObject: RootObject[] = [];
  NutritionForm! : FormGroup;
  invalidData! : boolean;
  loading = false;
  IngerValue: any [] = [];
  Ingredient: Ingredient[] = [];

  constructor(public NutritionServiceService:NutritionServiceService, fb : FormBuilder, private router: Router, private SpinnerService: NgxSpinnerService) {
    this.NutritionForm = fb.group({
      Inger : ['',
      [
       Validators.required,
       Validators.minLength(3)]
      ],
      IsCooking:['',Validators.required]
    });
   }
   get Inger(){
    // return this.NutritionForm.get('Inger')?.value.split(/\n|\r/);
    return this.IngerValue = this.NutritionForm.get('Inger')?.value.split(/\n|\r/);
  }
   get IsCooking(){
    return this.NutritionForm.get('IsCooking')?.value;
  }
  get f()
  {
    return this.NutritionForm.controls;
  }

  ngOnInit(): void {
    // InputData();
    // this.listedIngredients();
    // console.log(this.listedIngredients());
  }

  //  listedIngredients() {
  //   const result: Array<string> = new Array<string>();
  //   this.RootObject.forEach((e) => result.push(e.calories));
  //   return result.join("; ");
  // }

  GetData(){
    if (this.NutritionForm.controls != null){
      this.SpinnerService.show();
      this.NutritionServiceService.getAllData(this.IsCooking,this.Inger).subscribe((data:any) => {
        this.loading = true;
        this.RootObject = [data];
        this.SpinnerService.hide();
        console.log(data);
      });
    }
    else {
      this.loading = false
      this.SpinnerService.hide();
      this.NutritionForm.setErrors({
      invalidData : true,
    })
    }
}


NewRecipe(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}
