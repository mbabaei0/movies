import { Injectable } from '@angular/core';
import { randomId } from '@core/utils/utils';

@Injectable({
  providedIn: 'root'
})
export class GroupByService {

  private worker: Worker;
  /**
   * Initializes the service and sets up the web worker.
   */
  constructor() {
    this.worker  = new Worker(new URL('../workers/group-by-worker.worker', import.meta.url));
  }
    /**
   * Groups an array of items by a specified key.
   *
   * @template T - The type of items in the array.
   * @param {Array<T>} items - The array of items to be grouped.
   * @param {string} key - The key by which to group the items.
   * @returns {Promise<Map<string, T[]>>} A promise that resolves to a map where the keys are the group identifiers and the values are arrays of grouped items.
   */
  groupBy<T>(items: Array<T>, key: string): Promise<Map<string,T[]>> {
    return new Promise((resolve, _) => {
      this.worker.postMessage({items , key , id: randomId()});
      this.worker.onmessage = (event) => {
        resolve(event.data.response);
      };
    });
  }
}
