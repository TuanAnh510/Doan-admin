import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";

Quill.register("modules/imageResize", ImageResize);

/*
 * Simple editor component that takes placeholder text as a prop
 */
function EditorTitleShip({ placeholder, setTitleShip, titleShip }) {
  const handleChange = (html) => {
    setTitleShip(html);
  };

  return (
    <ReactQuill
      onChange={handleChange}
      value={titleShip}
      modules={EditorTitleShip.modules}
      formats={EditorTitleShip.formats}
      bounds={"#root"}
      placeholder={placeholder}
    />
  );
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
EditorTitleShip.modules = {
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
EditorTitleShip.formats = [
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

export default EditorTitleShip;
