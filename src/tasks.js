import {format,differenceInDays} from 'date-fns';
import { storeData,populateData,create_UUID,deleteItem,markItemAsDone,showItem} from './data';
import { createAddTaskButton} from './projects';
import { createHeader} from '.';
import ta from 'date-fns/esm/locale/ta/index.js';
export function taskform(project){
    

    const formDiv = document.createElement('div');
    const projectDetailsDiv = document.createElement('div');
    projectDetailsDiv.className="projectDetailsDiv";
    const projectNameDiv = document.createElement('div');
    projectNameDiv.className="project";
    projectNameDiv.textContent = project;
    const projectCloseDiv = document.createElement('div');
    projectCloseDiv.className="projectClose";
    projectDetailsDiv.appendChild(projectNameDiv)
    projectDetailsDiv.appendChild(projectCloseDiv);
    formDiv.classList.add("formDiv");
    const form = document.createElement('form');
    form.classList.add("taskForm");
    form.setAttribute("id","taskForm")
    const taskTitle= document.createElement('div');
    taskTitle.classList.add("tasktitle");
    const taskTitleLabel = document.createElement('label');
    taskTitleLabel.textContent="Title:";
    const taskTitleInput = document.createElement('input');
    taskTitleInput.classList.add("taskTitleInput");
    taskTitleInput.setAttribute("id","taskTitleInput");
    taskTitleInput.setAttribute("name","taskTitle");
    taskTitleInput.setAttribute("maxlength","32");
    taskTitleInput.setAttribute("placeholder","Call Jhon");
    taskTitleInput.required=true;
    taskTitleLabel.setAttribute("for","taskTitleInput");
    const submitButton = document.createElement('button');
    submitButton.textContent="Add";
    submitButton.classList.add("submitButton");
    submitButton.setAttribute("type","submit");
    submitButton.setAttribute("form","taskForm");
    taskTitle.appendChild(taskTitleLabel)
    taskTitle.appendChild(taskTitleInput);
    form.appendChild(taskTitle);
    form.appendChild(createTextArea());
    form.appendChild(createDueDate());
    form.appendChild(addPriority())
    form.appendChild(submitButton);
    formDiv.appendChild(projectDetailsDiv);
    formDiv.appendChild(form);
    formDiv.style.zIndex="2";

    form.addEventListener("submit",(e)=>{

        e.preventDefault();

        const formDataCapture = document.getElementById("taskForm");
        const project = document.querySelector(".project");
        const projectMain = document.querySelector(".project-preview");

        const formData = new FormData(formDataCapture);

        const dataObject = {}

        for (const [key, value] of formData) {

            dataObject[key]=value;
            
          }
          dataObject['done']=false;
          dataObject["id"]= create_UUID();
          storeData(project.innerHTML,dataObject);

          document.querySelector(".header").style.filter="";
          document.querySelector(".menu").style.filter="";
          document.querySelector(".footer").style.filter="";

          //add the logic to change
        //   projectMain.appendChild()

        console.log(project.innerHTML)

        reloadCardsPageForm(project.innerHTML);
    })

    projectCloseDiv.addEventListener("click",(e)=>{

        const projectMain = document.querySelector(".project-preview");
        const project = document.querySelector(".project");
        const formDiv = document.querySelector(".formDiv");


        projectMain.removeChild(formDiv);
        document.querySelector(".header").style.filter="";
        document.querySelector(".menu").style.filter="";
        document.querySelector(".footer").style.filter="";

        //add the logic to change
      //   projectMain.appendChild()

      console.log(project.innerHTML)

      reloadCardsPageForm(project.innerHTML);

    })


    return formDiv;
}


export default function populateform(){

    const projectPreview = document.querySelector(".project-preview");
    const projectName = document.querySelector(".project-preview h4");
    while(projectPreview.hasChildNodes()){
        projectPreview.removeChild(projectPreview.lastChild);
    }


    projectPreview.appendChild(taskform(projectName.innerHTML));
    // document.body.style.filter="blur(50px)";

    document.querySelector(".header").style.filter="blur(20px)";
    document.querySelector(".menu").style.filter="blur(20px)";
    document.querySelector(".footer").style.filter="blur(20px)";

    
}

function createTextArea(){

    const taskDescriptionDiv = document.createElement("div");
    taskDescriptionDiv.classList.add("taskDesc");
    const taskDescription= document.createElement("textarea");
    taskDescription.setAttribute("id","taskDescInput");
    taskDescription.setAttribute("name","taskDesc");
    taskDescription.required=true;
    taskDescription.setAttribute("placeholder","Enter description");
    taskDescription.setAttribute("rows","3");
    taskDescription.setAttribute("cols","33");
    taskDescription.setAttribute("minlength","15");
    taskDescription.setAttribute("maxlength","180");
    const taskTitleLabel = document.createElement('label');
    taskTitleLabel.textContent="Description:";
    taskTitleLabel.setAttribute("for","taskDescInput");

    taskDescriptionDiv.appendChild(taskTitleLabel);
    taskDescriptionDiv.appendChild(taskDescription);

    return taskDescriptionDiv;

    
}

