import { FrontPageEvent } from './front-page-event.model';

export interface EventsRequestResult {
    timeStamp: string;
    events: FrontPageEvent[];
}