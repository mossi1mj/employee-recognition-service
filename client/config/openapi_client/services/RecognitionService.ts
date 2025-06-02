/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecognitionCreate } from '../models/RecognitionCreate';
import type { RecognitionResponse } from '../models/RecognitionResponse';
import type { RecognitionType } from '../models/RecognitionType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RecognitionService {
    /**
     * Post Recognition
     * @param requestBody
     * @returns RecognitionResponse Successful Response
     * @throws ApiError
     */
    public static postRecognitionRecognitionPost(
        requestBody: RecognitionCreate,
    ): CancelablePromise<RecognitionResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/recognition/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Recognitions
     * @param senderId
     * @param recipientId
     * @param limit
     * @param skip
     * @returns RecognitionResponse Successful Response
     * @throws ApiError
     */
    public static getRecognitionsRecognitionGet(
        senderId?: (number | null),
        recipientId?: (number | null),
        limit?: (number | null),
        skip?: (number | null),
    ): CancelablePromise<Array<RecognitionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recognition/',
            query: {
                'sender_id': senderId,
                'recipient_id': recipientId,
                'limit': limit,
                'skip': skip,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get User Recognitions
     * @param userId
     * @param type
     * @param limit
     * @param skip
     * @returns RecognitionResponse Successful Response
     * @throws ApiError
     */
    public static getUserRecognitionsRecognitionUserUserIdGet(
        userId: number,
        type: RecognitionType.ALL,
        limit?: (number | null),
        skip?: number,
    ): CancelablePromise<Array<RecognitionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recognition/user/{user_id}',
            path: {
                'user_id': userId,
            },
            query: {
                'type': type,
                'limit': limit,
                'skip': skip,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
