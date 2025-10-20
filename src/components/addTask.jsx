import React, { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text) {
      return;
    }
    onAdd({ text, day, reminder });
    setText("");
    setDay("");
    setReminder(false);
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <div className="form-control">
        <label htmlFor="">Task</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="add task..."
        />
      </div>
      <div className="form-control">
        <lable htmlFor=""> Day & Time</lable>
        <input
          type="date"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          placeholder="select time & date."
        />
      </div>
      <div className="form-control form-control-check">
        <lable htmlFor="">set Reminder</lable>
        <input
          type="checkbox"
          checked={reminder}
          value={reminder}
          onChange={(e) => setReminder(e.currentTarget.checked)}
        />
      </div>
      <input type="submit" value="Save Task..." className="btn btn-block" />
    </form>
  );
};

export default AddTask;