function createDueDate(){

    const taskDescriptionDiv = document.createElement("div");
    taskDescriptionDiv.classList.add("dueDate");
    const taskDescription= document.createElement("input");
    taskDescription.setAttribute("id","dueDate");
    taskDescription.setAttribute("name","taskDueDate");
    taskDescription.setAttribute("type","date");
    taskDescription.required=true;
    taskDescription.setAttribute("defaultValue",format(new Date(),"yyyy-MM-dd").toString());
    taskDescription.setAttribute("min",format(new Date(),"yyyy-MM-dd").toString());
    const taskTitleLabel = document.createElement('label');
    taskTitleLabel.textContent="Due:";
    taskTitleLabel.setAttribute("for","dueDate");

    taskDescriptionDiv.appendChild(taskTitleLabel);
    taskDescriptionDiv.appendChild(taskDescription);

    console.log(format(new Date(),"yyyy-MM-dd").toString());
    

    return taskDescriptionDiv;

    
}

function addPriority(){

    const priorityDiv= document.createElement("div");
    
    priorityDiv.className = "priority"

    const priorityHeading = document.createElement("p");

    priorityHeading.innerHTML="Chose Priority:";

    const previewLowDiv= document.createElement("div");
    previewLowDiv.className="pLow";

    const priorityLabelLow = document.createElement('label');
    priorityLabelLow.textContent="Low:";
    priorityLabelLow.setAttribute("for","low");

    const lowRadioButton=document.createElement("input");
    lowRadioButton.setAttribute("type","radio");
    lowRadioButton.setAttribute("name","priority");
    lowRadioButton.classList="low";
    lowRadioButton.value="Low";
    lowRadioButton.setAttribute("id","low")

    previewLowDiv.appendChild(priorityLabelLow);
    previewLowDiv.appendChild(lowRadioButton);
    ///


    const previewMediumDiv= document.createElement("div");
    previewMediumDiv.className="pMedium";

    const priorityLabelMedium = document.createElement('label');
    priorityLabelMedium.textContent="Medium:";
    priorityLabelMedium.setAttribute("for","medium");

    const mediumRadioButton=document.createElement("input");
    mediumRadioButton.setAttribute("type","radio");
    mediumRadioButton.setAttribute("name","priority");
    mediumRadioButton.classList="medium";
    mediumRadioButton.value="Medium";
    mediumRadioButton.setAttribute("id","medium")
    mediumRadioButton.defaultChecked=true;

    previewMediumDiv.appendChild(priorityLabelMedium);
    previewMediumDiv.appendChild(mediumRadioButton);

    //

    const previewHighDiv= document.createElement("div");
    previewMediumDiv.className="pHigh";

    const priorityLabelHigh = document.createElement('label');
    priorityLabelHigh.textContent="High:";
    priorityLabelHigh.setAttribute("for","high");

    const highRadioButton=document.createElement("input");
    highRadioButton.setAttribute("type","radio");
    highRadioButton.setAttribute("name","priority");
    highRadioButton.classList="high";
    highRadioButton.value="High";
    highRadioButton.setAttribute("id","high")

    previewHighDiv.appendChild(priorityLabelHigh);
    previewHighDiv.appendChild(highRadioButton);


    priorityDiv.appendChild(priorityHeading);
    priorityDiv.appendChild(previewLowDiv);
    priorityDiv.appendChild(previewMediumDiv);
    priorityDiv.appendChild(previewHighDiv);

    return priorityDiv;
    

}

export function createDataCards(project){

    const allTheCards=[];

    console.log("The project in project is : " + project)
    const data= populateData(project);

    console.log(data)
    if(!data || data[0]===null)
        return;

    data.forEach(element => {

        allTheCards.push(createCard(element));
        
    });


    return allTheCards;



}

