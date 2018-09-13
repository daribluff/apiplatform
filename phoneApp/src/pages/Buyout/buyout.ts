import {Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-buyout',
    templateUrl: 'buyout.html',
})
export class BuyoutPage implements OnInit {

    product: string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ngOnInit(){
        this.product = this.navParams.get('product');
    }

    gotToHome(){
        this.navCtrl.popToRoot();
    }

}
