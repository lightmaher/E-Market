import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { AlretifyService } from 'src/app/_services/alretify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

    constructor(public categoryS: CategoryService , public toastr: AlretifyService) { }

    ngOnInit(): void {
      this.resetForm();

    }

    resetForm(form?: NgForm){
      if (form != null) {
      form.resetForm();
      }
      this.categoryS.formData = {
       categoryid: 0,
        name: '',
        num_of_products: '',
        products: []
      };
    }


    onSubmit(form: NgForm){

      if (this.categoryS.formData.categoryid === 0){
        this.AddCategory();
      }
      else if (this.categoryS.formData.categoryid !== 0){
        this.UpdateCategory();
      }
      this.resetForm();
    }

    AddCategory(){
      this.categoryS.InsertCategory().subscribe(
        (res: any) => {

          this.toastr.success('Record Category Successfuly');
          this.categoryS.loadCategory();
          this.resetForm();
        },
        err => {
          console.log('failed');
          this.toastr.warning('Record Category Failed');
          console.log(err);
        }
      );
    }


    UpdateCategory(){
      this.categoryS.updateCategory().subscribe(
        (res: any) => {
          this.toastr.success('Record Update Successfuly');
          this.categoryS.loadCategory();
        },
        err => {
          console.log('failed');
          this.toastr.warning('Record Update Failed');
          console.log(err);
        }
      );
    }

  }



