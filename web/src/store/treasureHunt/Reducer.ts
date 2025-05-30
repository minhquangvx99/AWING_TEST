/*
 * This file is part of OrangeHRM
 *
 * Copyright (C) 2020 onwards OrangeHRM (https://www.orangehrm.com/)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

import {
  TreasureHuntActionTypes,
  TreasureHuntState,
  DELETE_TREASURE_HUNT,
  DELETE_TREASURE_HUNT_ERR,
  FETCH_LIST_TREASURE_HUNT_PAGING,
  FETCH_LIST_TREASURE_HUNT_PAGING_ERR,
  FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS,
  SAVE_TREASURE_HUNT,
  SAVE_TREASURE_HUNT_ERR,
  UPDATE_TREASURE_HUNT_FOR_EDIT,
  SAVE_TREASURE_HUNT_SUCCESS,
  DELETE_TREASURE_HUNT_SUCCESS,
} from './Types';

const initialState: TreasureHuntState = {};


const treasureHuntReducer = (state = initialState, action: TreasureHuntActionTypes): TreasureHuntState => {
  switch (action.type) {
    case FETCH_LIST_TREASURE_HUNT_PAGING:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIST_TREASURE_HUNT_PAGING_SUCCESS:
      return {
        ...state,
        loading: false,
        dataPaging: action.payload,
      };
    case FETCH_LIST_TREASURE_HUNT_PAGING_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SAVE_TREASURE_HUNT:
      return {
        ...state,
        loading: true,
      };
    case SAVE_TREASURE_HUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case SAVE_TREASURE_HUNT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case DELETE_TREASURE_HUNT:
      return {
        ...state,
        loading: true,
      };
    case DELETE_TREASURE_HUNT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case DELETE_TREASURE_HUNT_ERR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_TREASURE_HUNT_FOR_EDIT:
      return {
        ...state,
        treasureHuntForEdit: action.payload,
      };
    default:
      return state;
  }
};

export default treasureHuntReducer;
