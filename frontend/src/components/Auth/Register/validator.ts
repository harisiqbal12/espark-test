/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { create, enforce, skipWhen, test } from 'vest';

import type { RegisterProps } from './types';

export const validator = create((data: RegisterProps) => {
	test('name', 'name field required', () => {
		enforce(data.name).isNotEmpty();
	});

	test('email', 'email field required', () => {
		enforce(data.email).isNotEmpty();
	});

	test('password', 'password field required', () => {
		enforce(data.password).isNotEmpty();
	});

	test('passwordConfirm', 'password confirm field required', () => {
		enforce(data.passwordConfirm).isNotEmpty();
	});

	skipWhen(
		res => res.hasErrors('name'),
		() => {
			test(
				'name',
				'name is too long',
				//@ts-ignore
				() => {
					return validName(data.name);
				},
				[data.name]
			);
		}
	);

	skipWhen(
		res => res.hasErrors('email'),
		() => {
			test(
				'email',
				'invalid email',
				//@ts-ignore
				() => {
					return validateEmail(data.email);
				},
				[data.email]
			);
		}
	);

	skipWhen(
		res => res.hasErrors('passwordConfirm'),
		() => {
			test(
				'passwordConfirm',
				'password is too short',
				//@ts-ignore
				() => {
					return shortPassword(data.password);
				},
				[data.passwordConfirm]
			);
		}
	);

	skipWhen(
		res => res.hasErrors('password'),
		() => {
			test(
				'password',
				'password is too short',
				//@ts-ignore
				() => {
					return shortPassword(data.password);
				},
				[data.password]
			);
		}
	);

	skipWhen(
		res => res.hasErrors('passwordConfirm'),
		() => {
			test(
				'passwordConfirm',
				'password is not matched',
				//@ts-ignore
				() => {
					return isMatchPassword(data.password, data.passwordConfirm);
				},
				[data.password, data.passwordConfirm]
			);
		}
	);
});

function isMatchPassword(password: string, confirmPassword: string) {
	return enforce(confirmPassword).condition(() => {
		if (password === confirmPassword) {
			return true;
		}

		return false;
	});
}

function shortPassword(password: string) {
	return enforce(password).condition(val => {
		if (val?.length < 8) {
			return false;
		}

		return true;
	});
}

function validateEmail(email: string) {
	return enforce(email).condition((value: string) => {
		if (!value?.includes('@') || !value?.includes('.')) {
			console.log('condition true');
			return false;
		}

		return true;
	});
}

function validName(name: string) {
	return enforce(name).condition(value => {
		if (value?.length > 20) {
			return false;
		}

		return true;
	});
}
