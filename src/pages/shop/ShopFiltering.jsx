/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react'

const ShopFiltering = ({filters, filtersState, setFiltersState, clearFilters }) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3>Filters</h3>
      {/* Category Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Category</h4>
        <hr />
        {filters.categories.map((category) => (
          <label key={category} className="capitalize  cursor-pointer">
            <input
              type="radio"
              name="category"
              id="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1">{category}</span>
          </label>
        ))}
      </div>

      {/* Colour Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Colour</h4>
        <hr />
        {filters.colours.map((colour) => (
          <label key={colour} className="capitalize  cursor-pointer">
            <input
              type="radio"
              name="colour"
              id="colour"
              value={colour}
              checked={filtersState.colour === colour}
              onChange={(e) =>
                setFiltersState({ ...filtersState, colour: e.target.value })
              }
            />
            <span className="ml-1">{colour}</span>
          </label>
        ))}
      </div>

      {/* Price Range Filter */}
      <div className="flex flex-col space-y-2">
        <h4 className="font-medium text-lg">Price Range</h4>
        <hr />
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="capitalize  cursor-pointer">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-1">{range.label}</span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <button
        className="bg-primary py-1 px-4 text-white rounded" 
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ShopFiltering
