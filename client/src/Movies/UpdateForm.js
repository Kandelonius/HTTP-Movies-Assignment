import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';

// Movie format:
// {
//     id: 5,
//     title: 'Tombstone',
//     director: 'George P. Cosmatos',
//     metascore: 89,
//     stars: ['Kurt Russell', 'Bill Paxton', 'Sam Elliot'],
//   }

const initialItem = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: [],
};



const UpdateForm = props => {
    const { push } = useHistory();
    const [item, setItem] = useState(initialItem);
    const { id } = useParams();
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // res.data
                setItem(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = ev => {
        ev.persist();
        let value = ev.target.value;
        setItem({
            ...item,
            [ev.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // make a PUT request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                // res.data
                props.setItems(res.data);
                push(`/item-list/${id}`);
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="director"
                    value={props.director}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="metascore"
                    value={props.metascore}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="stars"
                    value={props.stars}
                    onChange={changeHandler}
                />

            </form>
        </div>
    )
}
export default UpdateForm;