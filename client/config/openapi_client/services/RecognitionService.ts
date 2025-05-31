/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RecognitionCreate } from '../models/RecognitionCreate';
import type { RecognitionResponse } from '../models/RecognitionResponse';
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
     * @returns RecognitionResponse Successful Response
     * @throws ApiError
     */
    public static getRecognitionsRecognitionGet(
        senderId?: (number | null),
        recipientId?: (number | null),
    ): CancelablePromise<Array<RecognitionResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/recognition/',
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
