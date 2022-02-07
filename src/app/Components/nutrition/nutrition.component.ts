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
  // Define and Declare Variable

  RootObject: RootObject[] = [];
  RootObjectPost: RootObject[] = [];

  NutritionFormPOST! : FormGroup;
  invalidData! : boolean;
  loading = false;
  arr: Array<string>= [];
  details: Array<string>= [];
  NurtitionModel!: NurtitionModel;
  ingr!: string[];

  // CONSTRUCTOR
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

  // Split Method built to split enter text in Textarea and pass by value array splited in GET Method
Split(){
  var x = this.NutritionFormPOST.get('Inger')?.value.toString().replace(/^,+|,/g, '');
    this.arr = [x.split(/[\n]+/)];
    console.log("arr1",this.arr);
    for(let j = 0 ;j < this.arr?.length; j++ )
    {
    for(let i = 0 ;i < this.arr[j]?.length; i++ )
    {

     if (this.NutritionFormPOST.controls != null){
      this.SpinnerService.show();
      // GET Method Calling
      this.NutritionServiceService.getAllData('coocking',(this.arr[j][i])).subscribe((data:any) => {
      this.loading = true;
      this.RootObject = [data];
      this.SpinnerService.hide();

      console.log("ARRAY" ,this.arr[j][i]);
      // PUSH Data in Summary Table
      this.details.push((this.arr[j][i])+" "+data.calories+" "+data.totalWeight);
      console.log("Details" ,this.details);
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

}

// SaveData Method built in Analyze all ingredient list Entered in TextArea
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

  // To Reload Page Again to New Recipe
NewRecipe(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}