function createCard(object){

    const cardHolderDiv= document.createElement("div");
    cardHolderDiv.className= object["done"]? "done":"";
    cardHolderDiv.classList.add("card-holder");
    cardHolderDiv.classList.add(object["priority"].toString().toLowerCase());
    const cardStatusDiv= document.createElement("div");
    const toolTip = document.createElement("span");
    toolTip.className="tooltip";
    toolTip.textContent=object["done"]?"Mark as Undone!":"Mark as done!";
    const id = document.createElement("span");
    id.className="id";
    id.textContent=object["id"].toString();
    cardStatusDiv.appendChild(toolTip);
    cardStatusDiv.appendChild(id);
    
    cardStatusDiv.className="card-mark";

    if(object["done"]){

        cardStatusDiv.classList.add("markdone");
    }
    const cardTitleDiv= document.createElement("div");
    cardTitleDiv.className="card-title";
    cardTitleDiv.textContent=object.taskTitle.toString();

    const cardDescDiv= document.createElement("div");

    cardDescDiv.textContent=object["taskDesc"].toString();
    cardDescDiv.className="card-desc";

    const cardDueDiv= document.createElement("div");
    cardDueDiv.className="card-due";
    cardDueDiv.textContent=format(new Date(object["taskDueDate"].toString()),"MMM dd yyy");

    const cardDetailsDiv= document.createElement("div");
    cardDetailsDiv.className="card-details";

    const detailsButton = document.createElement("button");
    detailsButton.className="details";
    detailsButton.textContent="Details";
    cardDetailsDiv.appendChild(detailsButton);

    const cardDeleteDiv= document.createElement("div");
    cardDeleteDiv.className="card-delete";
    // cardDeleteDiv.textContent=object.taskDueDate.toString();




    cardTitleDiv.classList.add(object["done"]? "done":"pending");
    cardDescDiv.classList.add(object["done"]? "done":"pending");
    cardDueDiv.classList.add(object["done"]? "done":"pending");



    cardHolderDiv.appendChild(cardStatusDiv);
    cardHolderDiv.appendChild(cardTitleDiv);
    cardHolderDiv.appendChild(cardDescDiv);
    cardHolderDiv.appendChild(cardDueDiv);
    cardHolderDiv.appendChild(cardDetailsDiv);
    cardHolderDiv.appendChild(cardDeleteDiv);

    cardStatusDiv.addEventListener("click",(e)=>{
        console.log(e.target.lastChild.innerHTML);
        console.log(e.target.parentNode.parentNode.firstChild.innerHTML);

        e.target.classList.toggle("markdone");

        markItemAsDone(e.target.parentNode.parentNode.firstChild.innerHTML,e.target.lastChild.innerHTML);

        reloadCardsPage();

    })

    cardDeleteDiv.addEventListener("click",(e)=>{

        const projectMain=document.querySelector(".project-preview");

        console.log(projectMain.firstElementChild.innerHTML);
        console.log(e.target.parentNode.firstChild.lastChild.innerHTML);
        projectMain.removeChild(e.target.parentNode);

        deleteItem(projectMain.firstElementChild.innerHTML,e.target.parentNode.firstChild.lastChild.innerHTML);
    })

    detailsButton.addEventListener("click",(e)=>{


        const projectMain=document.querySelector(".project-preview");

        const project=projectMain.firstElementChild.innerHTML;
        const id=e.target.parentNode.parentNode.firstChild.lastChild.innerHTML;

        while(projectMain.hasChildNodes()){
            projectMain.removeChild(projectMain.lastChild);
         }
        // projectMain.removeChild(e.target.parentNode);

        projectMain.appendChild(showDetailsOfTheCard(showItem(project,id)));
    })

    return cardHolderDiv;



}


function reloadCardsPage(){
    const projectMain=document.querySelector(".project-preview");

    const header =document.querySelector(".project-preview .h4");

    while(projectMain.hasChildNodes()){
            projectMain.removeChild(projectMain.lastChild);
    }

    const element =createHeader(header.innerHTML);


    projectMain.appendChild(element);
    const dataItems = createDataCards(header.innerHTML);
    if(dataItems){
    dataItems.forEach(element => {
        projectMain.appendChild(element);
    });
        }
    
    projectMain.appendChild(createAddTaskButton("../src/images/plus.png","Add Task"))
}


export function reloadCardsPageForm(header){
    const projectMain=document.querySelector(".project-preview");

    

    while(projectMain.hasChildNodes()){
            projectMain.removeChild(projectMain.lastChild);
    }

    const element =createHeader(header);


    projectMain.appendChild(element);
    const dataItems = createDataCards(header);
    if(dataItems){
    dataItems.forEach(element => {
        projectMain.appendChild(element);
    });
        }
    
    projectMain.appendChild(createAddTaskButton("../src/images/plus.png","Add Task"))
}


