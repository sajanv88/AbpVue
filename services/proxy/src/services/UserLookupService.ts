/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from "../models/Volo_Abp_Application_Dtos_ListResultDto_1";
import type { Volo_Abp_Users_UserData } from "../models/Volo_Abp_Users_UserData";
import type { Volo_Abp_Users_UserData_Volo_Abp_Users_Abstractions_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_ } from "../models/Volo_Abp_Users_UserData_Volo_Abp_Users_Abstractions_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserLookupService {
  /**
   * @param id
   * @returns Volo_Abp_Users_UserData Success
   * @throws ApiError
   */
  public static getApiIdentityUsersLookup(
    id: string,
  ): CancelablePromise<Volo_Abp_Users_UserData> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/lookup/{id}",
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
   * @param userName
   * @returns Volo_Abp_Users_UserData Success
   * @throws ApiError
   */
  public static getApiIdentityUsersLookupByUsername(
    userName: string,
  ): CancelablePromise<Volo_Abp_Users_UserData> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/lookup/by-username/{userName}",
      path: {
        userName: userName,
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
   * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Users_UserData_Volo_Abp_Users_Abstractions_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityUsersLookupSearch(
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  ): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/lookup/search",
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
   * @param filter
   * @returns number Success
   * @throws ApiError
   */
  public static getApiIdentityUsersLookupCount(
    filter?: string,
  ): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/lookup/count",
      query: {
        Filter: filter,
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
