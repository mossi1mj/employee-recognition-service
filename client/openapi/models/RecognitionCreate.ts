/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecognitionCategory } from './RecognitionCategory';
export type RecognitionCreate = {
    sender_id: number;
    recipient_id: number;
    category: RecognitionCategory;
    message?: (string | null);
};

