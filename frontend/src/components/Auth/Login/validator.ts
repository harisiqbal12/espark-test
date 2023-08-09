/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create, enforce, skipWhen, test } from 'vest';

import type { LoginProps } from './types';

export const validator = create((data: LoginProps) => {
	test('email', 'Email field required', () => {
		enforce(data.email).isNotEmpty();
	});

	test('password', 'Password field required', () => {
		enforce(data.password).isNotEmpty();
	});

	skipWhen(
		res => res.hasErrors('password'),
		() => {
			test(
				'password',
				'Password is too short',
				//@ts-ignore
				() => {
					return validatePassword(data.password);
				},
				[data.password]
			);
		}
	);

	skipWhen(
		res => res.hasErrors('email'),
		() => {
			test(
				'email',
				'Email already exists',
				//@ts-ignore
				() => {
					return validateEmail(data.email);
				},
				//@ts-ignore
				[data.email]
			);
		}
	);
});

function validateEmail(email: string) {
	return enforce(email).condition((value: string) => {
		if (!value?.includes('@') || !value?.includes('.')) {
			console.log('condition true');
			return false;
		}

		return true;
	});
}

function validatePassword(password: string) {
	return enforce(password).condition((value: string) => {
		if (value?.length < 8) {
			return false;
		}

		return true;
	});
}
