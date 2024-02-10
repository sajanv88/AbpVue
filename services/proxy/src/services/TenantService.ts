/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from '../models/Volo_Abp_Application_Dtos_PagedResultDto_1';
import type { Volo_Abp_TenantManagement_TenantCreateDto } from '../models/Volo_Abp_TenantManagement_TenantCreateDto';
import type { Volo_Abp_TenantManagement_TenantDto } from '../models/Volo_Abp_TenantManagement_TenantDto';
import type { Volo_Abp_TenantManagement_TenantDto_Volo_Abp_TenantManagement_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_ } from '../models/Volo_Abp_TenantManagement_TenantDto_Volo_Abp_TenantManagement_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_';
import type { Volo_Abp_TenantManagement_TenantUpdateDto } from '../models/Volo_Abp_TenantManagement_TenantUpdateDto';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TenantService {
    /**
     * @param id
     * @returns Volo_Abp_TenantManagement_TenantDto Success
     * @throws ApiError
     */
    public static getApiMultiTenancyTenants(
        id: string,
    ): CancelablePromise<Volo_Abp_TenantManagement_TenantDto> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}',
            path: {
                'id': id,
            },
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
     * @param id
     * @param requestBody
     * @returns Volo_Abp_TenantManagement_TenantDto Success
     * @throws ApiError
     */
    public static putApiMultiTenancyTenants(
        id: string,
        requestBody?: Volo_Abp_TenantManagement_TenantUpdateDto,
    ): CancelablePromise<Volo_Abp_TenantManagement_TenantDto> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}',
            path: {
                'id': id,
            },
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
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiMultiTenancyTenants(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}',
            path: {
                'id': id,
            },
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
     * @param filter
     * @param sorting
     * @param skipCount
     * @param maxResultCount
     * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_TenantManagement_TenantDto_Volo_Abp_TenantManagement_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
     * @throws ApiError
     */
    public static getApiMultiTenancyTenants1(
        filter?: string,
        sorting?: string,
        skipCount?: number,
        maxResultCount?: number,
    ): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants',
            query: {
                'Filter': filter,
                'Sorting': sorting,
                'SkipCount': skipCount,
                'MaxResultCount': maxResultCount,
            },
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
     * @returns Volo_Abp_TenantManagement_TenantDto Success
     * @throws ApiError
     */
    public static postApiMultiTenancyTenants(
        requestBody?: Volo_Abp_TenantManagement_TenantCreateDto,
    ): CancelablePromise<Volo_Abp_TenantManagement_TenantDto> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/multi-tenancy/tenants',
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
     * @param id
     * @returns string Success
     * @throws ApiError
     */
    public static getApiMultiTenancyTenantsDefaultConnectionString(
        id: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
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
     * @param id
     * @param defaultConnectionString
     * @returns any Success
     * @throws ApiError
     */
    public static putApiMultiTenancyTenantsDefaultConnectionString(
        id: string,
        defaultConnectionString?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
            query: {
                'defaultConnectionString': defaultConnectionString,
            },
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
     * @param id
     * @returns any Success
     * @throws ApiError
     */
    public static deleteApiMultiTenancyTenantsDefaultConnectionString(
        id: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/multi-tenancy/tenants/{id}/default-connection-string',
            path: {
                'id': id,
            },
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
