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
    title: "",
    director: "",
    metascore: "",
    stars: [],
};



const UpdateForm = props => {
    console.log('upd ', props);
    const { push } = useHistory();
    const { id } = useParams();
    const [item, setItem] = useState(initialItem);
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setItem(res.data);
            })
            .catch(err => console.log(err));
    }, [id]);

    const changeHandler = e => {
        e.persist();
        let value = e.target.value;
        setItem({
            ...item,
            [e.target.name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, item)
            .then(res => {
                // console.log('item', props.movieList);
                // console.log('res', res.data);
                // build new array
                // loop through old array
                // find the item that matches the updated one
                // update that item in the new array
                // then set the new array.

                setItem(res.data);
                // const newList = props.movieList.map(movie => {
                //     console.log('m', movie)
                //     if (movie.id === res.data.id) {
                //         newList.push({ item });
                //     } else {
                //         newList.push({ movie });
                //     }
                // });
                // props.setMovieList(newList)
                push("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className={"edit-div"}>
            <h2>Edit this movie</h2>
            <form onSubmit={handleSubmit}>
                <h3>Movie Title: </h3>
                <input
                    type="text"
                    name="title"
                    value={props.title}
                    onChange={changeHandler}
                /><h3>Director: </h3>
                <input
                    type="text"
                    name="director"
                    value={props.director}
                    onChange={changeHandler}
                /><h3>Metascore: </h3>
                <input
                    type="text"
                    name="metascore"
                    value={props.metascore}
                    onChange={changeHandler}
                />
                {/* <input
                    type="text"
                    name="stars"
                    value={props.stars}
                    onChange={changeHandler}
                /> */}
                <button className="form-button">Update</button>
            </form>
        </div>
    )
}
export default UpdateForm;