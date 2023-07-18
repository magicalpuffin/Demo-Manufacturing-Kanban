import type { PartType, LocationType, WorkOrderType } from './types';

export let exparts: PartType[] = [
	{
		id: 1,
		name: 'example part 1',
		description: 'description 1'
	},
	{
		id: 2,
		name: 'example part 2',
		description: 'description 2'
	}
];
export let exlocations: LocationType[] = [
	{
		id: 1,
		name: 'example location 1',
		sequence: 1
	},
	{
		id: 2,
		name: 'example location 2',
		sequence: 2
	},
	{
		id: 3,
		name: 'example location 3',
		sequence: 3
	}
];

export let exworkorders: WorkOrderType[] = [
	{
		id: 1,
		name: 'WO Num1',
		priority: 1,
		location: exlocations[0],
		part: exparts[0]
	},
	{
		id: 2,
		name: 'WO Num2',
		priority: 2,
		location: exlocations[0],
		part: exparts[0]
	},
	{
		id: 3,
		name: 'WO Num3',
		priority: 3,
		location: exlocations[1],
		part: exparts[1]
	}
];
