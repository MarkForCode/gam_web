import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "imageBlot" // #5 Optinal if using custom formats
];
interface SelectInputValue {
    content?: string;
    quillRef: any;
}
type Props = {
    value?: string;
    onChange?: (value: SelectInputValue) => void;
};
const TextEditor: React.FC<Props> = ({ onChange }) => {
    const [quillRef, setQuillRef] = React.useState<any>({})

    const triggerChange = (changedValue: { content: string }) => {
        if (onChange) {
            onChange({ ...changedValue, quillRef });
        }
    };

    const imageHandler = (v: any) => {
        const input = document.createElement('input') as any;

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            var file: any = input.files[0];
            var formData = new FormData();

            formData.append('image', file);

            var fileName = file.name;
            console.log(file);
            console.log(quillRef);
            const quill = quillRef.getEditor();
            const oldHtml = quill.root;
            console.log(oldHtml);
            const img = document.createElement('img');
            img.src = `https://s3.ap-northeast-1.amazonaws.com/persistence.biatalk.cc/Business/setshowbiz/menu/menu_20220721.jpg`;
            oldHtml.appendChild(img);
        };
    }


    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'align': [] }],
                ['link', 'image'],
                ['clean'],
                [{ 'color': [] }]
            ],
            handlers: {
                image: imageHandler
            }
        }
    };

    const onChangeInput = (content: string) => {
        console.log(content)
        // desc = content;
        // setDesc(content);
        triggerChange({ content: content });
    };

    return (
        <>
            <ReactQuill
                ref={el => {
                    setQuillRef(el);
                }}
                modules={modules}
                formats={formats}
                onChange={onChangeInput}
            >
                <div className="my-editing-area" />
            </ReactQuill>
        </>
    );
};

export default TextEditor;