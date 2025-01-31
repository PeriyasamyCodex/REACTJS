import Button from "./Button";

export default function SidebarMenu({ onAddProjBtnClick, projectData }) {

    function onBtnClick() {
        onAddProjBtnClick(true);
    }
    let cssClasses = "w-full text-left px-2 py-1 rounded-sm my-1 hover:text-stone-200 hover:bg-stone-800";

    return (
        <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
            <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-200">
                Your Projects
            </h2>
            <div>
                <Button onClick={onBtnClick}>
                    + Add Project
                </Button>
            </div>
            <ul>
                {projectData && projectData.map((projData) => (

                    <li key={projData.title}>                       
                        <button
                            className={cssClasses}>
                            {projData.title}
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
}