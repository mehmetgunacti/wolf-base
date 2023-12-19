import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'timePast' })
export class TimePastPipe implements PipeTransform {

	transform(utcString: string): string {

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

}
