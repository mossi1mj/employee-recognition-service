/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplauseCategory } from './ApplauseCategory';
export type Applause = {
    id?: string;
    sender_id: number;
    recipient_id: number;
    category: ApplauseCategory;
    message?: (string | null);
    headline?: (string | null);
};

