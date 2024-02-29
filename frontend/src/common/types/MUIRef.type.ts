import { RefObject } from 'react';

export type MUIRef = ((instance: HTMLDivElement | null) => void) | RefObject<HTMLDivElement> | null | undefined
