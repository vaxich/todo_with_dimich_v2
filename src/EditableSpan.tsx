import { ChangeEvent, useState } from "react";


type EditableSpanProps = {
    title: string
    onChange : (title : string) => void
}


export const EditableSpan = (props: EditableSpanProps) => {
    const { title } = props;

    const [editMode, setEditMode] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState(title)

    const activateEditMode = () => {
         setEditMode(true) 
         setNewTitle(title)
        };
    const activateViewMode = () => { 
        setEditMode(false) 
        props.onChange(newTitle)
    };

    const onChangeTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
          setNewTitle(event.currentTarget.value)
    }

    return (
        editMode
            ? <input value={newTitle} autoFocus onBlur={activateViewMode} onChange={onChangeTitleHandler}/>
            : <span onDoubleClick={activateEditMode}>{title}</span>
    )
}