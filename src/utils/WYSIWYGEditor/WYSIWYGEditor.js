import React from "react";

// Components
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from "./WYSIWYGEditor.module.scss";

const WYSIWYGEditor = props => {
    const onEditorStateChange = editorState => {
        props.setEditorState(editorState);
        return props.onChange(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
    };

    return (
        <>
            <div className={style.editor}>
                <Editor
                    editorState={props.editorState}
                    wrapperClassName={style.wrapperClass}
                    editorClassName={style.editorClass}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
        </>
    );
};

export default WYSIWYGEditor;