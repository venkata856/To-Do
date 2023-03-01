

export function storeData(project,data){

    // if(data===null){

    //     data={};
    //     insertDataProject(project,data);
    // }


    insertDataProject(project,data);

    

    // let projectOBject=JSON.parse(localStorage.getItem(project));

    // // projectOBject.push(data);

    // console.log(projectOBject);

  
    


}

export function checkProject(project){

    return localStorage.getItem(project)?true:false;

}

export function removeProject(project){
    localStorage.removeItem(project);
}

export function insertDataProject(project,data){

    if(!checkProject(project)){

        var objectArrays=new Array();
        objectArrays.push(data);
        localStorage.setItem(project,JSON.stringify(objectArrays));

    }else{

        let projectOBject=JSON.parse(localStorage.getItem(project));

        if(projectOBject[0]===null){
            projectOBject.splice(0,1);
        }

        projectOBject.push(data);

        console.log("second attempt")
  
        localStorage.setItem(project,JSON.stringify(projectOBject)); ;

    }
}

export function populateData(project){


    return JSON.parse(localStorage.getItem(project));


}

export function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

export function deleteItem(project,id){

    var eindex;

    let projectOBject=JSON.parse(localStorage.getItem(project));

        projectOBject.forEach((element,index)=>{

            if(element["id"]===id){

                eindex=index;
            }
  
        });

        projectOBject.splice(eindex,1);

        localStorage.setItem(project,JSON.stringify(projectOBject));

}

export function markItemAsDone(project,id){

    let projectOBject=JSON.parse(localStorage.getItem(project));

        projectOBject.forEach((element,index)=>{

            if(element["id"]===id){

               element["done"] =!element["done"];
            }
  
        });
        localStorage.setItem(project,JSON.stringify(projectOBject));
}


export function showItem(project,id){

    var eindex;

    let projectOBject=JSON.parse(localStorage.getItem(project));

        projectOBject.forEach((element,index)=>{

            if(element["id"]===id){

                eindex=index;
            }
  
        });

        var keyval= project;
        var item={};
        item[keyval]=projectOBject[eindex];

        

        return item;

        
   

}