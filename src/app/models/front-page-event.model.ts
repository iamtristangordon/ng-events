import { EventLocation } from './location.model';

export interface FrontPageEvent {
    id: string;
    name: string;
    location: EventLocation;
    description: string;
}