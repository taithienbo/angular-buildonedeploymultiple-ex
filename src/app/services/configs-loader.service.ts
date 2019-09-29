import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
/**
 * Retreive the values from the configs.json file under the assets 
 * directory. At release time, azure pipelines replaces the values 
 * in the file based on the variables configured in azure devops. 
 * 
 * Throughout the app, other services can reference the configs via this 
 * service, instead of referecing the environment.ts file so that we can deploy
 * the same artifact to multiple environments without having to build multiple 
 * times. 
 */
export class ConfigsLoaderService {

   // If you app has an interceptor and you don't want it to intercept the 
   // loading of the file, you can use a seprate HttpClient instance. 
   // For instance, in my real application,  I have an interceptor that 
   // intercepts and inserts access token to the header of an http request. 
   // I don't want the interceptor to intercept the loading file request 
   // because it would require an access token with is not available at 
   // initialization time.  
   private httpClient: HttpClient;
   private configs: Configs;

   constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler); 
  }

  get ApiUrl() {
    return this.configs.ApiUrl; 
  }

  get ConfigsLoadedFrom() {
    return this.configs.ConfigsLoadedFrom;
  } 

  public async loadConfigs() : Promise<any> {
    return this.httpClient.get('assets/configs.json').pipe(settings => settings)
      .toPromise()
      .then(settings => {
        this.configs = settings as Configs; 
      });
  }

}

export interface Configs {
  ApiUrl: string, 
  ConfigsLoadedFrom: string 
}
