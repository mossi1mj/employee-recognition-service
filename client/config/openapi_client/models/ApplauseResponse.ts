/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplauseCategory } from './ApplauseCategory';
import type { User } from './User';
export type ApplauseResponse = {
    id: string;
    sender: User;
    recipient: User;
    category: ApplauseCategory;
    message: (string | null);
    headline: (string | null);
};

