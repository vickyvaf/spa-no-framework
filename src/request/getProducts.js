import { state, setState } from '../index.js'

const baseUrl = "https://dummyjson.com/products/search?q="

function getProducts() {
    fetch(`${baseUrl}${state.searchInputValue}&limit=${state.limit}&skip=${state.skip}`)
        .then((res) => res.json())
        .then((res) => {
            setState({
                datas: res.products,
                total: res.total,
                isLoading: false
            })
        })
        .catch((err) => setState({ isError: err.message }))
        .finally(() => setState({ isLoading: false }))
}

export {
    getProducts
}
