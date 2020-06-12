import {AfterViewInit, Component, OnInit} from '@angular/core';
import { jsPlumb } from 'jsplumb';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  constructor(private modalService: NgbModal) {}
  title = 'Angular JsPlumb Integration';
  jsPlumbInstance;
  showConnectionToggle = false;
  buttonName = 'Connect';
  rightEndPointOptions = {
      endpoint: 'Dot',
      paintStyle: { cornerRadius: 5, fill: '#CA2C68' },
      isSource: true,
      isTarget: true,
      connectorStyle: { stroke: '#CA2C68' },
      anchor: 'Right',
      maxConnections: -1,
      cssClass: "bo",
      connectorClass: "path",
      connectorOverlays: [
        // ["Arrow", { width: 12, length: 12, location: 0.5 }]
      ]
    };
  leftEndPointOptions = {
      endpoint: 'Dot',
      paintStyle: { cornerRadius: 5, fill: '#CA2C68' },
      isTarget: true,
      connectorStyle: { stroke: '#CA2C68' },
      anchor: 'Left',
      maxConnections: -1,
      cssClass: "bo",
      connectorClass: "path",
      connectorOverlays: [
        // ["Arrow", { width: 12, length: 12, location: 0.5 }]
      ]
    };
    sources = ["file 1","file 2","folder 1","file 1/1","file 1/2","folder 1/1","folder 1/1/1","folder 1/1/1/1","file 1/1/1/1/1","file 1/1/1/1/2","f1","f2","f3","f1-1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12","f13","f14","f15","f16","f17","f18","f19","f20","fl11","fl12","fl13","fl14","fl15","fl16","fl17","fl18","fl19","fl20","lfl11","lfl12","lfl13","lfl14","lfl15","lfl16","lfl17","lfl18","lfl19","lfl20"];
    targets =  ["ile 1","ile 2","older 1","ile 1/1","ile 1/2","older 1/1","older 1/1/1","older 1/1/1/1","ile 1/1/1/1/1","ile 1/1/1/1/2","t1","t2","t3","ff1","ff2","ff3","ff4","ff5","ff6","ff7","ff8","ff9","ff10","ff11","ff12","ff13","ff14","ff15","ff16","ff17","ff18","ff19","ff20","rff11","rff12","rff13","rff14","rff15","rff16","rff17","rff18","rff19","rff20","rff11r","rff12r","rff13r","rff14r","rff15r","rff16r","rff17r","rff18r","rff19r","rff20r"];

  ngAfterViewInit() {
    this.jsPlumbInstance = jsPlumb.getInstance();
    this.jsPlumbInstance.setContainer('container');
    // for(let i = 1; i<=9;i++){
    //   console.log(i+" "+ this.jsPlumbInstance.getContainer())
    //   if(this.jsPlumbInstance.getContainer() != undefined){
    //      this.jsPlumbInstance.setContainer(i.toString());
    //   }
     
    //   this.jsPlumbInstance.addEndpoint(i.toString(),this.rightEndPointOptions);
    // }
    //  for(let j = 10; j<=18;j++){
    //   console.log(j+" "+ this.jsPlumbInstance.getContainer())
    //   if(this.jsPlumbInstance.getContainer() != undefined){
    //      this.jsPlumbInstance.setContainer(j.toString());
    //   }
    //   this.jsPlumbInstance.addEndpoint(j.toString(),this.leftEndPointOptions);
    // }

   

   

//  this.jsPlumbInstance.connect({
//         connector: ['Flowchart', {stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true}],
//         source: 'folder 1',
//         target: 'ile 1/2',
//         anchor: ['Right', 'Left'],
//         paintStyle: {stroke: '#456', strokeWidth: 4},
//         overlays: [
//           ['Label', {label: '', location: 0.5, cssClass: 'connectingConnectorLabel'}]
//         ],
//       });

this.sources.forEach((key)=>{
      this.jsPlumbInstance.addEndpoint(key,this.rightEndPointOptions)
    })

   this.targets.forEach((key)=>{
      this.jsPlumbInstance.addEndpoint(key,this.leftEndPointOptions)
    })



  }
  ids:any[] = [];
  endPointsRemoved = 0;
  removedConnctedEdges:any[] = [];
  folderClick(clickElement){
    this.endPointsRemoved ++;
    console.log(clickElement);
    var srcElement = clickElement.srcElement;
    this.nextSibilingId(srcElement.nextElementSibling);
    console.log(this.ids)
    if(this.ids.length > 0 && this.endPointsRemoved%2 != 0){
      console.log(this.jsPlumbInstance.getAllConnections());
      this.jsPlumbInstance.getAllConnections().forEach((con)=>{
        var edge = {
          sourceId : con.sourceId,
          targetId : con.targetId
        }
        this.removedConnctedEdges.push(edge);
      })
      console.log(this.removedConnctedEdges)
      this.ids.forEach((id)=>{
        this.jsPlumbInstance.removeAllEndpoints(id);
      })
      
    }
    if(this.endPointsRemoved%2 == 0){
      this.ids.forEach((id)=>{
        this.jsPlumbInstance.addEndpoint(id,this.rightEndPointOptions);
      })
      this.removedConnctedEdges.forEach((con)=>{
        this.connectSourceToTargetUsingJSPlumb(con.sourceId,con.targetId);
      })
    }
  }

  add(){
     this.sources.forEach((key)=>{
      this.jsPlumbInstance.addEndpoint(key,this.rightEndPointOptions)
    })

   this.targets.forEach((key)=>{
      this.jsPlumbInstance.addEndpoint(key,this.leftEndPointOptions)
    })
  }

  showConnectOnClick() {
    this.showConnectionToggle = ! this.showConnectionToggle;
    if ( this.showConnectionToggle) {
    this.buttonName = 'Dissconnect';
      this.connectSourceToTargetUsingJSPlumb('','');
    } else {
      this.buttonName = 'Connect';
      this.jsPlumbInstance.reset();
    }
  }

  connectSourceToTargetUsingJSPlumb(source,target) {
    let labelName;
      labelName = 'connection';
      var connectionParameter = {
        connector: ['Bezier', {stub: [212, 67], cornerRadius: 1, alwaysRespectStubs: true}],
        source: source,
        target: target,
        anchor: ['Right', 'Left'],
        paintStyle: {stroke: '#ca2c68', strokeWidth: 2},
        endpointStyle:{fillStyle:'rgb(202, 44, 104)'}
      };
      this.jsPlumbInstance.connect(connectionParameter);
  }
  open(content) {
    this.modalService.open(content).result.then((result) => {
      //this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
    //  this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  mymethod(){
    
  }

  nextSibilingId(n){
    console.log('sib',n)
    if(n!=null && n.id){
      console.log(n.id);
      this.ids.push(n.id)
      if(n.nextElementSibling.tagName == "DETAILS"){

      }else{
        this.nextSibilingId(n.nextElementSibling);
      }
      
    }
    
  }

  forEachNextDetails(details){
    if(details){
      if(details.children && details.children){
        details.children.forEach((each)=>{
         
        })
      }
    }
  }


}
