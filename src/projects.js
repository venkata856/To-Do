import { createMenuItem,getFilename,createHeader } from ".";
import { checkProject, storeData,removeProject } from "./data";
import populateform,{createDataCards,reloadCardsPageForm} from "./tasks"

export default function addProject(){
    

    const formElement=document.createElement("div");
    formElement.classList.add("project-input");
    const inputForm = document.createElement("input");
    inputForm.classList.add("project-name-input");
    // inputForm.setAttribute("required",true);

    const formButtons=document.createElement("div");
    formButtons.classList.add("project-buttons");


    const cancelButton = document.createElement("button");
    cancelButton.classList.add("cancel");
    cancelButton.textContent="Cancel";

    const addButton = document.createElement("button");
    addButton.classList.add("add");
    addButton.textContent="Add";

    formElement.appendChild(inputForm);
    formButtons.appendChild(addButton);
    formButtons.appendChild(cancelButton);
    formElement.appendChild(formButtons);

    cancelButton.onclick=resetForm;
    addButton.addEventListener("click",(e)=>{

        if(checkProject(inputForm.value)){
            alert("project already exists");
            return;
    
        }
        console.log(inputForm.value);
        storeData(inputForm.value,null);
        addProjectItem(inputForm.value)});
    return formElement;


}

function resetForm(){

    const menuContent = document.querySelector(".menu-content");
    menuContent.removeChild(menuContent.lastElementChild);
    menuContent.appendChild(createMenuItem("../src/images/plus.png","Add Project"));


}

export function addProjectItem(item){


    
    if(!item){
    alert("The Project name is required")
    return;
    }

    if(item.length > 12 ){
        alert("The Project name is cannot be greater than 12 characters")
        return;
        }



    const menuContent = document.querySelector(".menu-content");
    menuContent.removeChild(menuContent.lastElementChild);
    menuContent.appendChild(createProjectItem("../src/images/list.png",item));
    menuContent.appendChild(createMenuItem("../src/images/plus.png","Add Project"));


}


export function addProjectItemDefault(menuContent,item){


    
    if(!item){
    alert("The Project name is required")
    return;
    }

    if(item.length > 12 ){
        alert("The Project name is cannot be greater than 12 characters")
        return;
        }

    
    menuContent.appendChild(createProjectItem("../src/images/list.png",item));


}

function createProjectItem(logo,name){

    const menuitems= document.createElement("div");
    menuitems.classList.add("menuitems");
    const mbutton = document.createElement("button");
    mbutton.classList.add("m-button");
    mbutton.classList.add(getFilename(logo).split(".")[0]);

    const menuAllContent = document.createElement("div");
    menuAllContent.classList.add("menuAllContent");
    const menuLogo =document.createElement("img");
    menuLogo.classList.add("menuLogo");
    menuLogo.src=logo;

    const menuName =document.createElement("div");
    menuName.classList.add("menuName");
    menuName.textContent=name;

    const menuDelete =document.createElement("div");
    menuDelete.classList.add("menuDelete");
    const delHover= document.createElement("div");
    delHover.classList.add("delHover");
    menuDelete.appendChild(delHover);

    menuAllContent.appendChild(menuLogo);
    menuAllContent.appendChild(menuName);
    mbutton.appendChild(menuAllContent);
    mbutton.appendChild(menuDelete);
    menuitems.appendChild(mbutton);


    delHover.addEventListener("click",(e)=>{

            const menuNode= document.querySelector(".menu-content");

            console.log(e.target.parentNode.parentNode.firstChild.lastChild.textContent);
            removeProject(e.target.parentNode.parentNode.firstChild.lastChild.textContent);
            menuNode.removeChild(e.target.parentNode.parentNode.parentNode);
            reloadCardsPageForm("Inbox");
        })


        ///adding the new logic here ********
        menuAllContent.addEventListener("click",(e)=>{

            console.log(e.target.lastChild.textContent)

            if(!e.target.lastChild)
            return;

        const bossContainer=document.querySelector(".mainContainer");
        bossContainer.removeChild(document.querySelector(".project-preview"));
        bossContainer.appendChild(addTasks(e.target.lastChild.textContent));
        })

        

    return menuitems;

}

export function addTasks(headName){


    const projectPreview= document.createElement("div");

    projectPreview.classList.add("project-preview");

    const element =createHeader(headName);


    projectPreview.appendChild(element);
    const dataItems = createDataCards(headName);
    console.log(dataItems);
    if(dataItems){
    dataItems.forEach(element => {
        projectPreview.appendChild(element);
    });
        }
    
    projectPreview.appendChild(createAddTaskButton("../src/images/plus.png","Add Task"))



    return projectPreview;

}


export function createAddTaskButton(logo,name){

    const menuitems= document.createElement("div");
    menuitems.classList.add("taskItem");
    const mbutton = document.createElement("button");
    mbutton.classList.add("t-button");
    mbutton.classList.add(getFilename(logo).split(".")[0]);
    const menuLogo =document.createElement("img");
    menuLogo.classList.add("taskLogo");
    menuLogo.src=logo;

    const menuName =document.createElement("div");
    menuName.classList.add("taskName");
    menuName.textContent=name;

    const menuAllContent = document.createElement("div");
    menuAllContent.classList.add("taskAllContent");

    menuAllContent.appendChild(menuLogo);
    menuAllContent.appendChild(menuName);

    menuAllContent.appendChild(menuLogo);
    menuAllContent.appendChild(menuName);
    mbutton.appendChild(menuAllContent);
    menuitems.appendChild(mbutton);

    mbutton.addEventListener("click",()=>{

        populateform();
    })

    return menuitems;
}