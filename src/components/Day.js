import React, { Component } from 'react'
import dateFns from 'date-fns'
import { connect } from 'react-redux'
import { addMeal, nextDay, prevDay, setToday, finishDay } from '../actions/index';
import MealSection from './MealSection'

class Day extends Component {

  state = {
    currentDay: '',
    meal: '',
    food: {},
    formattedDate: '',
    filterFoods: [],
    completeDay: false
  }

  setToday = () => {
    this.props.setToday()
  }

  nextDay = () => {
    this.props.nextDay(this.props.currentDay)
  }

  prevDay = () => {
    this.props.prevDay(this.props.currentDay)
  }

  clickMeal = (meal) => {
    if (!this.state.completeDay) {
      this.props.addMeal(meal)
    } else {
      console.log('sorry! complete')
    }
  }

  doneEating = () => {
    this.props.finishDay(this.props.currentDay)
  }

  componentWillReceiveProps(nextProps) {
    const { currentDay } = nextProps
    const dateFormat = 'MMMM D, YYYY'
    const formattedDate = dateFns.format(currentDay, dateFormat)

    let foodList = []

    if (nextProps.mealList.length <= 0) {
      foodList = JSON.parse(localStorage.getItem('foods')) || []
    } else {
      foodList = nextProps.mealList
    }

    const filterFoods = foodList.filter(item => dateFns.isSameDay(item.day, currentDay))
    let completeDay = filterFoods.length >= 1 ? filterFoods[0].complete : false


    this.setState({
      currentDay,
      formattedDate,
      filterFoods,
      completeDay
    })
  }

  componentDidMount() {
    const { currentDay } = this.props
    const dateFormat = 'MMMM D, YYYY'
    const formattedDate = dateFns.format(currentDay, dateFormat)

    let foodList = []

    if (this.props.mealList.length <= 0) {
      foodList = JSON.parse(localStorage.getItem('foods')) || []
    } else {
      foodList = this.props.mealList
    }

    const filterFoods = foodList.filter(item => dateFns.isSameDay(item.day, currentDay))
    let completeDay = filterFoods.length >= 1 ? filterFoods[0].complete : false


    this.setState({
      currentDay,
      formattedDate,
      filterFoods,
      completeDay
    })
  }

  render () {
    let mealDay = []

    if (this.state.filterFoods.length === 1) {
      mealDay = this.state.filterFoods[0].foods
    }

    let totalCals = mealDay.reduce((calories, food) => {
      return calories + food.food.calories
    }, 0)

    let breakfast = mealDay.filter(food => food.meal === 'Breakfast')
    let lunch = mealDay.filter(food => food.meal === 'Lunch')
    let dinner = mealDay.filter(food => food.meal === 'Dinner')
    let snack = mealDay.filter(food => food.meal === 'Snack')

    return (
      <div className='dayview--wrapper'>
        <div className='date-nav'>
          <div className='date-prev'
            title='Previous Day'
            onClick={this.prevDay}>
            &larr;
          </div>
          <div className='current-day'>
            <h3>{this.state.formattedDate}</h3>
          </div>
          <div className='date-next'
            title='Previous Day'
            onClick={this.nextDay}>
            &rarr;
          </div>
        </div>

        <div className='click-today' onClick={this.setToday}>Back to Today</div>

        {this.state.completeDay &&
          <div className='finished'>Completed Day!</div>
        }

        <div className='calories-toolbar'>
          Total Calories: {totalCals}
          {!this.state.completeDay && 
            <button onClick={this.doneEating}>I'm Done Eating</button>
          }
        </div>
        <div className='meals'>
          <MealSection
            clickMeal={this.clickMeal}
            mealName='Breakfast'
            mealList={breakfast} />
          <MealSection
            clickMeal={this.clickMeal}
            mealName='Lunch'
            mealList={lunch} />
          <MealSection
            clickMeal={this.clickMeal}
            mealName='Snack'
            mealList={snack} />
          <MealSection
            clickMeal={this.clickMeal}
            mealName='Dinner'
            mealList={dinner} />
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    currentDay: state.currentDay,
    mealList: state.mealList,
    complete: state.complete
  }),{
    addMeal,
    nextDay,
    prevDay,
    setToday,
    finishDay
  }
)(Day)
