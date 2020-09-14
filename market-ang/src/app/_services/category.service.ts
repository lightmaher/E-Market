import { Injectable } from '@angular/core';
import { Category } from '../_models/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
readonly rootURL = 'https://localhost:44399/';
  formData: Category;
  catList: {};

  constructor(private http: HttpClient) { }

  InsertCategory(){
    console.log(this.formData);
    return this.http.post(this.rootURL + 'category' , this.formData);
  }
  loadCategory(){
    return this.http.get(this.rootURL + 'category').toPromise().then(res => this.catList = res as Category[]);
  }
  updateCategory(){
    return this.http.put(this.rootURL + 'category/' + this.formData.categoryid , this.formData);
  }

  deleteCategory(id){
    return this.http.delete(this.rootURL + 'category/' + id);
  }

}
