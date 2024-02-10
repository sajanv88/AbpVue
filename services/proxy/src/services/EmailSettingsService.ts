/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_SettingManagement_EmailSettingsDto } from '../models/Volo_Abp_SettingManagement_EmailSettingsDto';
import type { Volo_Abp_SettingManagement_SendTestEmailInput } from '../models/Volo_Abp_SettingManagement_SendTestEmailInput';
import type { Volo_Abp_SettingManagement_UpdateEmailSettingsDto } from '../models/Volo_Abp_SettingManagement_UpdateEmailSettingsDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EmailSettingsService {
    /**
     * @returns Volo_Abp_SettingManagement_EmailSettingsDto Success
     * @throws ApiError
     */
    public static getApiSettingManagementEmailing(): CancelablePromise<Volo_Abp_SettingManagement_EmailSettingsDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/setting-management/emailing',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiSettingManagementEmailing(
        requestBody?: Volo_Abp_SettingManagement_UpdateEmailSettingsDto,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns any Success
     * @throws ApiError
     */
    public static postApiSettingManagementEmailingSendTestEmail(
        requestBody?: Volo_Abp_SettingManagement_SendTestEmailInput,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/setting-management/emailing/send-test-email',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Server Error`,
                501: `Server Error`,
            },
        });
    }
}
