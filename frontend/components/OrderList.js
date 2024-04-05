import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectSizeFilter } from '../state/filtersSlice'
import { useGetOrdersQuery } from '../state/pizzaApi'

export default function OrderList() {
  const { data: orders, error: orderHistoryError, isLoading: ordersLoading, isFetching: ordersFetching } = useGetOrdersQuery()
  
  const filterSize = useSelector(st => st.filters.size)
  const dispatch = useDispatch()

  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders?.filter(order => {
              return (filterSize === "All") || (filterSize === order.size) 
            })
            .map(order => {
              const { customer, size, toppings = [] } = order
              let toppingsText = 'no toppings'
              if (toppings.length === 1) {
                toppingsText = '1 topping'
              } else if (toppings.length > 1) {
                toppingsText = `${toppings.length} toppings`
              }

              return (
                <li key={order.id}>
                  <div>
                    {customer} ordered a size {size} with {toppingsText}
                  </div>
                </li>
              )
            })
        }
      </ol>
      <div id="sizeFilters">
        Filter by size:
        {
          ['All', 'S', 'M', 'L'].map(size => {
            const className = `button-filter${size === filterSize ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}
              onClick={() => dispatch(selectSizeFilter(size))}
              >{size}</button>
          })
        }
      </div>
    </div>
  )
}
