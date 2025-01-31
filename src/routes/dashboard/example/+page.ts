import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	return {
		urlSummary: {
			countByUrl: [
				{ urlId: 'N3LW513', count: '45' },
				{ urlId: 'A1B2C3D', count: '120' },
				{ urlId: 'X9Y8Z7W', count: '78' },
				{ urlId: 'QWERTY1', count: '34' },
				{ urlId: 'LKJHGF2', count: '56' },
				{ urlId: 'MNBVCX3', count: '98' },
				{ urlId: 'ZXCVBN4', count: '65' },
				{ urlId: 'ASDFGH5', count: '112' },
				{ urlId: 'POIUYT6', count: '87' },
				{ urlId: 'QAZWSX7', count: '23' }
			],
			countByCountry: [
				{ country: 'United States', count: '500' },
				{ country: 'Brazil', count: '400' },
				{ country: 'India', count: '350' },
				{ country: 'Germany', count: '250' },
				{ country: 'United Kingdom', count: '225' },
				{ country: 'Canada', count: '200' },
				{ country: 'France', count: '175' },
				{ country: 'Japan', count: '150' },
				{ country: 'Australia', count: '125' },
				{ country: 'Mexico', count: '125' }
			],
			countByDevice: [
				{ device: 'Windows', count: '800' },
				{ device: 'macOS', count: '500' },
				{ device: 'Linux', count: '300' },
				{ device: 'iOS', count: '400' },
				{ device: 'Android', count: '400' },
				{ device: 'Chrome OS', count: '75' },
				{ device: 'Other', count: '25' }
			],
			countByBrowser: [
				{ browser: 'Chrome', count: '1000' },
				{ browser: 'Firefox', count: '450' },
				{ browser: 'Safari', count: '400' },
				{ browser: 'Edge', count: '300' },
				{ browser: 'Opera', count: '150' },
				{ browser: 'Brave', count: '100' },
				{ browser: 'Samsung Internet', count: '75' },
				{ browser: 'Internet Explorer', count: '25' }
			],
			countByDay: [
				{ day: new Date('2025-01-01T03:00:00.000Z'), count: '120' },
				{ day: new Date('2025-01-02T03:00:00.000Z'), count: '95' },
				{ day: new Date('2025-01-03T03:00:00.000Z'), count: '110' },
				{ day: new Date('2025-01-04T03:00:00.000Z'), count: '85' },
				{ day: new Date('2025-01-05T03:00:00.000Z'), count: '100' },
				{ day: new Date('2025-01-06T03:00:00.000Z'), count: '90' },
				{ day: new Date('2025-01-07T03:00:00.000Z'), count: '105' },
				{ day: new Date('2025-01-08T03:00:00.000Z'), count: '115' },
				{ day: new Date('2025-01-09T03:00:00.000Z'), count: '95' },
				{ day: new Date('2025-01-10T03:00:00.000Z'), count: '110' },
				{ day: new Date('2025-01-11T03:00:00.000Z'), count: '125' },
				{ day: new Date('2025-01-12T03:00:00.000Z'), count: '130' },
				{ day: new Date('2025-01-13T03:00:00.000Z'), count: '140' },
				{ day: new Date('2025-01-14T03:00:00.000Z'), count: '100' },
				{ day: new Date('2025-01-15T03:00:00.000Z'), count: '115' },
				{ day: new Date('2025-01-16T03:00:00.000Z'), count: '135' },
				{ day: new Date('2025-01-17T03:00:00.000Z'), count: '145' },
				{ day: new Date('2025-01-18T03:00:00.000Z'), count: '155' },
				{ day: new Date('2025-01-19T03:00:00.000Z'), count: '140' },
				{ day: new Date('2025-01-20T03:00:00.000Z'), count: '150' },
				{ day: new Date('2025-01-21T03:00:00.000Z'), count: '130' },
				{ day: new Date('2025-01-22T03:00:00.000Z'), count: '115' },
				{ day: new Date('2025-01-23T03:00:00.000Z'), count: '110' },
				{ day: new Date('2025-01-24T03:00:00.000Z'), count: '95' },
				{ day: new Date('2025-01-25T03:00:00.000Z'), count: '85' },
				{ day: new Date('2025-01-26T03:00:00.000Z'), count: '100' },
				{ day: new Date('2025-01-27T03:00:00.000Z'), count: '115' },
				{ day: new Date('2025-01-28T03:00:00.000Z'), count: '125' },
				{ day: new Date('2025-01-29T03:00:00.000Z'), count: '135' }
			],
			countByTimeOfDay: [
				{ hour: '00', count: '150' },
				{ hour: '06', count: '250' },
				{ hour: '12', count: '550' },
				{ hour: '15', count: '400' },
				{ hour: '18', count: '800' },
				{ hour: '21', count: '350' }
			],
			totalClicks: 2500
		}
	};
};
