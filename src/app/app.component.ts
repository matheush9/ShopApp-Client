import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShopApp-Client';

  ngOnInit() {
    if (!window.isSecureContext)
    alert(
        'Please allow insecure content on this page,' 
      + ' because the client is https and the server is http,'
      + ' so chrome does not allow communication.' 
      + ' More information on how to allow it: https://github.com/matheush9/ShopApp-Client#readme'
    );
  }
}
