import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BuyoutPage } from "../Buyout/buyout";

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

    gotToTheBuyout(){
      this.navCtrl.push(BuyoutPage)
    }

    addToCart(productName : string){
      this.navCtrl.push(BuyoutPage, { product : productName })
    }

}
