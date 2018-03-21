export interface Comment {
	name: string;
	children?: Comment[];
	message: string;
	profilePhoto?: string;
}
