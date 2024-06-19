import { DatePipe } from '@angular/common';
import { NgModule, Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timePast' })
export class TimePastPipe implements PipeTransform {

	transform(utcString: string, useDatePipe: boolean = true, pastTime: 'precise' | 'short' = 'short'): string {

		const result = pastTime === 'short' ? this.shortForm(utcString) : this.preciseForm(utcString);
		if (useDatePipe) {

			const datePipeFormatted = new DatePipe('en-US').transform(utcString, 'EEEE dd.MM.yyyy hh:mm');
			return `${datePipeFormatted} (${result})`;

		}
		return result;

	}

	private shortForm(utcString: string): string {

		const now = new Date().getTime();
		const past = new Date(utcString).getTime();
		const diffInSeconds = Math.floor((now - past) / 1000);

		if (diffInSeconds <= 20)
			return 'just now';

		if (diffInSeconds <= 90)
			return `${diffInSeconds} second${diffInSeconds > 1 ? 's' : ''} ago`;

		const diffInMinutes = Math.floor(diffInSeconds / 60);
		if (diffInMinutes <= 90)
			return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;

		const diffInHours = Math.floor(diffInMinutes / 60);
		if (diffInHours < 24)
			return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;

		const diffInDays = Math.floor(diffInHours / 24);
		if (diffInDays < 30)
			return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;

		const diffInMonths = Math.floor(diffInDays / 30);
		if (diffInMonths < 12)
			return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;

		const diffInYears = Math.floor(diffInMonths / 12);
		return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;

	}

	private preciseForm(utcString: string): string {

		const now = new Date().getTime();
		const past = new Date(utcString).getTime();
		const diffInSeconds = Math.floor((now - past) / 1000);

		const seconds = diffInSeconds % 60;
		const minutes = Math.floor((diffInSeconds / 60) % 60);
		const hours = Math.floor((diffInSeconds / 3600) % 24);
		const days = Math.floor((diffInSeconds / 86400) % 30); // Assuming a month has 30 days
		const months = Math.floor((diffInSeconds / 2592000) % 12); // Assuming a year has 12 months
		const years = Math.floor(diffInSeconds / 31536000); // Assuming a year has 365 days

		const timeParts = [];
		if (years > 0) timeParts.push(`${years}y`);
		if (months > 0) timeParts.push(`${months}m`);
		if (days > 0) timeParts.push(`${days}d`);
		if (hours > 0) timeParts.push(`${hours}h`);
		if (minutes > 0) timeParts.push(`${minutes}m`);
		if (seconds > 0) timeParts.push(`${seconds}s`);

		return timeParts.join(' ') + ' ago';

	}

}

@NgModule({

	declarations: [TimePastPipe],
	imports: [],
	exports: [TimePastPipe]

})
export class TimePastModule { }
