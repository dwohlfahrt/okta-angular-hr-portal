// import { Injectable } from '@angular/core';
// import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
// import { Subject } from 'rxjs';

// import { ErrorState } from '../models/error.model';

// @Injectable({ providedIn: 'root' })
// export class ErrorService {
//   private applicationName = 'bluemoon-web-components';

//   private errorSubject = new Subject<ErrorState>();
//   loaderState = this.errorSubject.asObservable();

//   constructor() {
//   }

//   // Send the error notification to log service or console log it.
//   logError(error: any) {
//     const date = new Date().toISOString();

//     if (error instanceof HttpErrorResponse) {
//       console.error(date, this.applicationName, 'There was an HTTP error.', error.message, 'Status code:', (<HttpErrorResponse>error).status, error);
//     } else if (error instanceof TypeError) {
//       console.error(date, this.applicationName, 'There was a Type error.', error);
//     } else if (error instanceof Error) {
//       console.error(date, this.applicationName, 'There was a general error.', error);
//     } else {
//       console.error(date, this.applicationName, 'Nobody threw an error but something happened!', error);
//     }
//   }

//   // System error
//   system(): void {
//     this.errorSubject.next({ key: 'system' } as ErrorState);
//   }

//   // Configuration error
//   configuration(): void {
//     this.errorSubject.next({ key: 'configuration' } as ErrorState);
//   }
// }
