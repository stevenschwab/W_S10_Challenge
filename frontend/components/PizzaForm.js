import React, { useReducer } from 'react'
import { useCreateOrderMutation } from '../state/pizzaApi'

const CHANGE_NAME = 'CHANGE_NAME'
const CHANGE_SIZE = 'CHANGE_SIZE'
const CHANGE_TOPPING = 'CHANGE_TOPPING'
const RESET_FORM = 'RESET_FORM'

const initialFormState = {
  fullName: '',
  size: '',
  '1': false,
  '2': false,
  '3': false,
  '4': false,
  '5': false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, fullName: action.payload }
    case CHANGE_SIZE:
      return { ...state, size: action.payload }
    case CHANGE_TOPPING: {
      const { name, checked } = action.payload
      return { ...state, [name]: checked }
    }
    case RESET_FORM:
      return { ...initialFormState }
    default:
      return state
  }
}

export default function PizzaForm() {
  const [state, dispatch] = useReducer(reducer, initialFormState)
  const [createOrder, { error: orderCreationError, isLoading: orderCreating }] = useCreateOrderMutation()

  const onNameChange = ({ target: { value } }) => {
    dispatch({ type: CHANGE_NAME, payload: value })
  }
  const onSizeChange = ({ target: { value } }) => {
    dispatch({ type: CHANGE_SIZE, payload: value })
  }
  const onToppingChange = ({ target: { name, checked } }) => {
    dispatch({ type: CHANGE_TOPPING, payload: { name, checked } })
  }
  const resetForm = () => {
    dispatch({ type: RESET_FORM })
  }

  const onNewOrder = async evt => {
    evt.preventDefault()
    const { fullName, size } = state
    const toppings = Object.entries(state)
      .filter(([key, value]) => value === true && !['fullName', 'size'].includes(key))
      .map(([key]) => key)

    createOrder({ fullName, size, toppings })
    .unwrap()
    .then(() => {
      resetForm()
    })
    .catch(err => {
      // Handle error
    })
  }

  return (
    <form onSubmit={onNewOrder}>
      <h2>Pizza Form</h2>
      { orderCreating && <div className='pending'>Order in progress...</div> }
      { orderCreationError && <div className='failure'>Order failed: {orderCreationError.data.message}</div> }

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input
            data-testid="fullNameInput"
            id="fullName"
            name="fullName"
            placeholder="Type full name"
            type="text"
            onChange={onNameChange}
            value={state.fullName}
          />
        </div>
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select data-testid="sizeSelect" id="size" name="size" onChange={onSizeChange} value={state.size}>
            <option value="">----Choose size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <label>
          <input data-testid="checkPepperoni" name="1" type="checkbox" onChange={onToppingChange} checked={state['1']}/>
          Pepperoni<br /></label>
        <label>
          <input data-testid="checkGreenpeppers" name="2" type="checkbox" onChange={onToppingChange}  checked={state['2']}/>
          Green Peppers<br /></label>
        <label>
          <input data-testid="checkPineapple" name="3" type="checkbox" onChange={onToppingChange}  checked={state['3']}/>
          Pineapple<br /></label>
        <label>
          <input data-testid="checkMushrooms" name="4" type="checkbox" onChange={onToppingChange}  checked={state['4']}/>
          Mushrooms<br /></label>
        <label>
          <input data-testid="checkHam" name="5" type="checkbox" onChange={onToppingChange}  checked={state['5']}/>
          Ham<br /></label>
      </div>
      <input data-testid="submit" type="submit" />
    </form>
  )
}
