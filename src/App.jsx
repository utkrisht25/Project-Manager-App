import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";
import SelectedProject from "./components/selectedProject.jsx";


function App() {
  const [projectsState , setprojectState] = useState({
    selectedprojectId : undefined,
    projects : [],
    tasks : [],
  });
  // selectProjectId = undefined; -> we do not select any peroject nor create any project
  //selectProjectId = null -> we gonna create a new project
  // selectProjectId = some value -> we select a project that already added in the sidebar 
  
  function handleAddTask(text){
      setprojectState((prevState) => {
        const taskId = Math.random();
        const newTask = {
          text : text,
          projectId : prevState.selectedprojectId,
          id : taskId,
        };
        return{
          ...prevState,
          tasks : [newTask , ...prevState.tasks],
        }
      })
  }
  function handleDeleteTask(id){
      setprojectState((prevState)=>{
        return {
          ...prevState,
          tasks : prevState.tasks.filter((task) => task.id !== id),
          //this filter method is used to remove the task from the tasks array
          //and we use the taskId to filter out the task that we want to delete
        }
      })
  }
  function handleStartAddProject(){
    setprojectState (prevState =>{
      return {
        ...prevState ,
        selectedprojectId : null,
      }
    })
  }
  function handleAddProject(projectData){
    // we need to add the project to the projects array
    //this projectData is the obejct which we get on onAdd function in NewProject.jsx
        setprojectState((prevState) =>{
          const projectId = Math.random();
          const newProject ={
            ...projectData,
            id : projectId,
          };
          return{
            ...prevState,
            selectedprojectId: undefined,
            projects : [...prevState.projects, newProject],
          };
        })

  }
  function handleSelectProject(id){
    setprojectState((prevState) => {
      return {
        ...prevState,
        selectedprojectId: id,
      };
    });
  }
  function handleCancelAddProject() {
    setprojectState((prevState) => {
      return {
        ...prevState,
        selectedprojectId: undefined,
      };
    });
  }
  function handleDeleteProject(){
    setprojectState((prevState) =>{
      return {
        ...prevState,
        selectedprojectId : undefined,
        projects : prevState.projects.filter((project) => project.id !== prevState.selectedprojectId),
        //this filter method is used to remove the project from the projects array
        //and we use the selectedprojectId(this is the id of the project that we select for deleting from the sidebar) to filter out the project that we want to delete
        //and we set the selectedprojectId to undefined after deleting the project and after runs the filter method
      };
    })
  }

  const selectedProject = projectsState.projects.find(
    (project) => project.id === projectsState.selectedprojectId
  ); //this is the js code for selecting the project from the projects array using the project id
  //if this arrow fxn return true then this find() method will return us the project with that id and paas it to the selectedProject

  let content = <SelectedProject project={selectedProject}
                       onDelete={handleDeleteProject}
                       onAddTask={handleAddTask}
                        onDeleteTask={handleDeleteTask}
                        tasks={projectsState.tasks}
                       />;

  if(projectsState.selectedprojectId === null){
    content = <NewProject  onAdd={handleAddProject} onCancel={handleCancelAddProject}/>;
  }
  else if (projectsState.selectedprojectId === undefined){
    content = <NoProjectSelected onStartAddProject={handleStartAddProject}/>;
  }
  return (
    
    <main className="h-screen flex my-8 gap-8">
      <Sidebar onStartAddProject={handleStartAddProject} projects={projectsState.projects} onSelectProject={handleSelectProject} selectedProjectId={projectsState.selectedprojectId}/>
      {content}
    </main>
    
  );
}

export default App;
