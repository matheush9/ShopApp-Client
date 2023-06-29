import { ItemService } from 'src/app/modules/order/services/item.service';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Subject, forkJoin, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { ProductService } from '../../services/product.service';
import { ImageService } from 'src/app/modules/shared/services/image.service';
import { CartService } from 'src/app/modules/core/services/cart.service';
import { JwtTokenService } from 'src/app/modules/shared/services/jwt-token.service';
import { CustomerService } from 'src/app/modules/customer/services/customer.service';
import { OrderService } from 'src/app/modules/order/services/order.service';

import { Product } from '../../interfaces/product-interface';
import { Item } from 'src/app/modules/order/interfaces/item-interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    nav: false,
    pullDrag: true,
    dots: true,
    navSpeed: 600,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1,
      },
    },
  };

  product?: Product;
  product$?: Observable<Product>;
  error$ = new Subject<boolean>();
  imagesProviderUrl?: string;

  constructor(
    private productService: ProductService,
    private imageService: ImageService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private customerService: CustomerService,
    private orderService: OrderService,
    private itemService: ItemService
  ) {
    this.imagesProviderUrl = this.imageService.getImagesProviderUrl();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.getProduct(Number(id));
    });
  }

  getProduct(productId: number) {
    this.product$ = this.productService.getProduct(productId).pipe(
      tap((product) => {
        this.product = product;
      })
    );
  }

  addProductToCart(productId: number) {
    this.cartService.addProduct(productId);
  }

  addItemToOrder(orderId: number) {
    const item = {
      orderId: orderId,
      productId: this.product?.id,
      priceTotal: this.product?.price,
      quantity: 1,
    } as Item;

    return this.itemService.addItem(item);
  }

  buySingleProduct() {
    if (this.customerService.currentCustomer) {
      const addBlankOrder$ = this.orderService.addBlankOrder(
        this.customerService.currentCustomer.id
      );
      const addItemToOrder$ = addBlankOrder$.pipe(
        tap((order) => this.addItemToOrder(order.id))
      );

      forkJoin([addItemToOrder$, addBlankOrder$]).subscribe(() => {
        window.location.href = 'order/listing';
      });
    }
  }
}
