class Formatter {
	numberFormatter(val: number): string {
		const formatter = new Intl.NumberFormat('en-IN', {
			maximumSignificantDigits: 3,
		}).format(val);

		return formatter;
	}
}

export const formatter = new Formatter();
