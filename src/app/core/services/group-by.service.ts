import { Injectable } from '@angular/core';
import { randomId } from '@core/utils/utils';


interface GroupByResult {
  id: number,

}
@Injectable({
  providedIn: 'root'
})
export class GroupByService {

  private worker: Worker;
  constructor() {
    this.worker  = new Worker(new URL('../workers/group-by-worker.worker', import.meta.url));
  }
  groupBy<T>(items: Array<T>, key: string): Promise<any> {
    return new Promise((resolve, _) => {
      this.worker.postMessage({items , key , id: randomId()});
      this.worker.onmessage = (event) => {
        resolve(event.data.response);
      };
    });
  }
}
