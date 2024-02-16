/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Volo_Abp_Application_Dtos_ListResultDto_1 } from "../models/Volo_Abp_Application_Dtos_ListResultDto_1";
import type { Volo_Abp_Application_Dtos_PagedResultDto_1 } from "../models/Volo_Abp_Application_Dtos_PagedResultDto_1";
import type { Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_ } from "../models/Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_";
import type { Volo_Abp_Identity_IdentityUserCreateDto } from "../models/Volo_Abp_Identity_IdentityUserCreateDto";
import type { Volo_Abp_Identity_IdentityUserDto } from "../models/Volo_Abp_Identity_IdentityUserDto";
import type { Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_ } from "../models/Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_";
import type { Volo_Abp_Identity_IdentityUserUpdateDto } from "../models/Volo_Abp_Identity_IdentityUserUpdateDto";
import type { Volo_Abp_Identity_IdentityUserUpdateRolesDto } from "../models/Volo_Abp_Identity_IdentityUserUpdateRolesDto";
import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";
export class UserService {
  /**
   * @param id
   * @returns Volo_Abp_Identity_IdentityUserDto Success
   * @throws ApiError
   */
  public static getApiIdentityUsers(
    id: string,
  ): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/{id}",
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
   * @returns Volo_Abp_Identity_IdentityUserDto Success
   * @throws ApiError
   */
  public static putApiIdentityUsers(
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityUserUpdateDto,
  ): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/identity/users/{id}",
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
  public static deleteApiIdentityUsers(id: string): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "DELETE",
      url: "/api/identity/users/{id}",
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
   * @param filter
   * @param sorting
   * @param skipCount
   * @param maxResultCount
   * @returns Volo_Abp_Application_Dtos_PagedResultDto_1<Volo_Abp_Identity_IdentityUserDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityUsers1(
    filter?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number,
  ): CancelablePromise<Volo_Abp_Application_Dtos_PagedResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users",
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
   * @returns Volo_Abp_Identity_IdentityUserDto Success
   * @throws ApiError
   */
  public static postApiIdentityUsers(
    requestBody?: Volo_Abp_Identity_IdentityUserCreateDto,
  ): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/api/identity/users",
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
   * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityUsersRoles(
    id: string,
  ): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/{id}/roles",
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
   * @returns any Success
   * @throws ApiError
   */
  public static putApiIdentityUsersRoles(
    id: string,
    requestBody?: Volo_Abp_Identity_IdentityUserUpdateRolesDto,
  ): CancelablePromise<any> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/api/identity/users/{id}/roles",
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
   * @returns Volo_Abp_Application_Dtos_ListResultDto_1<Volo_Abp_Identity_IdentityRoleDto_Volo_Abp_Identity_Application_Contracts_Version_8_0_2_0_Culture_neutral_PublicKeyToken_null_> Success
   * @throws ApiError
   */
  public static getApiIdentityUsersAssignableRoles(): CancelablePromise<Volo_Abp_Application_Dtos_ListResultDto_1> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/assignable-roles",
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
   * @returns Volo_Abp_Identity_IdentityUserDto Success
   * @throws ApiError
   */
  public static getApiIdentityUsersByUsername(
    userName: string,
  ): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/by-username/{userName}",
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
   * @param email
   * @returns Volo_Abp_Identity_IdentityUserDto Success
   * @throws ApiError
   */
  public static getApiIdentityUsersByEmail(
    email: string,
  ): CancelablePromise<Volo_Abp_Identity_IdentityUserDto> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/api/identity/users/by-email/{email}",
      path: {
        email: email,
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
