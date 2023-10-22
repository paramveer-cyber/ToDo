import React, { useState, useRef } from 'react';
import '../App.css';
import delete_png from '../assets/delete.png';
import edit_png from '../assets/edit.png';

export default function TaskCard(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(props.title);
    const titleRef = useRef(null);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleTitleChange = (event) => {
        setEditedTitle(event.target.value);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            if (props.updateFunc) {
                props.updateFunc(props.unique_key, editedTitle);
            }
            setIsEditing(false);
        }
    };


    return (
        <div className='task_card'>
            <div className="content">
                <input
                    type="checkbox"
                    className="btn-check"
                    id={`btn-check-outlined${props.unique_key}`}
                    autoComplete="off"
                    checked={props.isChecked}
                    onChange={props.handleCheckboxChange} // Handle checkbox change event
                />


                <label className={'btn btn-outline-success'} htmlFor={`btn-check-outlined${props.unique_key}`}>✓</label>
                {isEditing ? (
                    <input
                        type="text"
                        className="form-control editable-task"
                        value={editedTitle}
                        onChange={handleTitleChange}
                        onKeyPress={handleKeyPress}
                        ref={titleRef}
                        autoFocus
                    />
                ) : (
                    <label
                        className={`form-check-label task ${props.titleClassName} ${props.isChecked ? 'checked' : ''}`}
                        htmlFor={`btn-check-outlined${props.unique_key}`}
                        onDoubleClick={handleEditClick}
                    >
                        {props.title}
                    </label>

                )}
            </div>
            <div className="functions">
                <img className="png mx-2" src={edit_png} alt="for edit icon" width={30} height={30} onClick={handleEditClick} />
                <img className="png" src={delete_png} alt="for delete icon" width={30} height={30} onClick={() => { props.delete_func(props.unique_key) }} />
            </div>
        </div>
    );
}
