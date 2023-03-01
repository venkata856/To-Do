import _ from 'lodash';
import './style.css';
import addProject, {addTasks,addProjectItemDefault} from './projects';

function loadIntialPage(){      


    const headerElement=document.createElement('div');
    headerElement.classList.add('header');
    const header= document.createElement('header');
    header.classList.add('head');
    header.innerHTML="To-Do";
    headerElement.appendChild(header);
    document.body.appendChild(headerElement);



    const mainContentElement = document.createElement('div');
    mainContentElement.classList.add('mainContainer');

    const menuContainer = document.createElement("menu");

    menuContainer.classList.add("menu");

    const menuContent = document.createElement("div");

    menuContent.classList.add("menu-content");

    const menuContentFirst = document.createElement("div");

    menuContentFirst.classList.add("menu-content-first");
    menuContentFirst.appendChild(createMenuItem("../src/images/inbox.png","Inbox"))
    menuContentFirst.appendChild(createMenuItem("../src/images/calendar.png","Today"))
    menuContentFirst.appendChild(createMenuItem("../src/images/availability.png","This week"))


    menuContent.appendChild(menuContentFirst);




    

    menuContent.appendChild(createHeader("Projects"));

    checkForProjects().forEach((elm)=>{
        addProjectItemDefault(menuContent,elm);
    })

   
    menuContent.appendChild(createMenuItem("../src/images/plus.png","Add Project"));

    menuContainer.appendChild(menuContent);


    mainContentElement.appendChild(menuContainer)
    mainContentElement.appendChild(addTasks("Inbox"))

    document.body.appendChild(mainContentElement);

    


    const footer = document.createElement('footer');
    footer.classList.add("footer");
    const footerPara = document.createElement('p');
    footerPara.textContent="Copyright © 2023 Ravi Kumar";
    footer.appendChild(footerPara);
    document.body.appendChild(footer)





    

    
}

export function createMenuItem(logo,name){

    const menuitems= document.createElement("div");
    menuitems.classList.add("menuitems");
    const mbutton = document.createElement("button");
    mbutton.classList.add("m-button");
    mbutton.classList.add(getFilename(logo).split(".")[0]);
    const menuLogo =document.createElement("img");
    menuLogo.classList.add("menuLogo");
    menuLogo.src=logo;

    const menuName =document.createElement("div");
    menuName.classList.add("menuName");
    menuName.textContent=name;

    const menuAllContent = document.createElement("div");
    menuAllContent.classList.add("menuAllContent");

    menuAllContent.appendChild(menuLogo);
    menuAllContent.appendChild(menuName);

    menuAllContent.appendChild(menuLogo);
    menuAllContent.appendChild(menuName);
    mbutton.appendChild(menuAllContent);
    menuitems.appendChild(mbutton);

    if(getFilename(logo).split(".")[0]==='plus'){
    
        mbutton.addEventListener("click",createAddLogic)
        
    }else{

        mbutton.addEventListener("click",(e)=>{


            if(!e.target.lastElementChild.lastElementChild)
                return;

            const bossContainer=document.querySelector(".mainContainer");
            bossContainer.removeChild(document.querySelector(".project-preview"));
            bossContainer.appendChild(addTasks(e.target.lastElementChild.lastElementChild.textContent));

            
        })
    }


            

    return menuitems;

}

export const getFilename = function (str) {
    return str.substring(str.lastIndexOf('/')+1);
}

export function createHeader(content){

    const h4Element=document.createElement('h4');
    h4Element.classList.add('h4');
    h4Element.textContent=content;

    return h4Element;
}

function createAddLogic(){

    

        const menuContent = document.querySelector(".menu-content");
        menuContent.removeChild(menuContent.lastElementChild)
        menuContent.appendChild(addProject());
        


}

function checkForProjects(){


    const proj = new Array();

    for(var i =0; i< localStorage.length;i++){

        if(!["Inbox","Today","This week"].includes(localStorage.key(i))){
            proj.push(localStorage.key(i));

        }
            
    }

    return proj
}


loadIntialPage();
