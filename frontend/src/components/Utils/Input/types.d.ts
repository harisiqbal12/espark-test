/* eslint-disable @typescript-eslint/no-explicit-any */
import { HTMLProps } from 'react';

export interface InputTypes extends HTMLProps<HTMLInputElement> {
	label: string;
	errorField?: boolean;
	hookProps?: any;
	message?: string | null;
}
