import { Component, OnInit } from '@angular/core';
import { PagedList } from 'src/app/core/models';
import { Product } from '../models';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrls: ['./product-home.component.scss']
})
export class ProductHomeComponent implements OnInit {
  pagedList = new PagedList<Product>();
  constructor(private _productService: ProductService) { }

  ngOnInit(): void {
    this._productService.searchInProducts({
      pageSize: 20,
      pageIndex: 0
    })
      .subscribe((resp) => {
        this.pagedList.collection = resp.collection;
        this.pagedList.pageIndex = resp.pageIndex;
        this.pagedList.pageSize = resp.pageSize;
        this.pagedList.totalCount = resp.totalCount;
      });
  }

}
