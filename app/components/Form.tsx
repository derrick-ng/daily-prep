import Traffic from "./Traffic";
import Weather from "./Weather";
import Email from "./Email";
import ToDoArea from "./todo/ToDoArea";

interface FormProps {
  userId: string | null
}

const Form = ({userId}: FormProps) => {
  return (
    <div>
      <h2>Form</h2>
      <div>
        <Weather />
      </div>
      <div>
        <Traffic />
      </div>
      <div>
        <Email />
      </div>
      <div>
        <ToDoArea userId={userId}/>
      </div>
    </div>
  );
};

export default Form;
