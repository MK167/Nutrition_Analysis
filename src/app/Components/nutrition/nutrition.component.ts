import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RootObject } from 'src/app/Models/NurtirationGET';

import { NutritionServiceService } from '../../Services/nutrition-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NurtitionModel } from '../../Models/NutritionModelPOST';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss']
})
export class NutritionComponent implements OnInit {

  RootObject: RootObject[] = [];
  RootObjectPost: RootObject[] = [];

  NutritionFormPOST! : FormGroup;
  invalidData! : boolean;

  loading = false;

  arr: Array<string>= [];
  details: Array<string>= [];
  NurtitionModel!: NurtitionModel;

  ingr!: string[];

  constructor(@Inject(FormBuilder) fb: FormBuilder, public NutritionServiceService: NutritionServiceService,
  private router: Router, private SpinnerService: NgxSpinnerService)
    {
      const data = this.NurtitionModel;
      if (data == null) {
        this.ingr = [];
      } else
      {
        this.NurtitionModel = data;
        this.ingr = data.ingr;
      }
    this.NutritionFormPOST = fb.group({
      Inger : [this.ingr, [
        Validators.required,Validators.minLength(3)
      ]],
    });
    }


  get f()
  {
    return this.NutritionFormPOST.controls;
  }

  ngOnInit(): void {

  }

Split(){
  var x = this.NutritionFormPOST.get('Inger')?.value.toString().replace(/^,+|,/g, '');
    this.arr = [x.split(/[\n]+/)];
    // console.log("arr1",this.arr);
    for(let j = 0 ;j < this.arr?.length/2; j++ )
    for(let i = 0 ;i < this.arr[j]?.length/2; i++ )
    {

     if (this.NutritionFormPOST.controls != null){
      this.SpinnerService.show();
      this.NutritionServiceService.getAllData('coocking',(this.arr[j][i])).subscribe((data:any) => {
      this.loading = true;
      this.RootObject = [data];
      this.SpinnerService.hide();
      this.details.push((this.arr[j][i])+" "+data.calories+" "+data.totalWeight);

    });
  }
  else {
    this.loading = false
    this.SpinnerService.hide();
    this.NutritionFormPOST.setErrors({
    invalidData : true,
  });
  }
}

}

  saveData(): void {

    this.Split();
    if (this.NurtitionModel == null) {
        let NewInter = {
         ingr : this.NutritionFormPOST.get('Inger')?.value.split(/\n|\r/)
        };
        this.SpinnerService.show();
        this.loading = true;
        this.NutritionServiceService.CreateData(NewInter)
        .subscribe((data:any) => {
            this.RootObjectPost = [data];
            // console.log("ttt",data);
              this.SpinnerService.hide();
            },
              error => {
                this.loading = false
                this.SpinnerService.hide();
                console.log(error);
              });
    }
    else{
     let NewInter = {
      ingr : this.NutritionFormPOST.get('Inger')?.value
     };

    }
  }

NewRecipe(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}
