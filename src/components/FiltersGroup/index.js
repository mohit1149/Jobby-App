import {BsSearch} from 'react-icons/bs'

import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {changeRating} = props

      return (
        <li
          className="rating-item"
          onClick={changeRating}
          key={rating.salaryRangeId}
        >
          <input
            className="check-box"
            type="radio"
            id={rating.salaryRangeId}
            name="salary"
          />
          <label className="radio-class" htmlFor={rating.salaryRangeId}>
            {rating.label}
          </label>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Salary Range</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {categoryOptions} = props

    return categoryOptions.map(category => {
      const {changeCategory} = props

      return (
        <li
          className="category-item"
          key={category.employmentTypeId}
          onChange={changeCategory}
        >
          <input
            type="checkbox"
            id={category.employmentTypeId}
            value={category.employmentTypeId}
          />
          <label className="radio-class" htmlFor={category.employmentTypeId}>
            {category.label}
          </label>
        </li>
      )
    })
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Type of Employment</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput, searchButton} = props

    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          className="search-button"
          type="button"
          data-testid="searchButton"
          onClick={searchButton}
        >
          <BsSearch className="search-icon" />.
        </button>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      {renderProductCategories()}
      {renderRatingsFilters()}
    </div>
  )
}

export default FiltersGroup
