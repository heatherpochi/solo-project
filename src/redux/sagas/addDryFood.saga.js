import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';


function* addDryFood(action) {
  console.log('in add dry food saga');
  console.log('action.payload is', action.payload);
  try { 
    const response = yield axios.post('api/foods/dry', action.payload);
    console.log('response is', response);
    const catsFoodsObject = {
      cat_id: action.payload.cat_id,
      food_id: response.data[0].id
    }
    console.log('catsFoodsObject is', catsFoodsObject);
    yield axios.post ('api/cats_foods',catsFoodsObject);
    yield axios.put (`api/foods/${catsFoodsObject.food_id}`, catsFoodsObject);
    
    // yield put({type:'FETCH_FOODS'})
  } catch (error) {
    console.log('add dry food request failed', error);
  }
}

function* addDryFoodSaga() {
  yield takeEvery('ADD_DRY_FOOD', addDryFood);
}

export default addDryFoodSaga;
