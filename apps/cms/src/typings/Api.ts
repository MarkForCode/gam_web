/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  CreateAccountDto,
  CreateAdminDto,
  CreateAnnounceDto,
  CreatePlatformDto,
  UpdateAccountDto,
  UpdateAdminDto,
  UpdateAnnounceDto,
  UpdatePlatformDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetCaptchaCode
   * @summary Get captcha ID
   * @request GET:/api/v1/backstage/login/captcha/code
   */
  loginControllerGetCaptchaCode = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/login/captcha/code`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetCaptcha
   * @summary Get captcha image
   * @request GET:/api/v1/backstage/login/captcha
   */
  loginControllerGetCaptcha = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/login/captcha`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerLogin
   * @summary Login with username, password and captcha
   * @request POST:/api/v1/backstage/login
   */
  loginControllerLogin = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/login`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetTest
   * @summary Test authentication
   * @request GET:/api/v1/backstage/login/test
   * @secure
   */
  loginControllerGetTest = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/login/test`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Platform
   * @name PlatformControllerCreate
   * @summary Create a new platform
   * @request POST:/api/v1/backstage/platform
   */
  platformControllerCreate = (
    data: CreatePlatformDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/platform`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Platform
   * @name PlatformControllerFindAll
   * @summary Get all platforms
   * @request GET:/api/v1/backstage/platform
   */
  platformControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/platform`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Platform
   * @name PlatformControllerFindOne
   * @summary Get a platform by ID
   * @request GET:/api/v1/backstage/platform/{id}
   */
  platformControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/platform/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Platform
   * @name PlatformControllerUpdate
   * @summary Update a platform
   * @request PATCH:/api/v1/backstage/platform/{id}
   */
  platformControllerUpdate = (
    id: string,
    data: UpdatePlatformDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/platform/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Platform
   * @name PlatformControllerRemove
   * @summary Delete a platform
   * @request DELETE:/api/v1/backstage/platform/{id}
   */
  platformControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/platform/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminControllerCreate
   * @summary Create new admin
   * @request POST:/api/v1/backstage/admin
   */
  adminControllerCreate = (data: CreateAdminDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/admin`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminControllerFindAll
   * @summary Get all admins
   * @request GET:/api/v1/backstage/admin
   */
  adminControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/admin`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminControllerFindOne
   * @summary Get admin by ID
   * @request GET:/api/v1/backstage/admin/{id}
   */
  adminControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/admin/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminControllerUpdate
   * @summary Update admin
   * @request PATCH:/api/v1/backstage/admin/{id}
   */
  adminControllerUpdate = (
    id: string,
    data: UpdateAdminDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/admin/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Admin
   * @name AdminControllerRemove
   * @summary Delete admin
   * @request DELETE:/api/v1/backstage/admin/{id}
   */
  adminControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/admin/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerCreate
   * @summary Create a new announcement
   * @request POST:/api/v1/backstage/announcement
   */
  announceControllerCreate = (
    data: CreateAnnounceDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/announcement`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerFindAll
   * @summary Get all announcements
   * @request GET:/api/v1/backstage/announcement
   */
  announceControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/announcement`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerFindOne
   * @summary Get an announcement by ID
   * @request GET:/api/v1/backstage/announcement/{id}
   */
  announceControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/announcement/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerUpdate
   * @summary Update an announcement
   * @request PATCH:/api/v1/backstage/announcement/{id}
   */
  announceControllerUpdate = (
    id: string,
    data: UpdateAnnounceDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/announcement/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerRemove
   * @summary Delete an announcement
   * @request DELETE:/api/v1/backstage/announcement/{id}
   */
  announceControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/announcement/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerCreate
   * @summary Create a new account
   * @request POST:/api/v1/backstage/account
   */
  accountControllerCreate = (
    data: CreateAccountDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/account`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerFindAll
   * @summary Get all accounts
   * @request GET:/api/v1/backstage/account
   */
  accountControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/account`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerFindOne
   * @summary Get an account by ID
   * @request GET:/api/v1/backstage/account/{id}
   */
  accountControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/account/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerUpdate
   * @summary Update an account
   * @request PATCH:/api/v1/backstage/account/{id}
   */
  accountControllerUpdate = (
    id: string,
    data: UpdateAccountDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/backstage/account/${id}`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerRemove
   * @summary Delete an account
   * @request DELETE:/api/v1/backstage/account/{id}
   */
  accountControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/backstage/account/${id}`,
      method: "DELETE",
      ...params,
    });
}
