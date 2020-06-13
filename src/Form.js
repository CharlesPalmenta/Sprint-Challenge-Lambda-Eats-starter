import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

export default function Form() {
    const [formState, setFormState] = useState({
        name: "",
        size: "",
        pepperoni: false,
        bacon: false,
        jalapenos: false,
        onions: false,
        instruction: ""

    });

    const [errors, setErrors] = useState({
        name: "",
        size: "",
        pepperoni: "",
        bacon: "",
        jalapenos: "",
        onions: "",
        instruction: ""
    });
    const [post, setPost] = useState();
    const [buttonDisabled, setButtonDisable] = useState(true);
    const formSchema = yup.object().shape({
        name: yup.string().min(2).required("Name must be at least 2 characters"),
        size: yup.mixed().oneOf(["small", "medium", "large"]).defined(),
        pepperoni: yup.boolean(),
        bacon: yup.boolean(),
        jalapenos: yup.boolean(),
        onions: yup.boolean(),
        instruction: yup.string()
    });

    useEffect(() => {
        console.log("checking for form validation")
        formSchema.isValid(formState).then(valid => {
            console.log("is form valid?", valid)
            setButtonDisable(!valid)
        })
    }, [formState]);

    const formSubmit = e => {
        e.preventDefault();
        console.log("pizza ordered!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                setPost(res.data)
                console.log("success!")
                setFormState({
                    name: "",
                    size: "",
                    pepperoni: "",
                    bacon: "",
                    jalapenos: "",
                    onions: "",
                    instruction: "" 
                })
            })
            .catch(err => console.log("ERROR", err))
    };

    const validateChange = e => {
        yup.reach(formSchema, e.target.name).validate(e.target.value).then(valid => {
            setErrors({
                ...errors,
                [e.target.name]: ""
            })
        }).catch(err => {
            setErrors({
                ...errors,
                [e.target.name]: err.errors[0]
            })
        })
    }

    const inputChange = e => {
        e.persist();
        console.log("changed", e.target.value);
        console.log("name of input that fired event", e.target.name);
        const newFormData = {
            ...formState
        }
        setFormState(newFormData);
    }

    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="name">
                Name
                <input id="name" type="text" name="name" data-cy="name" value={formState.name} onChange={inputChange} />
                {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
            </label>
            <label htmlFor="size">
                Pizza Size?
                <select id="size" name="size" data-cy="size" onChange={inputChange}>
                <option>--Please select an option--</option>
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
                {errors.size.length > 0 ? <p className="error">{errors.size}</p> : null}
            </label>
        </form>
    )
}