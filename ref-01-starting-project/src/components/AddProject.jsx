import { useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";

export default function AddProject({addProjectData}) {

    

    const title = useRef();
    const desc = useRef();
    const dueDate = useRef();
    const model = useRef();

    function handleSave() {
        if (title.current.value === '' ||
            desc.current.value === '' ||
            dueDate.current.value === '') {
            model.current.open();
            return;
        }
        addProjectData(title.current.value,desc.current.value, dueDate.current.value);
       
    }

    return (

        <>
            <Modal ref={model} className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md" >
                <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
                <p className="text-stone-600 mb-4">
                    Oops ... looks like you forgot to enter a value.
                </p>
                <p className="text-stone-600 mb-4">
                    Please make sure you provide a valid value for every input field.
                </p>               
            </Modal>
            <div className="w-[35rem] mt-16 mt-auto">
                <menu className="flex items-center justify-end gap-4 my-4">
                    <li>
                        <button
                            className="text-stone-800 hover:text-stone-950"

                        >
                            Cancel
                        </button>
                    </li>
                    <li>
                        <button
                            className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                    </li>
                </menu>
                <div>
                    <Input ref={title} type="text" label="Title" />
                    <Input ref={desc} label="Description" textarea />
                    <Input ref={dueDate} type="date" label="Due Date" />
                </div>
            </div>
        </>
    );
}