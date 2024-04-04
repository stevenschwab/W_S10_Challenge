import React from 'react'
import { useGetOrdersQuery } from '../state/pizzaApi'

export default function OrderList() {
  const { data: orders } = useGetOrdersQuery()
  
  return (
    <div id="orderList">
      <h2>Pizza Orders</h2>
      <ol>
        {
          orders.map(() => {
            return (
              <li key={1}>
                <div>
                  order details here
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
            const className = `button-filter${size === 'All' ? ' active' : ''}`
            return <button
              data-testid={`filterBtn${size}`}
              className={className}
              key={size}>{size}</button>
          })
        }
      </div>
    </div>
  )
}
