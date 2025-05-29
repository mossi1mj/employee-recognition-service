/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Applause } from '../models/Applause';
import type { ApplauseResponse } from '../models/ApplauseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApplauseService {
    /**
     * Get Applauses
     * @returns ApplauseResponse Successful Response
     * @throws ApiError
     */
    public static getApplausesApplauseGet(): CancelablePromise<Array<ApplauseResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/applause/',
        });
    }
    /**
     * Post Applause
     * @param requestBody
     * @returns Applause Successful Response
     * @throws ApiError
     */
    public static postApplauseApplausePost(
        requestBody: Applause,
    ): CancelablePromise<Applause> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/applause/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
