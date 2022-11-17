import { openai } from './client';

export const getPromptCompletion = async (
	prompt: string,
	settings: any,
): Promise<any> => {
	const other: any = {
		model: 'text-davinci-002',
		...settings,
		stop: settings.stops,
	};

	if (settings.stops.length === 0) {
		delete other.stop;
	}
	delete other.stops;

	try {
		const completion = await openai.createCompletion({
			...other,
			prompt,
		});

		return completion.data.choices?.[0];
	} catch (error) {
		console.log('CREATE COMPLETION ERROR');
	}
};
