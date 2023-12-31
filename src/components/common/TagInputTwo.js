import React from 'react';
import { useTranslation } from "react-i18next";
const TagInputTwo = ({ notes, addNote, removeNote }) => {
  const { t } = useTranslation();

  return (
    <div className="react-tag-input">
      <ul id="tags">
        {notes.map((note, index) => (
          <li key={index} className="react-tag-input__tag">
            <span className="tag-title react-tag-input__tag__content">
              {note}
            </span>
            <span
              className="react-tag-input__tag__remove"
              onClick={() => removeNote(index)}
            ></span>
          </li>
        ))}
      </ul>

      <input
        name="note"
        className="react-tag-input__input"
        type="text"
        onBlur={(event) => addNote(event)}
        onKeyDown={(event) => (event.key === 'Enter' ? addNote(event) : null)}
        // onKeyDown={(event) => console.log(event.key)}
        placeholder={t("AddVar")}
      />
    </div>
  );
};

export default TagInputTwo;
