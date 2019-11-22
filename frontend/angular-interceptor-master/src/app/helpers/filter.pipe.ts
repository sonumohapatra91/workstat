import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, searchText?: any): any {
    if(!value) return [];
    if(!searchText) return value;
    searchText = searchText.toLowerCase();    
    return value.filter( it => {         
      // if(searchText == 'ongoing'){           
      //   return it.cstatus.toString().toLowerCase().includes("progress")  ||  it.cstatus.toString().includes("progress")
      //    ||it.cstatus.toString().toLowerCase().includes("hold")  ||  it.cstatus.toString().includes("hold") ||
      //    it.cstatus.toString().toLowerCase().includes("pipeline")  ||  it.cstatus.toString().includes("pipeline");
      // }
      // if(searchText.includes("progress") || searchText.includes("hold") || searchText.includes("pipeline") || searchText.includes("completed")){
      //   return it.cstatus.toString().toLowerCase().includes(searchText);
      // }
      if(it.project != null && it.manager != null && it.resources != null ){
        return it.project.toString().toLowerCase().includes(searchText) || 
               it.manager.toString().toLowerCase().includes(searchText) ||
               it.resources.toString().toLowerCase().includes(searchText);
      }     
      else     
      if(it.project == null){
        return it.manager.toString().toLowerCase().includes(searchText) || 
               it.resources.toString().toLowerCase().includes(searchText);
      }
      if(it.manager == null){
        return it.project.toString().toLowerCase().includes(searchText) || 
               it.resources.toString().toLowerCase().includes(searchText);
      }
      if(it.resources == null){
        return it.project.toString().toLowerCase().includes(searchText) || 
               it.manager.toString().toLowerCase().includes(searchText);
      }
    });
  }
}