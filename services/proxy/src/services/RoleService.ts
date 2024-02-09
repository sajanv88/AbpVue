/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from "../models/Volo_Abp_Application_Dtos_ListResultDto_1";
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from "../models/Volo_Abp_Application_Dtos_PagedResultDto_1";
import type { Volo_Abp_Identity_IdentityRoleCreateDto } from "../models/Volo_Abp_Identity_IdentityRoleCreateDto";
import type { Volo_Abp_Identity_IdentityRoleDto } from "../models/Volo_Abp_Identity_IdentityRoleDto";
import type { Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_ } from "../models/Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_";
import type { Volo_Abp_Identity_IdentityRoleUpdateDto } from "../models/Volo_Abp_Identity_IdentityRoleUpdateDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class RoleService {
  /**
   * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityRolesAll(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/roles/all",
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
   * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityRoles(
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  ): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/roles",
      query: {
        Filter: filter,
        Sorting: sorting,
        SkipCount: skipCount,
        MaxResultCount: maxResultCount,
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
   * @returns Volo_Abp_Identity_IdentityRoleDto Success
   * @throws ApiError
   */
  public static postApiIdentityRoles(
    requestBody?: Volo_Abp_Identity_IdentityRoleCreateDto,
  ): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/identity/roles",
      body: requestBody,
      mediaType: "application/json",
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
   * @returns Volo_Abp_Identity_IdentityRoleDto Success
   * @throws ApiError
   */
  public static getApiIdentityRoles1(
    id: string,
  ): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/roles/{id}",
      path: {
        id: id,
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
   * @returns Volo_Abp_Identity_IdentityRoleDto Success
   * @throws ApiError
   */
  public static putApiIdentityRoles(
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityRoleUpdateDto,
  ): CancelablePromise<Volo_Abp_Identity_IdentityRoleDto> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/identity/roles/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
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
  public static deleteApiIdentityRoles(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/identity/roles/{id}",
      path: {
        id: id,
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
