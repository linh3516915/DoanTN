import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import styles from './ckeditor.module.css'; // Import CSS module
import { useDispatch, useSelector } from 'react-redux';
import { setmota } from '../../redux/slice/productSlice';
const EditorComponent = (props) => {
    const editorConfiguration = {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
    };
    const mota = useSelector(state => state.product.mo_ta);
    const dispatch = useDispatch();
    console.log(mota)
    return (
        <div className={styles.editorContainer}>
            <CKEditor
            disabled={props.disabled}
                editor={ClassicEditor}
                config={editorConfiguration}
                data={mota}
                onReady={(editor) => {
                    // Bạn có thể truy cập đối tượng editor ở đây
                    console.log('Editor đã sẵn sàng sử dụng!', editor);
                }}
                
                onChange={(event, editor) => {
                    const data = editor.getData();
                    dispatch(setmota(data))
                    console.log({ event, editor, data });
                }}
            />
        </div>
    );
};

export default EditorComponent;
