import { HttpEvent, HttpHandlerFn, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment";

export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  console.log(req.url);
  const clonedRequest = req.clone();
  let params = req.params ? req.params : new HttpParams();
  params = params.set('apiKey', environment.API_KEY);

  const apiReq = req.clone({
    url: `${environment.API_URL}/${req.url}`,
    params
  });
  return next(clonedRequest);
}
