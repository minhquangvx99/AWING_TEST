import { put, takeEvery } from 'redux-saga/effects';
import { ApiResponse, apiCall, apiDeleteCall, apiGetCall, apiPostCall } from 'store/saga-effects/api';
import { fetchDetailsTreasureHuntSuccess, fetchDetailsTreasureHuntErr, fetchListTreasureHuntPagingSuccess, fetchListTreasureHuntPagingErr, fetchListTreasureHuntPaging, saveTreasureHuntSuccess, saveTreasureHuntErr, deleteTreasureHuntSuccess, deleteTreasureHuntErr } from './Actions';
import {
  DELETE_TREASURE_HUNT,
  DeleteTreasureHuntAction,
  FETCH_DETAILS_TREASURE_HUNT,
  FETCH_LIST_TREASURE_HUNT_PAGING,
  FetchDetailsTreasureHuntAction,
  FetchListTreasureHuntPagingAction,
  SAVE_TREASURE_HUNT,
  SaveTreasureHuntAction,
} from './Types'
import { openNotification } from 'utility/Utility';
import { API_ENDPOINT_TREASURE_HUNT, API_ENDPOINT_DETAILS_TREASURE_HUNT, prepare } from 'services/Endpoints';

function* fetchListTreasureHuntPagingSaga(action: FetchListTreasureHuntPagingAction) {
  try {
    const response: ApiResponse<any> = yield apiCall(
      apiGetCall,
      prepare(API_ENDPOINT_TREASURE_HUNT,
        {},
        {
          pageIndex: action.payload.page,
          pageSize: action.payload.pageSize,
          matrixSearchKey: action.payload.matrixSearchKey
        }),
    );

    if (response.data && response.data.Success) {
      yield put(fetchListTreasureHuntPagingSuccess(response.data.Data));
    } else {
      yield put(fetchListTreasureHuntPagingErr('Get List TreasureHunt Failed'));
      openNotification('error', '', 'Get List TreasureHunt Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(fetchListTreasureHuntPagingErr('Get List TreasureHunt Failed'));
    openNotification('error', '', 'Get List TreasureHunt Failed')
  }
}

function* fetchDetailsTreasureHuntSaga(action: FetchDetailsTreasureHuntAction) {
  try {
    if (action.payload) {
      const response: ApiResponse<any> =
        yield apiCall(apiGetCall, prepare(API_ENDPOINT_DETAILS_TREASURE_HUNT, { TreasureHuntId: action.payload }, {}));

      if (response.data && response.data.Success) {
        yield put(fetchDetailsTreasureHuntSuccess(response.data.Data));
      } else {
        yield put(fetchDetailsTreasureHuntErr('Get Details TreasureHunt Failed'));
      }
    } else {
      yield put(fetchDetailsTreasureHuntErr('Get Details TreasureHunt Failed'));
    }
  } catch (error) {
    console.log(error);
    yield put(fetchDetailsTreasureHuntErr('Get Details TreasureHunt Failed'));
  }
}

function* saveTreasureHuntSaga(action: SaveTreasureHuntAction) {
  try {
    const response: ApiResponse<any> =
      yield apiCall(
        apiPostCall,
        API_ENDPOINT_TREASURE_HUNT,
        !action.payload.Id ? action.payload : { ...action.payload }
      );

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTreasureHuntPaging(1, 10, ''))
      yield put(saveTreasureHuntSuccess())
      openNotification('success', 'Success', 'Solve successfully')
    } else {
      yield put(saveTreasureHuntErr('Solve Failed'));
      openNotification('error', '', 'Solve Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(saveTreasureHuntErr('Solve Failed'));
    openNotification('error', '', 'Solve Failed')
  }
}

function* deleteTreasureHuntSaga(action: DeleteTreasureHuntAction) {
  try {
    const response: ApiResponse<any> = 
      yield apiCall(apiDeleteCall, `${API_ENDPOINT_TREASURE_HUNT}?treasureHuntId=${action.payload}`, {});

    if (response.data && response.data.Success) {
      if (action.page === 1) yield put(fetchListTreasureHuntPaging(1, 10, ''))
      yield put(deleteTreasureHuntSuccess())
      openNotification('success', 'Success', 'Deleted successfully')
    } else {
      yield put(deleteTreasureHuntErr('Delete Failed'));
      openNotification('error', '', 'Delete Failed')
    }
  } catch (error) {
    console.log(error);
    yield put(deleteTreasureHuntErr('Delete Failed'));
  }
}

export function* watchTreasureHuntActions() {
  yield takeEvery(FETCH_LIST_TREASURE_HUNT_PAGING, fetchListTreasureHuntPagingSaga);
  yield takeEvery(FETCH_DETAILS_TREASURE_HUNT, fetchDetailsTreasureHuntSaga);
  yield takeEvery(SAVE_TREASURE_HUNT, saveTreasureHuntSaga);
  yield takeEvery(DELETE_TREASURE_HUNT, deleteTreasureHuntSaga);
}
