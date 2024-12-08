import { useState } from "react";
import NoProjectDashboard from "./components/NoProjectDashboard";
import SidebarMenu from "./components/SidebarMenu";
import AddProject from "./components/AddProject";

function App() {
  const[enableAddProj, setEnableAddProj] = useState(false);
  const[projectData, setProjectData] = useState([]);

function addProjectData(title, desc, dueDate){
  setProjectData((prevPorjData => {
    const updProjData = [...prevPorjData];
    updProjData.push({title: title,
        desc: desc,
        dueDate: dueDate
    })
    return updProjData;
}));
}

  return (
    <>
     <main className="h-screen my-8 flex gap-8">
      <SidebarMenu projectData={projectData} onAddProjBtnClick={setEnableAddProj}/>
      {!enableAddProj && <NoProjectDashboard onAddProjBtnClick={setEnableAddProj}/>}
      {enableAddProj && <AddProject addProjectData={addProjectData}/>}
    
     </main>
      
    </>
  );
}

export default App;
