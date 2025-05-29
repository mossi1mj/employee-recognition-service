/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplauseCreate } from '../models/ApplauseCreate';
import type { ApplauseResponse } from '../models/ApplauseResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ApplauseService {
    /**
     * Post Applause
     * @param requestBody
     * @returns ApplauseResponse Successful Response
     * @throws ApiError
     */
    public static postApplauseApplausePost(
        requestBody: ApplauseCreate,
    ): CancelablePromise<ApplauseResponse> {
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
    /**
     * Get Applauses
     * @param senderId
     * @param recipientId
     * @returns ApplauseResponse Successful Response
     * @throws ApiError
     */
    public static getApplausesApplauseGet(
        senderId?: (number | null),
        recipientId?: (number | null),
    ): CancelablePromise<Array<ApplauseResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/applause/',
            query: {
                'sender_id': senderId,
                'recipient_id': recipientId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
