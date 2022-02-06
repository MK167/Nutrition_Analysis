import { Component, Inject, OnInit } from '@angular/core';
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
  NutritionForm! : FormGroup;
  NutritionFormPOST! : FormGroup;
  invalidData! : boolean;
  loading = false;

  NurtitionModel!: NurtitionModel;
  title!: string;
  prep!: string;
  yield!: string;
  ingr!: string[];

  constructor(public NutritionServiceService: NutritionServiceService,
     fb : FormBuilder, private router: Router, private SpinnerService: NgxSpinnerService)
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


  // get Inger(){
  //   return this.NutritionFormPOST.get('Inger')?.value.split("/\n|\r/|','");
  // }

  // get FormData(){
  //   return this.NutritionFormPOST.get('Inger')?.value.split(/\n|\r/), this.NutritionFormPOST.get('yield')?.value,
  //    this.NutritionFormPOST.get('prep')?.value, this.NutritionFormPOST.get('title')?.value;
  // }

  // get IsCooking(){
  //   return this.NutritionForm.get('IsCooking')?.value;
  // }

  get f()
  {
    return this.NutritionFormPOST.controls;
  }

  ngOnInit(): void {
        this.Split();
  }
Split(){
  // let str = this.NutritionFormPOST.get('Inger')?.value.toString().split(' ', 3);
  // console.log(str);
  var t = this.NutritionFormPOST.get('Inger')?.value.toString().split(/[\s, ]+/);
  for (let i = 0; i <= t.length; i++){
  var Qty  =    t[i];
  console.log("QTY",Qty);

}
console.log(t);
console.log("QTY",Qty);
// console.log("Unit",Unit);
// console.log("Food",Food);
}

  saveData(): void {
        // console.log(this.NutritionFormPOST.value);
  // let str = this.NutritionFormPOST.get('Inger')?.value.toString().split(' ', 3);
          // console.log(str);

          this.Split();
    if (this.NurtitionModel == null) {
        let NewInter = {
         ingr : this.NutritionFormPOST.get('Inger')?.value.split(/\n|\r/)
        };
        this.SpinnerService.show();
        this.loading = true;
        this.NutritionServiceService.CreateData(NewInter)
        .subscribe((data:any) => {
            this.RootObject = [data];
              // console.log(this.NutritionFormPOST.value);
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

    //  console.log(NewInter);
    }
  }



//   GetData(){
//     if (this.NutritionForm.controls != null){
//       this.SpinnerService.show();
//       this.NutritionServiceService.getAllData(this.IsCooking,this.Inger).subscribe((data:any) => {
//         this.loading = true;
//         this.RootObject = [data];
//         this.SpinnerService.hide();
//         console.log(data);
//       });
//     }
//     else {
//       this.loading = false
//       this.SpinnerService.hide();
//       this.NutritionForm.setErrors({
//       invalidData : true,
//     });
//     }
// }


NewRecipe(){
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
  });
}
}
