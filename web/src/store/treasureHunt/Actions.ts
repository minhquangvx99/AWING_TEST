import { $PropertyType } from 'utility-types';
import {
  TreasureHuntModel,
  TreasureHuntActionTypes,
  FETCH_DETAILS_TREASURE_HUNT,
  FETCH_DETAILS_TREASURE_HUNT_ERR,
  FETCH_DETAILS_TREASURE_HUNT_SUCCESS,
  FETCH_LIST_TREASURE_HUNT_PAGING,
  FETCH_LIST_TREASURE_HUNT_PAGING_ERR,
  FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS,
  SAVE_TREASURE_HUNT,
  SAVE_TREASURE_HUNT_ERR,
  DELETE_TREASURE_HUNT,
  DELETE_TREASURE_HUNT_ERR,
  UPDATE_TREASURE_HUNT_FOR_EDIT,
  DataTreasureHuntPaging,
  SAVE_TREASURE_HUNT_SUCCESS,
  DELETE_TREASURE_HUNT_SUCCESS,
} from './Types';

export const fetchListTreasureHuntPaging = (page: number, pageSize: number, matrixSearchKey: string): TreasureHuntActionTypes => {
  return {
    type: FETCH_LIST_TREASURE_HUNT_PAGING,
    payload: { page, pageSize, matrixSearchKey },
  };
};

export const fetchListTreasureHuntPagingSuccess = (payload: DataTreasureHuntPaging): TreasureHuntActionTypes => {
  return {
    type: FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS,
    payload,
  };
};

export const fetchListTreasureHuntPagingErr = (payload: string): TreasureHuntActionTypes => {
  return {
    type: FETCH_LIST_TREASURE_HUNT_PAGING_ERR,
    payload,
  };
};

export const fetchDetailsTreasureHunt = (payload: $PropertyType<TreasureHuntModel, 'Id'>): TreasureHuntActionTypes => {
  return {
    type: FETCH_DETAILS_TREASURE_HUNT,
    payload,
  };
};

export const fetchDetailsTreasureHuntSuccess = (payload: TreasureHuntModel): TreasureHuntActionTypes => {
  return {
    type: FETCH_DETAILS_TREASURE_HUNT_SUCCESS,
    payload,
  };
};

export const fetchDetailsTreasureHuntErr = (payload: string): TreasureHuntActionTypes => {
  return {
    type: FETCH_DETAILS_TREASURE_HUNT_ERR,
    payload,
  };
};

export const saveTreasureHunt = (payload: TreasureHuntModel, page: number): TreasureHuntActionTypes => {
  return {
    type: SAVE_TREASURE_HUNT,
    payload,
    page
  };
};

export const saveTreasureHuntSuccess = (): TreasureHuntActionTypes => {
  return {
    type: SAVE_TREASURE_HUNT_SUCCESS,
  };
};

export const saveTreasureHuntErr = (payload: string): TreasureHuntActionTypes => {
  return {
    type: SAVE_TREASURE_HUNT_ERR,
    payload,
  };
};

export const deleteTreasureHunt = (payload: number, page: number): TreasureHuntActionTypes => {
  return {
    type: DELETE_TREASURE_HUNT,
    payload,
    page
  };
};

export const deleteTreasureHuntSuccess = (): TreasureHuntActionTypes => {
  return {
    type: DELETE_TREASURE_HUNT_SUCCESS,
  };
};

export const deleteTreasureHuntErr = (payload: string): TreasureHuntActionTypes => {
  return {
    type: DELETE_TREASURE_HUNT_ERR,
    payload,
  };
};

export const updateTreasureHuntForEdit = (payload: TreasureHuntModel, callback: void): TreasureHuntActionTypes => {
  return {
    type: UPDATE_TREASURE_HUNT_FOR_EDIT,
    payload,
    callback
  };
};
