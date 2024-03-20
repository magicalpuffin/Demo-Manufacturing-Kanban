import type {
	locationSelectType,
	workorderSelectType,
	partSelectType
} from '@Demo-Manufacturing-Kanban/core/zodSchema';

export type LocationDetailSelect = locationSelectType & {
	workorders: WorkOrderDetailSelect[];
};

export type WorkOrderDetailSelect = workorderSelectType & {
	location: locationSelectType;
} & { part: partSelectType };
