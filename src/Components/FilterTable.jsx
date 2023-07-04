import { Filter, FilterContainer } from './FilterTableStyle'

function FilterTable(props) {
  return (
    <FilterContainer>
        {props.filters.map((filter, index)=>{
            return (
                <Filter key={index}>
                    <p onClick={filter.action}>
                        {filter.name}
                    </p>
                </Filter>
            )
        })}
    </FilterContainer>
  )
}

export default FilterTable