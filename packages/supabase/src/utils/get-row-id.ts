export const getRowId = (id: string | number): number => {
	if (typeof id === 'number') {
		return id;
	} else {
		const tmp = id.split('-');
		if (tmp.length > 1) {
			return Number(tmp[1]);
		} else {
			return Number(tmp[0]);
		}
	}
};
