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

export interface CreateAccountDto {
  email: string;
}

export interface ConfirmAccountDto {
  ticketId: string;
  username: string;
  password: string;
  nickname: string;
}

export interface UpdateAccountDto {
  nickname: string;
  avatar: string;
  email: string;
  phone: string;
  signature: string;
}

export type UpdatePasswordDto = object;

export type CreateAnnounceDto = object;

export type UpdateAnnounceDto = object;

export interface CreateCommodityDto {
  title: string;
  type: string;
  content?: string;
  file?: string;
  basicPrice: number;
  apportions?: string[];
}

export interface UpdateCommodityDto {
  title?: string;
  type?: string;
  content?: string;
  file?: string;
  basicPrice?: number;
  apportions?: string[];
}

export interface CreateDealDto {
  commodityId: string;
  bid: number;
}

export interface ConfirmDealApplyDto {
  commodityId?: string;
  bid?: number;
  buyerId: string;
}

export interface ConfirmDealDto {
  id: string;
  tax: number;
}

export type CreateWalletDto = object;

export type CreateFileDto = object;

export type UpdateFundDto = object;

export type CreateTrialDto = object;
