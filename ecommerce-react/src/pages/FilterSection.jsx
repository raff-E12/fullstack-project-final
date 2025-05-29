import { useState } from "react";

export default function FilterSection({ handleSubmit }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('');
    const [filter, setFilter] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        handleSubmit({
            q: searchTerm,
            order: order,
            filter: filter
        });
    };
    const handleOrderChange = (e) => {
        setOrder(e.target.value);
    };

    const handleFilterChange = (e) => {

        setFilter(e.target.value);
        if (e.target.value === '1') {
            // console.log('ho cliccato il primo')
        }

        if (e.target.value === '2') {
            // console.log('ho cliccato il secondo')
        }

        if (e.target.value === '3') {
            // console.log('ho cliccato il secondo')
        }

        if (e.target.value === '4') {
            // console.log('ho cliccato il secondo')
        }
    };

    return <>
        <div className="container-xl container-prod">
            <form className="container-xl form-prod" onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Search by brand, name, or category"
                    value={searchTerm}
                    id="form-prod"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <form className="container-xl form-prod" onSubmit={handleFormSubmit}>
                <select class="form-select" aria-label="Default select example" onChange={handleOrderChange} value={order}>
                    <option value="">Order by</option>
                    <option value="sort_by=name_asc">Alphabetically, A-Z</option>
                    <option value="2">Alphabetically, Z-A</option>
                    <option value="3">Price, LOW to HIGH</option>
                    <option value="4">Price, HIGH to LOW</option>
                </select>
            </form>

            <form className="container-xl form-prod" onSubmit={handleFormSubmit}>
                <select class="form-select" aria-label="Default select example">
                    <option selected>Filter</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </form>
        </div>
    </>
}
