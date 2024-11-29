import { useState } from "react";


const TodoList = () => {
    //Variables
    const [data, setData] = useState({
        id: "",
        text: "",
        flag: true,
    });

    const [submit, setSubmit] = useState([]);

    //Functions
    const handleChange = (e) => {
        setData({ ...data, text: e.target.value });
    };

    //handling submit
    const handleSubmit = (e) => {
        e.preventDefault();
        data.text && setSubmit([...submit, { ...data, id: Date.now(), text: data.text }]);
        setData({
            id: "",
            text: "",
            flag: true,
        });
    };

    //handling delete
    const handleDelete = (id) => {
        setSubmit((prev) => prev.filter((item) => item.id !== id));
    };

    //handling edit
    const handleEdit = (id) => {
        setData({ ...submit.find((item) => item.id === id), flag: false });
    };

    //handling update
    const handleUpdate = (e, id) => {
        e.preventDefault();
        setSubmit(
            submit.map((item) =>
                item.id === id ? { ...item, text: data.text } : item
            )
        );
        setData({
            id: "",
            text: "",
            flag: true,
        });
    };

    //handling reset
    const handleReset = () => {
        setSubmit([]);
    };

    return (
        <div className="todo-container">
            <h1>Todo List 📑</h1>
            <div className="todo-form">
                <form>
                    <input
                        type="text"
                        placeholder="Enter Tasks Here ^_^"
                        value={data.text}
                        onChange={handleChange}
                        className="todo-input"
                    />
                    {data.flag ? (
                        <button onClick={handleSubmit} className="todo-button">
                            Submit
                        </button>
                    ) : (
                        <button
                            onClick={(e) => handleUpdate(e, data.id)}
                            className="todo-button update"
                        >
                            Update
                        </button>
                    )}
                </form>
            </div>
            <div className="todo-list">
                {submit.length === 0 ? (
                    <h1 className="no-data">Start Writing Tasks (●'◡'●)</h1>
                ) : (
                    <>
                        {submit.map((item) => (
                            <ul key={item.id} className="todo-item">
                                <li>{item.text}</li>
                                <div className="item-buttons">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="edit-button"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="delete-button"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </ul>
                        ))}
                        <button
                            onClick={handleReset}
                            className="todo-button reset"
                        >
                            Reset
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoList;
