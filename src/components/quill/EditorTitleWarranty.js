import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

/*
 * Simple editor component that takes placeholder text as a prop
 */
function EditorTitleWarranty({ placeholder, setTitleWarranty, titleWarranty }) {
  const handleChange = (html) => {
    setTitleWarranty(html);
  };

  return (
    <ReactQuill
      onChange={handleChange}
      value={titleWarranty}
      modules={EditorTitleWarranty.modules}
      formats={EditorTitleWarranty.formats}
      bounds={"#root"}
      placeholder={placeholder}
    />
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorTitleWarranty.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import("parchment"),
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};

/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
EditorTitleWarranty.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
];

export default EditorTitleWarranty;
