import { Component, OnInit } from '@angular/core'
import { IProduct } from './product';
import { ProductService } from './product.service';
import { error } from 'util';

@Component({    
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductsListComponent implements OnInit{
        
    constructor(private _productService: ProductService){
          
    }

    pageTitle : string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    
    _listFilter: string;
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(values:string){
        this._listFilter = values;
        this.filterProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filterProducts: IProduct[];
    products: IProduct[] = [];

    toggleImage():void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        console.log('On OnInit');
        this._productService.getProducts()
                            .subscribe(
                                products => {
                                    this.products = products;
                                    this.filterProducts = this.products;   
                                },
                                error => this.errorMessage = <any>error
                            );      
    }

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) =>
            product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
        );
    }

    onRatingClicked(message: string): void{
        this.pageTitle = 'Product List: ' + message;
    }
}