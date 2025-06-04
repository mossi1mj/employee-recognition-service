/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecognitionCategory } from './RecognitionCategory';
import type { User } from './User';
export type RecognitionResponse = {
    id: string;
    sender: User;
    recipient: User;
    category: RecognitionCategory;
    message: (string | null);
    headline: (string | null);
    created_at: string;
};

