import { NullableString } from 'types/Global';
import { $PropertyType } from 'utility-types';

export interface TreasureHuntModel {
  Id?: number;
  NRow?: number;
  MColumn?: number;
  P?: number;
  Matrix?: NullableString;
  Path?: NullableString;
  MinimumFuel?: number;
  CreatedDate?: NullableString;
  ModifiedDate?: NullableString;
}

export interface SolveModel {
  Id?: number;
  NRow?: number;
  MColumn?: number;
  P?: number;
  Matrix?: number[][];
}

export interface DataTreasureHuntPaging {
  listSolveHistory?: TreasureHuntModel[];
  totalRow?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface TreasureHuntState {
  dataPaging?: DataTreasureHuntPaging;
  treasureHuntForEdit?: TreasureHuntModel;
  loading?: boolean;
  error?: string;
}

export const FETCH_LIST_TREASURE_HUNT_PAGING = 'FETCH_LIST_TREASURE_HUNT_PAGING';
export const FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS = 'FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS';
export const FETCH_LIST_TREASURE_HUNT_PAGING_ERR = 'FETCH_LIST_TREASURE_HUNT_PAGING_ERR';
export const FETCH_DETAILS_TREASURE_HUNT = 'FETCH_DETAILS_TREASURE_HUNT';
export const FETCH_DETAILS_TREASURE_HUNT_SUCCESS = 'FETCH_DETAILS_TREASURE_HUNT_SUCCESS';
export const FETCH_DETAILS_TREASURE_HUNT_ERR = 'FETCH_DETAILS_TREASURE_HUNT_ERR';
export const SAVE_TREASURE_HUNT = 'SAVE_TREASURE_HUNT';
export const SAVE_TREASURE_HUNT_SUCCESS = 'SAVE_TREASURE_HUNT_SUCCESS';
export const SAVE_TREASURE_HUNT_ERR = 'SAVE_TREASURE_HUNT_ERR';
export const DELETE_TREASURE_HUNT_SUCCESS = 'DELETE_TREASURE_HUNT_SUCCESS';
export const DELETE_TREASURE_HUNT = 'DELETE_TREASURE_HUNT';
export const DELETE_TREASURE_HUNT_ERR = 'DELETE_TREASURE_HUNT_ERR';
export const UPDATE_TREASURE_HUNT_FOR_EDIT = 'UPDATE_TREASURE_HUNT_FOR_EDIT';

export interface FetchListTreasureHuntPagingAction {
  type: typeof FETCH_LIST_TREASURE_HUNT_PAGING;
  payload: {
    page: number;
    pageSize: number;
    matrixSearchKey: string;
  };
}

export interface FetchListTreasureHuntPagingSuccessAction {
  type: typeof FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS;
  payload: DataTreasureHuntPaging;
}

export interface FetchListTreasureHuntPagingErrorAction {
  type: typeof FETCH_LIST_TREASURE_HUNT_PAGING_ERR;
  payload: string;
}

export interface FetchDetailsTreasureHuntAction {
  type: typeof FETCH_DETAILS_TREASURE_HUNT;
  payload: $PropertyType<TreasureHuntModel, 'Id'>;
}

export interface FetchDetailsTreasureHuntSuccessAction {
  type: typeof FETCH_DETAILS_TREASURE_HUNT_SUCCESS;
  payload: TreasureHuntModel;
}

export interface FetchDetailsTreasureHuntErrorAction {
  type: typeof FETCH_DETAILS_TREASURE_HUNT_ERR;
  payload: string;
}

export interface SaveTreasureHuntAction {
  type: typeof SAVE_TREASURE_HUNT;
  payload: TreasureHuntModel;
  page: number;
}

export interface SaveTreasureHuntSuccessAction {
  type: typeof SAVE_TREASURE_HUNT_SUCCESS;
}

export interface SaveTreasureHuntErrorAction {
  type: typeof SAVE_TREASURE_HUNT_ERR;
  payload: string;
}

export interface DeleteTreasureHuntAction {
  type: typeof DELETE_TREASURE_HUNT;
  payload: number;
  page: number;
}

export interface DeleteTreasureHuntSuccessAction {
  type: typeof DELETE_TREASURE_HUNT_SUCCESS;
}

export interface DeleteTreasureHuntErrorAction {
  type: typeof DELETE_TREASURE_HUNT_ERR;
  payload: string;
}

export interface UpdateTreasureHuntForEditAction {
  type: typeof UPDATE_TREASURE_HUNT_FOR_EDIT;
  payload: TreasureHuntModel;
  callback: void;
}


export type TreasureHuntActionTypes =
  | FetchListTreasureHuntPagingAction
  | FetchListTreasureHuntPagingSuccessAction
  | FetchListTreasureHuntPagingErrorAction
  | FetchDetailsTreasureHuntAction
  | FetchDetailsTreasureHuntSuccessAction
  | FetchDetailsTreasureHuntErrorAction
  | SaveTreasureHuntAction
  | SaveTreasureHuntSuccessAction
  | SaveTreasureHuntErrorAction
  | DeleteTreasureHuntAction
  | DeleteTreasureHuntSuccessAction
  | DeleteTreasureHuntErrorAction
  | UpdateTreasureHuntForEditAction;

