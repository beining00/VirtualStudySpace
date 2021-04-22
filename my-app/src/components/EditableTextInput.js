import React from 'react';

import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function EditableTextInput(props){

    const inputChange = (e)=>{
        props.setValue(e)

    }

    return (
        <div>
            {(props.rows >1)?<EditTextarea defaultValue={props.defaultValue} value={props.value} 
                className='text_input' onSave={props.onSave} onChange ={inputChange} rows={props.rows} />:
                <EditText defaultValue={props.defaultValue} value={props.value} 
                className='text_input' onSave={props.onSave} onChange ={inputChange}/>
                }
        
      </div>

    )
}

export default EditableTextInput;