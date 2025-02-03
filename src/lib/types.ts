export interface ErrorEntry {
	code: string;
	field?: string; // for the case of using it as an field error
	message: string;
	statusCode: number;
}

export type UrlSummary = {
	url: {
		id: string;
		originalUrl: string;
		creationDate: Date;
	};
	countByCountry: { country: string; count: string }[];
	countByDevice: { device: string; count: string }[];
	countByBrowser: { browser: string; count: string }[];
	countByDay: { day: Date; count: string }[];
	countByTimeOfDay: { hour: string; count: string }[];
	totalClicks: number;
};

export type UrlGeneralSummary = {
	countByUrl: { id: string; count: string }[];
	countByCountry: { country: string; count: string }[];
	countByDevice: { device: string; count: string }[];
	countByBrowser: { browser: string; count: string }[];
	countByDay: { day: Date; count: string }[];
	countByTimeOfDay: { hour: string; count: string }[];
	totalClicks: number;
};
