import  ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface EditorProps {
  onChange: (value: string) => void;
  value: string;
}

export const Editor = ({ onChange, value }: EditorProps) => {


  return (
    <div className="h-full bg-white">
      <ReactQuill className="h-full" theme="snow" value={value} onChange={onChange} />
    </div>
  );
};