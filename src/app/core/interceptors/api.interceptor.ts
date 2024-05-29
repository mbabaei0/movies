import { HttpEvent, HttpHandlerFn, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs"
import { environment } from "../../../environments/environment";

/**
 * Intercepts an HTTP request to add an API key and modify the request URL.
 *
 * @param {HttpRequest<unknown>} req - The outgoing HTTP request.
 * @param {HttpHandlerFn} next - The next interceptor or backend handler in the chain.
 * @returns {Observable<HttpEvent<unknown>>} - An observable of the HTTP event.
 *
 * This interceptor appends the API key as a query parameter to the request and modifies the request URL
 * to include the base API URL from the environment configuration.
 */
export function apiKeyInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  let params = req.params ? req.params : new HttpParams();

  params = params.set('apiKey', environment.API_KEY);
  const apiReq = req.clone({
    url: `${environment.API_URL}/${req.url}`,
    params
  });
  return next(apiReq);
}
