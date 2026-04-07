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
  AcceptInviteDto,
  ConfirmAccountDto,
  ConfirmDealApplyDto,
  ConfirmDealDto,
  CreateAccountDto,
  CreateAnnounceDto,
  CreateCommodityDto,
  CreateDealDto,
  CreateFileDto,
  CreateGuildRoleDto,
  CreateInviteDto,
  CreateTrialDto,
  CreateWalletDto,
  UpdateAccountDto,
  UpdateAnnounceDto,
  UpdateCommodityDto,
  UpdateFundDto,
  UpdateGuildRoleDto,
  UpdatePasswordDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetPlatform
   * @summary 取得平台列表
   * @request GET:/api/v1/guild/login/platform
   */
  loginControllerGetPlatform = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/login/platform`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetGuild
   * @summary 取得工會列表
   * @request GET:/api/v1/guild/login/guild
   */
  loginControllerGetGuild = (
    query: {
      platformId: string;
      key: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/login/guild`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetCaptchaCode
   * @summary 取得驗證碼id
   * @request GET:/api/v1/guild/login/captcha/code
   */
  loginControllerGetCaptchaCode = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/login/captcha/code`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerGetCaptcha
   * @summary 取得驗證碼圖像
   * @request GET:/api/v1/guild/login/captcha
   */
  loginControllerGetCaptcha = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/login/captcha`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Authentication
   * @name LoginControllerLogin
   * @summary Login
   * @request POST:/api/v1/guild/login
   * @secure
   */
  loginControllerLogin = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/login`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerCreate
   * @summary 發送建立工會成員email，僅限工會管理員
   * @request POST:/api/v1/guild/account
   */
  accountControllerCreate = (
    data: CreateAccountDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/account`,
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
   * @summary 取得工會成員列表
   * @request GET:/api/v1/guild/account
   */
  accountControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/account`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerVerify
   * @summary 工會成員點擊email 驗證信，進入建立帳號
   * @request POST:/api/v1/guild/account/verify
   */
  accountControllerVerify = (
    data: ConfirmAccountDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/verify`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerFindOne
   * @summary 取得個人資訊、狀態、工會
   * @request GET:/api/v1/guild/account/state
   */
  accountControllerFindOne = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/state`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerUpdateState
   * @summary 修改個人資訊
   * @request PUT:/api/v1/guild/account/state
   */
  accountControllerUpdateState = (
    data: UpdateAccountDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/state`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerFindOperationLog
   * @summary 取得操作日誌
   * @request GET:/api/v1/guild/account/log
   */
  accountControllerFindOperationLog = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/log`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerUpdatePasswrod
   * @summary 修改個人密碼
   * @request PATCH:/api/v1/guild/account/password
   */
  accountControllerUpdatePasswrod = (
    data: UpdatePasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/password`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerAssignRole
   * @summary 設定會員自定義角色
   * @request PATCH:/api/v1/guild/account/{id}/role
   * @secure
   */
  accountControllerAssignRole = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/${id}/role`,
      method: "PATCH",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Account
   * @name AccountControllerRemove
   * @summary 註銷成員，僅限工會管理員
   * @request DELETE:/api/v1/guild/account/{username}
   */
  accountControllerRemove = (username: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/account/${username}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerCreate
   * @summary 建立工會公告，僅限工會管理員
   * @request POST:/api/v1/guild/announce
   */
  announceControllerCreate = (
    data: CreateAnnounceDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerFindGuildAll
   * @summary 取得工會公告列表
   * @request GET:/api/v1/guild/announce/guild
   */
  announceControllerFindGuildAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce/guild`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerFindSystemAll
   * @summary 取得系統公告列表
   * @request GET:/api/v1/guild/announce/system
   */
  announceControllerFindSystemAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce/system`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerFindOne
   * @summary 取得商品資訊
   * @request GET:/api/v1/guild/announce/guild/{id}
   */
  announceControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce/guild/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Announcement
   * @name AnnounceControllerUpdate
   * @summary 修改公告，僅限管理員
   * @request PATCH:/api/v1/guild/announce/guild/{id}
   */
  announceControllerUpdate = (
    id: string,
    data: UpdateAnnounceDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce/guild/${id}`,
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
   * @summary 刪除公告，僅限管理員
   * @request DELETE:/api/v1/guild/announce/guild/{id}
   */
  announceControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/announce/guild/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Commodity
   * @name CommodityControllerCreate
   * @summary 建立商品，僅限工會管理員
   * @request POST:/api/v1/guild/commodity
   * @secure
   */
  commodityControllerCreate = (
    data: CreateCommodityDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/commodity`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Commodity
   * @name CommodityControllerFindAll
   * @summary 取得商品列表
   * @request GET:/api/v1/guild/commodity
   * @secure
   */
  commodityControllerFindAll = (
    query?: {
      title?: string;
      type?: string;
      status?: string;
      publicLevel?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/commodity`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Commodity
   * @name CommodityControllerFindOne
   * @summary 取得商品資訊
   * @request GET:/api/v1/guild/commodity/{id}
   * @secure
   */
  commodityControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/commodity/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Commodity
   * @name CommodityControllerUpdate
   * @summary 修改商品，僅限工會管理員
   * @request PATCH:/api/v1/guild/commodity/{id}
   * @secure
   */
  commodityControllerUpdate = (
    id: string,
    data: UpdateCommodityDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/commodity/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Commodity
   * @name CommodityControllerRemove
   * @summary 刪除商品，僅限工會管理員
   * @request DELETE:/api/v1/guild/commodity/{id}
   * @secure
   */
  commodityControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/commodity/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerFindGuildAll
   * @summary 取得工會商品列表
   * @request GET:/api/v1/guild/deal
   */
  dealControllerFindGuildAll = (
    query: {
      status: string;
      commodityId: string;
      name: string;
      current: number;
      pageSize: number;
      cursor: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerCreateApply
   * @summary 買方申請購買商品
   * @request POST:/api/v1/guild/deal
   */
  dealControllerCreateApply = (
    data: CreateDealDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerUpdate
   * @summary 賣方確認申請交易
   * @request PUT:/api/v1/guild/deal
   */
  dealControllerUpdate = (
    data: ConfirmDealApplyDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerSellerVerify
   * @summary 賣方確認交易
   * @request PATCH:/api/v1/guild/deal
   */
  dealControllerSellerVerify = (
    data: ConfirmDealDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerFindSelfAll
   * @summary 取得我的購買清單
   * @request GET:/api/v1/guild/deal/own
   */
  dealControllerFindSelfAll = (
    query: {
      status: string;
      commodityId: string;
      name: string;
      current: number;
      pageSize: number;
      cursor: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal/own`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags Deal
   * @name DealControllerBuyserVerify
   * @summary 買方確認交易
   * @request PATCH:/api/v1/guild/deal/own
   */
  dealControllerBuyserVerify = (
    data: ConfirmDealDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/deal/own`,
      method: "PATCH",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Wallet
   * @name WalletControllerWithdraw
   * @summary 申請提款
   * @request POST:/api/v1/guild/wallet/withdraw
   * @secure
   */
  walletControllerWithdraw = (
    data: CreateWalletDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/wallet/withdraw`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Wallet
   * @name WalletControllerFindWithdraw
   * @summary 查詢申請狀態
   * @request GET:/api/v1/guild/wallet/withdraw
   * @secure
   */
  walletControllerFindWithdraw = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/wallet/withdraw`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Wallet
   * @name WalletControllerTransfer
   * @summary 轉帳
   * @request POST:/api/v1/guild/wallet/transfer
   * @secure
   */
  walletControllerTransfer = (
    data: CreateWalletDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/wallet/transfer`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Wallet
   * @name WalletControllerRemove
   * @summary 刪除申請
   * @request DELETE:/api/v1/guild/wallet/{id}
   * @secure
   */
  walletControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/wallet/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerCreate
   * @summary 上傳檔案
   * @request POST:/api/v1/guild/file
   */
  fileControllerCreate = (data: CreateFileDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/file`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerFindAll
   * @summary 取得預簽署網址
   * @request GET:/api/v1/guild/file/presigned
   */
  fileControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/file/presigned`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags File
   * @name FileControllerRemove
   * @summary 刪除檔案
   * @request DELETE:/api/v1/guild/file/{id}
   */
  fileControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/file/${id}`,
      method: "DELETE",
      ...params,
    });
  /**
   * No description
   *
   * @tags Fund
   * @name FundControllerFindFund
   * @summary 查詢
   * @request GET:/api/v1/guild/fund/state
   * @secure
   */
  fundControllerFindFund = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/fund/state`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Fund
   * @name FundControllerFindLog
   * @summary 查詢Log
   * @request GET:/api/v1/guild/fund/log
   * @secure
   */
  fundControllerFindLog = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/fund/log`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Fund
   * @name FundControllerFindWithdrawApplicant
   * @summary 查詢申請狀態
   * @request GET:/api/v1/guild/fund/withdraw/applicant
   * @secure
   */
  fundControllerFindWithdrawApplicant = (params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/fund/withdraw/applicant`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Fund
   * @name FundControllerUpdate
   * @summary 確認申請狀態, 僅限工會管理員
   * @request PATCH:/api/v1/guild/fund/withdraw/applicant/{id}
   * @secure
   */
  fundControllerUpdate = (
    id: string,
    data: UpdateFundDto,
    params: RequestParams = {},
  ) =>
    this.request<void, void>({
      path: `/api/v1/guild/fund/withdraw/applicant/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Fund
   * @name FundControllerRemove
   * @summary 刪除申請
   * @request DELETE:/api/v1/guild/fund/withdraw/applicant/{id}
   * @secure
   */
  fundControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/v1/guild/fund/withdraw/applicant/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Trial
   * @name TrialControllerCreate
   * @summary 申請帳號，建立公會、成員
   * @request POST:/api/v1/guild/trial
   */
  trialControllerCreate = (data: CreateTrialDto, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/trial`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerCreate
   * @summary Create custom guild role
   * @request POST:/api/v1/guild/role
   * @secure
   */
  guildRoleControllerCreate = (
    data: CreateGuildRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/role`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerFindAll
   * @summary Get all guild roles
   * @request GET:/api/v1/guild/role
   * @secure
   */
  guildRoleControllerFindAll = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/role`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerFindOne
   * @summary Get guild role by ID
   * @request GET:/api/v1/guild/role/{id}
   * @secure
   */
  guildRoleControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/role/${id}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerUpdate
   * @summary Update guild role
   * @request PATCH:/api/v1/guild/role/{id}
   * @secure
   */
  guildRoleControllerUpdate = (
    id: string,
    data: UpdateGuildRoleDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/role/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerRemove
   * @summary Delete guild role
   * @request DELETE:/api/v1/guild/role/{id}
   * @secure
   */
  guildRoleControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/role/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags GuildRole
   * @name GuildRoleControllerSetDefault
   * @summary Set role as default for new members
   * @request POST:/api/v1/guild/role/{id}/set-default
   * @secure
   */
  guildRoleControllerSetDefault = (id: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/role/${id}/set-default`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Invite
   * @name InviteControllerCreate
   * @summary Create invitation
   * @request POST:/api/v1/guild/invite
   * @secure
   */
  inviteControllerCreate = (
    data: CreateInviteDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/invite`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Invite
   * @name InviteControllerAccept
   * @summary Accept invitation and register
   * @request POST:/api/v1/guild/invite/accept
   */
  inviteControllerAccept = (
    data: AcceptInviteDto,
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/v1/guild/invite/accept`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Invite
   * @name InviteControllerGetByCode
   * @summary Get invite details by code
   * @request GET:/api/v1/guild/invite/{code}
   */
  inviteControllerGetByCode = (code: string, params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/v1/guild/invite/${code}`,
      method: "GET",
      ...params,
    });
}