function showDetailsOfTheCard(dataObj){

    var key=Object.keys(dataObj);

    var data=dataObj[key[0]];

    


    const overviewDiv= document.createElement("div");
    overviewDiv.className='overview';

    const projectTitleClose = document.createElement("div");
    projectTitleClose.className= 'nameclose';
    const projectTitle = document.createElement("div");
    projectTitle.className='pTitle';
    projectTitle.textContent=key[0];

    const projectCloseHover = document.createElement("div");
    projectCloseHover.className="hover";
    const projectClose = document.createElement("div");
    projectClose.className='pClose';
    projectCloseHover.appendChild(projectClose);
    projectTitleClose.appendChild(projectTitle);
    projectTitleClose.appendChild(projectCloseHover)

    overviewDiv.appendChild(projectTitleClose);
   

    const taskDiv = document.createElement("div");
    taskDiv.className="taskView";
    const taskDivName = document.createElement("p");
    taskDivName.classList="b_bold";
    taskDivName.innerHTML="Task";
    const taskDivValue = document.createElement("p");
    taskDivValue.classList="v_bold";
    taskDivValue.innerHTML=data["taskTitle"];

    taskDiv.appendChild(taskDivName);
    taskDiv.appendChild(taskDivValue);

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className="descriptionView";
    const descriptionDivName = document.createElement("p");
    descriptionDivName.innerHTML="Description";
    const descriptionDivValue = document.createElement("p");
    descriptionDivValue.innerHTML=data["taskDesc"];
    descriptionDivName.classList="d_bold";
    descriptionDivValue.classList="dv_bold";

    descriptionDiv.appendChild(descriptionDivName);
    descriptionDiv.appendChild(descriptionDivValue);



    const priorityDiv = document.createElement("div");
    priorityDiv.className="priorityView";
    const priorityDivName = document.createElement("p");
    priorityDivName.innerHTML="Priority";
    const priorityDivValue = document.createElement("p");
    priorityDivValue.innerHTML=data["priority"];

    priorityDivName.classList="b_bold";
    priorityDivValue.classList="v_bold";
    priorityDiv.appendChild(priorityDivName);
    priorityDiv.appendChild(priorityDivValue);



    const dueDiv = document.createElement("div");
    dueDiv.className="dueView";
    const dueDivDivName = document.createElement("p");
    dueDivDivName.innerHTML="Due Date";
    const dueDivDivValue = document.createElement("p");
    dueDivDivValue.innerHTML=format(new Date(data["taskDueDate"]),"MMM dd, yyy");

    dueDivDivName.classList="b_bold";
    dueDivDivValue.classList="v_bold";

    dueDiv.appendChild(dueDivDivName);
    dueDiv.appendChild(dueDivDivValue);


    const statusDiv = document.createElement("div");
    statusDiv.className="statusView";
    const statusDivName = document.createElement("p");
    statusDivName.innerHTML="Status";
    const statusDivValue = document.createElement("p");
    statusDivValue.innerHTML=data["done"]?"Done":"Pending";

    statusDivName.classList="b_bold";
    statusDivValue.classList="v_bold";

    statusDiv.appendChild(statusDivName);
    statusDiv.appendChild(statusDivValue);

    





    taskDiv.classList.add("same-align");
    descriptionDiv.classList.add("diff-align");
    priorityDiv.classList.add("same-align");
    dueDiv.classList.add("same-align");
    statusDiv.classList.add("same-align");
    overviewDiv.appendChild(taskDiv);
    overviewDiv.appendChild(descriptionDiv);
    overviewDiv.appendChild(priorityDiv);
    overviewDiv.appendChild(dueDiv);
    overviewDiv.appendChild(statusDiv);
    overviewDiv.appendChild(populateTheDiff(data));

    projectCloseHover.addEventListener("click",(e)=>{

        const projectMain = document.querySelector(".project-preview");

        const overDiv = document.querySelector(".overview");


        projectMain.removeChild(overDiv);
        document.querySelector(".header").style.filter="";
        document.querySelector(".menu").style.filter="";
        document.querySelector(".footer").style.filter="";



      reloadCardsPageForm(key[0]);
        
    });


    return overviewDiv;



}



function populateTheDiff(data){

    if(!data["done"]){

        const pendingInDiv = document.createElement("div");
        pendingInDiv.className="pendingIn";
        const pendingInDivName = document.createElement("p");
        pendingInDivName.innerHTML="Due In";
        const pendingInDivValue = document.createElement("p");

        var diffString;
        var day =differenceInDays(new Date(data["taskDueDate"]),new Date());
        if(day===1){

            diffString= day+" Day";
        }else if(day >1){

            diffString= day+" Days";
        }else if(day===0){

            diffString= "Today";
        }
        pendingInDivValue.innerHTML=diffString;
    
        pendingInDivName.classList="b_bold";
        pendingInDivValue.classList="v_bold";
    
        pendingInDiv.appendChild(pendingInDivName);
        pendingInDiv.appendChild(pendingInDivValue);
        pendingInDiv.classList.add("same-align");

        return pendingInDiv;

    }

    return document.createElement("div");

}