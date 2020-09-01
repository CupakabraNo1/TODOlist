import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.less']

})
export class CategoryListComponent implements OnInit, OnDestroy {

  @Input() categories: Category[];

  @Output() deleted = new EventEmitter<boolean>();

  categoriesSub: Subscription;

  constructor(
    private categoresService: CategoriesService
  ) { }

  ngOnInit(): void {
  }

  public deleteCategory(id: number) {
    this.categoriesSub = this.categoresService.deleteCategory(id).subscribe(() => {
      this.deleted.emit(true);
    })
  }

  ngOnDestroy() {
    if (this.categoriesSub) {
      this.categoriesSub.unsubscribe();
    }
  }
}
