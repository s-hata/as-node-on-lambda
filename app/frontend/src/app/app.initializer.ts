import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env/environment';


const SETTINGS_FILE = '/settings.json';
const API_BASE_URL_KEY = 'api_base_url';
const AWS_REGION_KEY = 'aws_region';
const AWS_USER_POOL_ID_KEY = 'aws_user_pool_id';
const AWS_CLIENT_ID_KEY = 'aws_client_id';

@Injectable()
export class AppInitializer {

  public loadSettings(): Promise<any> {
    return this.httpClient.get(SETTINGS_FILE)
      .toPromise()
      .then((settings) => {
        if (environment.production) {
          environment.api_base_url = settings[API_BASE_URL_KEY];
        }
      }).catch((error) => {
        console.log(error);
      });
  }

  constructor(private httpClient: HttpClient) {}
}
