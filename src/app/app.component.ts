import { Component } from '@angular/core';
import { ConfigsLoaderService } from './services/configs-loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularBuildOnceDeployMultipleEnvironmentsExample';

 constructor(public configsLoaderService: ConfigsLoaderService) {
  }
}
