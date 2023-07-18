export type PartType = {
	id: number;
	name: string;
	description: string;
};

export type LocationType = {
	id: number;
	name: string;
	sequence: number;
};

export type WorkOrderType = {
	id: number;
	name: string;
	priority: string;
	location: LocationType;
	part: PartType;
};
