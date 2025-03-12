import { Editor } from '@tinymce/tinymce-react';
import classNames from 'classnames';
import AppContext from 'context/Context';
import { getColor } from 'helpers/utils';
import PropTypes from 'prop-types';
import { useContext, useEffect, useRef } from 'react';

const TinymceEditor = ({ value, handleChange, height = '50vh', isInvalid }) => {
  const {
    config: { isDark, isRTL }
  } = useContext(AppContext);
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.dom.addStyle(
        `body{color: ${getColor('white')} !important;}`
      );
    }
  }, [isDark]);

  return (
    <div className={classNames({ 'is-invalid': isInvalid })}>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={handleChange}
        apiKey={import.meta.env.VITE_APP_TINYMCE_APIKEY}
        init={{
          height,
          body_class: 'my_class',
          menubar: false,
          content_style: `body { color: ${getColor('black')} }`,
          statusbar: false,
          plugins: 'link image lists table media directionality',
          toolbar:
            'styleselect | bold italic link bullist numlist image blockquote table media undo redo',

          directionality: isRTL ? 'rtl' : 'ltr',
          theme_advanced_toolbar_align: 'center'
        }}
      />
    </div>
  );
};

TinymceEditor.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  height: PropTypes.string,
  isInvalid: PropTypes.bool
};

export default TinymceEditor;
