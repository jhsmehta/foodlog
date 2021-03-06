import { foodSearchUrl } from '../lib/resource'
import axios from 'axios'
import dateFns from 'date-fns'

export const LIST_ALL = 'LIST_ALL'
export const SEARCH_FOOD = 'SEARCH_FOOD'
export const SEARCH_RESULTS = 'SEARCH_RESULTS'
export const NO_RESULTS = 'NO_RESULTS'
export const FOOD_DETAIL = 'FOOD_DETAIL'
export const ADD_EVENT = 'ADD_EVENT'
export const SAVE_FOOD = 'SAVE_FOOD'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const ADD_MEAL = 'ADD_MEAL'
export const NEXT_DAY = 'NEXT_DAY'
export const PREV_DAY = 'PREV_DAY'
export const TODAY = 'TODAY'
export const FINISH = 'FINISH'

export const finishDay = (finishDay) => {
  return({
    type: FINISH,
    payload: finishDay
  })
}

export const setToday = () => {
  const setToday = new Date()

  return({
    type: TODAY,
    payload: setToday
  })
}

export const nextDay = (currentday) => {
  const nextday = dateFns.addDays(currentday, 1)
  return({
    type: NEXT_DAY,
    payload: nextday
  })
}

export const prevDay = (currentday) => {
  const prevday = dateFns.subDays(currentday, 1)
  return({
    type: NEXT_DAY,
    payload: prevday
  })
}

export const saveFood = (food, qty) => {
  food.calories = food.calories * qty

  return({
    type: SAVE_FOOD,
    payload: {
      food,
      qty
    }
  })
}

export const closeModal = () => {
  return({
    type: CLOSE_MODAL
  })
}

export const addEvent = (newevent) => {
  return ({
    type: ADD_EVENT,
    payload: newevent
  })
}

export const addMeal = (meal, currentDay, food) => {
  return({
    type: ADD_MEAL,
    payload: {
      currentMeal: meal,
      currentDay,
      show: true
    }
  })
}

export const searchFood = (text) => {
  return async (dispatch) => {
    try {
      const result = await axios.get(foodSearchUrl + text)

      dispatch({
        type: SEARCH_RESULTS,
        payload: result.data
      })

    } catch (error) {
      dispatch({
        type: NO_RESULTS
      })
    }
  }
}

export const foodDetail = (food) => {
  return({
    type: FOOD_DETAIL,
    payload: food
  })
}

