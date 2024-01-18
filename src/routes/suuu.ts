import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

const schemaA = z.object({
	first_name: z.string(),
	last_name: z.string()
});

const withA = z.object({
	isRequired: z.literal(false),
	a: schemaA
});
const withB = z.object({
	isRequired: z.literal(true),
	a: schemaA,
	b: schemaA
});

const schema = z.object({ doggo: z.discriminatedUnion('isRequired', [withA, withB]) });

export const load: PageServerLoad = async () => {
	const superForm = await superValidate(
		{
			doggo: {
				isRequired: false,
				a: {
					first_name: 'kutya',
					last_name: 'nanana',
					isRequired: false
				},
				b: {
					first_name: '',
					last_name: ''
				}
			}
		},
		schema
	);
	console.log('+page.server.ts', { superForm });
	return { superForm };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const superForm = await superValidate(request, schema);
		if (!superForm.valid) return fail(401, { superForm });
		return { superForm };
	}
};
