import { FrontPageEvent } from './front-page-event.model';
import { Image } from './image.model';
import { Comment } from './comment.model';

export interface Event extends FrontPageEvent {
    images: Image[];
    comments: Comment[];
    date: string; 
}