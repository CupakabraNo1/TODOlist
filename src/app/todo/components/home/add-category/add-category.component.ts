import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.less']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  @Input() lastIndex: number;

  @Output() added = new EventEmitter<boolean>();

  categoriesSub: Subscription;

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit(): void {
  }

  addNewCategory(form: NgForm){
    if(form.value.name === ""){
      return ;
    }
    let category = new Category(this.lastIndex+1, form.value.name);
    this.categoriesSub = this.categoriesService.addNewCategory(category).subscribe((data:any) => {
      this.added.emit(true);
    })
  }

  ngOnDestroy(): void {
    if(this.categoriesSub){
      this.categoriesSub.unsubscribe();
    }
  }

}
