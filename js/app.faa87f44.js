(function(){"use strict";var e={3020:function(e,l,a){var n=a(5130),t=a(6768);const u={id:"app"};function s(e,l,a,n,s,i){const r=(0,t.g2)("router-link"),o=(0,t.g2)("router-view");return(0,t.uX)(),(0,t.CE)("div",u,[(0,t.Lk)("header",null,[l[3]||(l[3]=(0,t.Lk)("h1",null,"MPR Tracker",-1)),(0,t.Lk)("nav",null,[(0,t.bF)(r,{to:"/"},{default:(0,t.k6)((()=>l[0]||(l[0]=[(0,t.eW)("Setup")]))),_:1}),(0,t.bF)(r,{to:"/tracking"},{default:(0,t.k6)((()=>l[1]||(l[1]=[(0,t.eW)("Player Tracking")]))),_:1}),(0,t.bF)(r,{to:"/team-mpr"},{default:(0,t.k6)((()=>l[2]||(l[2]=[(0,t.eW)("Team MPR")]))),_:1})])]),(0,t.Lk)("main",null,[(0,t.bF)(o,{onSaveData:n.saveData},null,8,["onSaveData"])]),l[4]||(l[4]=(0,t.Lk)("footer",null,[(0,t.Lk)("p",null,"© 2024 MPR Tracker App")],-1))])}var i=a(782),r=a(1387),o={name:"App",setup(){const e=(0,i.Pj)(),l=(0,r.rd)();(0,t.sV)((()=>{e.dispatch("initializeStore")}));const a=()=>{e.dispatch("saveToLocalStorage")};return(0,t.Gt)("saveData",a),l.afterEach((()=>{a()})),{saveData:a}}},p=a(1241);const c=(0,p.A)(o,[["render",s]]);var d=c,y=a(4232);const m={class:"team-setup"},v={key:0,type:"submit"},L={class:"team-roster"},k=["onClick"],P=["onClick"],b={class:"min-plays"},h=["disabled"],C={class:"export-import"},g={class:"clear-data"},f={class:"lineup-management"},E={key:0,class:"modal"},w={class:"modal-content"},T={class:"player-selection"},N=["onClick"],M=["disabled"],S={key:1,class:"modal"},R={class:"modal-content"},I=["value"],x={key:1,class:"player-selection"},_=["onClick"],X={key:2},O=["disabled"],A={key:2,class:"modal"},K={class:"modal-content player-lineups-modal"},W={class:"player-name"},U={class:"lineup-list"},F={key:0,class:"no-lineups"},D={class:"lineup-name"},j=["onClick"],B={class:"modal-actions"};function V(e,l,a,u,s,i){return(0,t.uX)(),(0,t.CE)("div",m,[l[32]||(l[32]=(0,t.Lk)("h2",null,"Team Setup",-1)),(0,t.Lk)("form",{onSubmit:l[5]||(l[5]=(0,n.D$)((e=>u.editMode?u.updatePlayer():u.addPlayer()),["prevent"])),class:"player-form"},[(0,t.bo)((0,t.Lk)("input",{"onUpdate:modelValue":l[0]||(l[0]=e=>u.newPlayer.firstName=e),placeholder:"First Name",required:""},null,512),[[n.Jo,u.newPlayer.firstName]]),(0,t.bo)((0,t.Lk)("input",{"onUpdate:modelValue":l[1]||(l[1]=e=>u.newPlayer.lastName=e),placeholder:"Last Name",required:""},null,512),[[n.Jo,u.newPlayer.lastName]]),(0,t.bo)((0,t.Lk)("input",{"onUpdate:modelValue":l[2]||(l[2]=e=>u.newPlayer.number=e),type:"number",placeholder:"Player Number",required:""},null,512),[[n.Jo,u.newPlayer.number,void 0,{number:!0}]]),u.editMode?((0,t.uX)(),(0,t.CE)(t.FK,{key:1},[(0,t.Lk)("button",{onClick:l[3]||(l[3]=e=>u.editPlayerLineups(u.newPlayer.number)),type:"button",class:"edit-lineups-button"},"Edit Lineups"),l[24]||(l[24]=(0,t.Lk)("button",{type:"submit",class:"update-player-button"},"Update Player",-1)),(0,t.Lk)("button",{type:"button",onClick:l[4]||(l[4]=(...e)=>u.cancelEdit&&u.cancelEdit(...e)),class:"cancel-button"},"Cancel")],64)):((0,t.uX)(),(0,t.CE)("button",v,"Add Player"))],32),(0,t.Lk)("div",L,[l[25]||(l[25]=(0,t.Lk)("h3",null,"Team Roster",-1)),(0,t.Lk)("ul",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.sortedPlayers,(e=>((0,t.uX)(),(0,t.CE)("li",{key:e.number},[(0,t.Lk)("span",null,(0,y.v_)(e.number)+" - "+(0,y.v_)(e.firstName)+" "+(0,y.v_)(e.lastName),1),(0,t.Lk)("div",null,[(0,t.Lk)("button",{onClick:l=>u.editPlayer(e),class:"edit-button"},"Edit",8,k),(0,t.Lk)("button",{onClick:l=>u.removePlayer(e.number),class:"remove-button"},"Remove",8,P)])])))),128))])]),(0,t.Lk)("div",b,[l[26]||(l[26]=(0,t.Lk)("label",{for:"minPlays"},"Minimum Plays Required:",-1)),(0,t.bo)((0,t.Lk)("input",{id:"minPlays","onUpdate:modelValue":l[6]||(l[6]=e=>u.minPlays=e),type:"number",required:""},null,512),[[n.Jo,u.minPlays,void 0,{number:!0}]])]),(0,t.Lk)("button",{onClick:l[7]||(l[7]=(...e)=>u.saveTeam&&u.saveTeam(...e)),disabled:!u.canSaveTeam,class:"save-team-button"},"Save",8,h),(0,t.Lk)("div",C,[(0,t.Lk)("button",{onClick:l[8]||(l[8]=(...e)=>u.exportTeam&&u.exportTeam(...e)),class:"export-button"},"Export Team"),(0,t.Lk)("input",{type:"file",onChange:l[9]||(l[9]=(...e)=>u.importTeam&&u.importTeam(...e)),ref:"fileInput",style:{display:"none"}},null,544),(0,t.Lk)("button",{onClick:l[10]||(l[10]=l=>e.$refs.fileInput.click()),class:"import-button"},"Import Team")]),(0,t.Lk)("div",g,[l[27]||(l[27]=(0,t.Lk)("h3",null,"Clear Data Options",-1)),(0,t.Lk)("button",{onClick:l[11]||(l[11]=(...e)=>u.clearAllPlays&&u.clearAllPlays(...e)),class:"clear-plays-button"},"Clear All Plays"),(0,t.Lk)("button",{onClick:l[12]||(l[12]=(...e)=>u.clearEntireTeam&&u.clearEntireTeam(...e)),class:"clear-team-button"},"Remove Entire Team")]),(0,t.Lk)("div",f,[l[28]||(l[28]=(0,t.Lk)("h3",null,"Lineup Management",-1)),(0,t.Lk)("button",{onClick:l[13]||(l[13]=e=>u.showLineupModal=!0),class:"create-lineup-button"},"Create Lineup"),(0,t.Lk)("button",{onClick:l[14]||(l[14]=e=>u.showEditLineupModal=!0),class:"edit-lineup-button"},"Edit Lineup")]),u.showLineupModal?((0,t.uX)(),(0,t.CE)("div",E,[(0,t.Lk)("div",w,[l[29]||(l[29]=(0,t.Lk)("h3",null,"Create Lineup",-1)),(0,t.bo)((0,t.Lk)("input",{"onUpdate:modelValue":l[15]||(l[15]=e=>u.newLineupName=e),placeholder:"Lineup Name",required:""},null,512),[[n.Jo,u.newLineupName]]),(0,t.Lk)("div",T,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.sortedPlayers,(e=>((0,t.uX)(),(0,t.CE)("button",{key:e.number,onClick:l=>u.togglePlayerInLineup(e.number),class:(0,y.C4)({selected:u.newLineupPlayers.includes(e.number)})},(0,y.v_)(e.number)+" - "+(0,y.v_)(e.firstName)+" "+(0,y.v_)(e.lastName),11,N)))),128))]),(0,t.Lk)("p",null,"Selected Players: "+(0,y.v_)(u.newLineupPlayers.length)+"/11",1),(0,t.Lk)("button",{onClick:l[16]||(l[16]=(...e)=>u.saveLineup&&u.saveLineup(...e)),disabled:!u.canSaveLineup},"Save Lineup",8,M),(0,t.Lk)("button",{onClick:l[17]||(l[17]=(...e)=>u.closeLineupModal&&u.closeLineupModal(...e))},"Cancel")])])):(0,t.Q3)("",!0),u.showEditLineupModal?((0,t.uX)(),(0,t.CE)("div",S,[(0,t.Lk)("div",R,[l[30]||(l[30]=(0,t.Lk)("h3",null,"Edit Lineup",-1)),(0,t.bo)((0,t.Lk)("select",{"onUpdate:modelValue":l[18]||(l[18]=e=>u.editingLineupIndex=e)},[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.lineups,((e,l)=>((0,t.uX)(),(0,t.CE)("option",{key:l,value:l},(0,y.v_)(e.name),9,I)))),128))],512),[[n.u1,u.editingLineupIndex]]),null!==u.editingLineupIndex?(0,t.bo)(((0,t.uX)(),(0,t.CE)("input",{key:0,"onUpdate:modelValue":l[19]||(l[19]=e=>u.lineups[u.editingLineupIndex].name=e),placeholder:"Lineup Name",required:""},null,512)),[[n.Jo,u.lineups[u.editingLineupIndex].name]]):(0,t.Q3)("",!0),null!==u.editingLineupIndex?((0,t.uX)(),(0,t.CE)("div",x,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.sortedPlayers,(e=>((0,t.uX)(),(0,t.CE)("button",{key:e.number,onClick:l=>u.togglePlayerInEditingLineup(e.number),class:(0,y.C4)({selected:u.lineups[u.editingLineupIndex].players.includes(e.number)})},(0,y.v_)(e.number)+" - "+(0,y.v_)(e.firstName)+" "+(0,y.v_)(e.lastName),11,_)))),128))])):(0,t.Q3)("",!0),null!==u.editingLineupIndex?((0,t.uX)(),(0,t.CE)("p",X,"Selected Players: "+(0,y.v_)(u.lineups[u.editingLineupIndex].players.length)+"/11",1)):(0,t.Q3)("",!0),(0,t.Lk)("button",{onClick:l[20]||(l[20]=(...e)=>u.updateLineup&&u.updateLineup(...e)),disabled:!u.canUpdateLineup},"Update Lineup",8,O),null!==u.editingLineupIndex?((0,t.uX)(),(0,t.CE)("button",{key:3,onClick:l[21]||(l[21]=(...e)=>u.deleteLineup&&u.deleteLineup(...e))},"Delete Lineup")):(0,t.Q3)("",!0),(0,t.Lk)("button",{onClick:l[22]||(l[22]=(...e)=>u.closeEditLineupModal&&u.closeEditLineupModal(...e))},"Cancel")])])):(0,t.Q3)("",!0),u.showPlayerLineupsModal?((0,t.uX)(),(0,t.CE)("div",A,[(0,t.Lk)("div",K,[l[31]||(l[31]=(0,t.Lk)("h3",null,"Edit Player Lineups",-1)),(0,t.Lk)("p",W,(0,y.v_)(u.players.find((e=>e.number===u.editingPlayerNumber))?.firstName)+" "+(0,y.v_)(u.players.find((e=>e.number===u.editingPlayerNumber))?.lastName)+" ("+(0,y.v_)(u.editingPlayerNumber)+") ",1),(0,t.Lk)("div",U,[0===u.playerLineups.length?((0,t.uX)(),(0,t.CE)("div",F," This player is not in any lineups. ")):((0,t.uX)(!0),(0,t.CE)(t.FK,{key:1},(0,t.pI)(u.playerLineups,((e,l)=>((0,t.uX)(),(0,t.CE)("div",{key:l,class:"lineup-item"},[(0,t.Lk)("span",D,(0,y.v_)(e.name),1),(0,t.Lk)("button",{onClick:e=>u.removePlayerFromLineup(l),class:"remove-button"},"Remove",8,j)])))),128))]),(0,t.Lk)("div",B,[(0,t.Lk)("button",{onClick:l[23]||(l[23]=(...e)=>u.closePlayerLineupsModal&&u.closePlayerLineupsModal(...e)),class:"ok-button"},"OK")])])])):(0,t.Q3)("",!0)])}a(4114),a(4603),a(7566),a(8721);var Q=a(144),J={name:"TeamSetup",setup(){const e=(0,i.Pj)(),l=(0,r.rd)(),a=(0,t.WQ)("saveData"),n=(0,Q.KR)({firstName:"",lastName:"",number:""}),u=(0,Q.KR)(12),s=(0,Q.KR)(!1),o=(0,Q.KR)(-1),p=(0,Q.KR)(!1),c=(0,Q.KR)(!1),d=(0,Q.KR)(!1),y=(0,Q.KR)(""),m=(0,Q.KR)([]),v=(0,Q.KR)(null),L=(0,Q.KR)(null),k=(0,t.EW)((()=>e.state.players)),P=(0,t.EW)((()=>e.state.lineups)),b=(0,t.EW)((()=>[...k.value].sort(((e,l)=>e.number-l.number)))),h=(0,t.EW)((()=>null===L.value?[]:e.getters.getLineupsByPlayer(L.value))),C=e=>e.charAt(0).toUpperCase()+e.slice(1).toLowerCase(),g=()=>{const l={...n.value,firstName:C(n.value.firstName),lastName:C(n.value.lastName)};e.commit("addPlayer",l),n.value={firstName:"",lastName:"",number:""},a()},f=e=>{n.value={...e},s.value=!0,o.value=k.value.findIndex((l=>l.number===e.number)),window.scrollTo(0,0)},E=()=>{const l={...n.value,firstName:C(n.value.firstName),lastName:C(n.value.lastName)};e.commit("updatePlayer",{index:o.value,player:l}),w(),a()},w=()=>{n.value={firstName:"",lastName:"",number:""},s.value=!1,o.value=-1},T=l=>{e.commit("removePlayer",l),a()},N=(0,t.EW)((()=>k.value.length>0&&u.value>0)),M=()=>{e.commit("setMinPlays",u.value),a(),l.push("/tracking")},S=()=>{const l={players:k.value,minPlays:u.value,playerPlayCounts:e.state.playerPlayCounts,lineups:e.state.lineups},a=JSON.stringify(l,null,2),n=new Blob([a],{type:"application/json"}),t=URL.createObjectURL(n),s=document.createElement("a");s.href=t,s.download="team_data.json",s.click(),URL.revokeObjectURL(t)},R=l=>{const n=l.target.files[0];if(n){const l=new FileReader;l.onload=l=>{try{const n=JSON.parse(l.target.result);e.commit("setPlayers",n.players),e.commit("setMinPlays",n.minPlays),n.playerPlayCounts&&Object.entries(n.playerPlayCounts).forEach((([l,a])=>{e.commit("updatePlayerPlayCount",{playerNumber:parseInt(l),playCount:a})})),n.lineups&&e.commit("setLineups",n.lineups),u.value=n.minPlays,a(),alert("Team data imported successfully!")}catch(n){alert("Error importing team data. Please make sure the file is correct."),console.error("Import error:",n)}},l.readAsText(n)}},I=()=>{confirm("Are you sure you want to clear all plays? This action cannot be undone.")&&(e.commit("clearAllPlays"),a(),alert("All plays have been cleared."))},x=()=>{confirm("Are you sure you want to remove the entire team, all plays, and all lineups? This action cannot be undone.")&&(e.commit("clearAllData"),e.commit("clearLineups"),u.value=12,a(),alert("The entire team, all plays, and all lineups have been removed."))},_=e=>{const l=m.value.indexOf(e);l>-1?m.value.splice(l,1):m.value.length<11&&m.value.push(e)},X=e=>{if(null===v.value)return;const l=P.value[v.value],a=l.players.indexOf(e);a>-1?l.players.splice(a,1):l.players.length<11&&l.players.push(e)},O=(0,t.EW)((()=>""!==y.value.trim()&&m.value.length>0&&m.value.length<=11)),A=(0,t.EW)((()=>null!==v.value&&""!==P.value[v.value].name.trim()&&P.value[v.value].players.length>0&&P.value[v.value].players.length<=11)),K=()=>{e.commit("addLineup",{name:y.value,players:m.value}),F(),a()},W=()=>{null!==v.value&&(e.commit("updateLineup",{index:v.value,lineup:P.value[v.value]}),D(),a())},U=()=>{null!==v.value&&confirm("Are you sure you want to delete this lineup?")&&(e.commit("deleteLineup",v.value),D(),a())},F=()=>{p.value=!1,y.value="",m.value=[]},D=()=>{c.value=!1,v.value=null},j=e=>{L.value=e,d.value=!0},B=l=>{const n=h.value[l],t={...n,players:n.players.filter((e=>e!==L.value))},u=P.value.findIndex((e=>e.name===n.name));-1!==u&&(e.commit("updateLineup",{index:u,lineup:t}),a())},V=()=>{d.value=!1,L.value=null};return{newPlayer:n,players:k,sortedPlayers:b,minPlays:u,editMode:s,addPlayer:g,editPlayer:f,updatePlayer:E,cancelEdit:w,removePlayer:T,canSaveTeam:N,saveTeam:M,exportTeam:S,importTeam:R,clearAllPlays:I,clearEntireTeam:x,showLineupModal:p,showEditLineupModal:c,showPlayerLineupsModal:d,newLineupName:y,newLineupPlayers:m,editingLineupIndex:v,lineups:P,playerLineups:h,togglePlayerInLineup:_,togglePlayerInEditingLineup:X,canSaveLineup:O,canUpdateLineup:A,saveLineup:K,updateLineup:W,deleteLineup:U,closeLineupModal:F,closeEditLineupModal:D,editPlayerLineups:j,removePlayerFromLineup:B,closePlayerLineupsModal:V,editingPlayerNumber:L}}};const H=(0,p.A)(J,[["render",V],["__scopeId","data-v-2a7a6ef9"]]);var q=H;const $={class:"player-tracking"},z={class:"tracking-controls"},G={class:"tracking-mode"},Y={class:"switch"},Z={class:"action-buttons"},ee={class:"active-count"},le={class:"player-grid-container",ref:"gridContainer"},ae=["onClick","disabled"],ne={class:"action-buttons"},te=["disabled"],ue={key:0,class:"saved-message"},se={key:1,class:"modal"},ie={class:"modal-content"},re=["value"],oe=["disabled"];function pe(e,l,a,u,s,i){return(0,t.uX)(),(0,t.CE)("div",$,[(0,t.Lk)("div",z,[(0,t.Lk)("div",G,[l[10]||(l[10]=(0,t.Lk)("span",{class:"mode-label"},"On Field",-1)),(0,t.Lk)("label",Y,[(0,t.bo)((0,t.Lk)("input",{type:"checkbox","onUpdate:modelValue":l[0]||(l[0]=e=>u.isOnBench=e)},null,512),[[n.lH,u.isOnBench]]),l[9]||(l[9]=(0,t.Lk)("span",{class:"slider round"},null,-1))]),l[11]||(l[11]=(0,t.Lk)("span",{class:"mode-label"},"On Bench",-1))]),(0,t.Lk)("button",{onClick:l[1]||(l[1]=e=>u.showLoadLineupModal=!0),class:"load-lineup-button"},"Load Lineup")]),(0,t.Lk)("div",Z,[(0,t.Lk)("button",{onClick:l[2]||(l[2]=(...e)=>u.clearAllActive&&u.clearAllActive(...e)),class:"clear-all-button"},(0,y.v_)(u.isOnBench?"Clear All Bench Players":"Move All to Bench"),1),(0,t.Lk)("span",ee,"Active On-Field Players: "+(0,y.v_)(u.activeOnFieldCount),1)]),(0,t.Lk)("div",le,[(0,t.Lk)("div",{class:"player-grid",style:(0,y.Tr)(u.gridStyle)},[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.sortedDisplayedPlayers,(e=>((0,t.uX)(),(0,t.CE)("button",{key:e.number,onClick:l=>u.togglePlayer(e.number),class:(0,y.C4)({active:u.isPlayerActive(e.number),ineligible:!u.eligiblePlayers.map((e=>e.number)).includes(e.number)}),disabled:!u.isOnBench&&!u.eligiblePlayers.map((e=>e.number)).includes(e.number)},(0,y.v_)(e.number),11,ae)))),128))],4)],512),(0,t.Lk)("div",ne,[(0,t.Lk)("button",{onClick:l[3]||(l[3]=(...e)=>u.savePlay&&u.savePlay(...e)),class:"save-button"},"Save Play"),(0,t.Lk)("button",{onClick:l[4]||(l[4]=(...e)=>u.undoLastPlay&&u.undoLastPlay(...e)),class:"undo-button",disabled:!u.canUndoPlay},"Undo Last Play",8,te),(0,t.Lk)("button",{onClick:l[5]||(l[5]=(...e)=>u.viewTeamMPR&&u.viewTeamMPR(...e)),class:"view-mpr-button"},"View Team MPR")]),u.showSaved?((0,t.uX)(),(0,t.CE)("div",ue,"Saved")):(0,t.Q3)("",!0),u.showLoadLineupModal?((0,t.uX)(),(0,t.CE)("div",se,[(0,t.Lk)("div",ie,[l[12]||(l[12]=(0,t.Lk)("h3",null,"Load Lineup",-1)),(0,t.bo)((0,t.Lk)("select",{"onUpdate:modelValue":l[6]||(l[6]=e=>u.selectedLineupIndex=e)},[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.lineups,((e,l)=>((0,t.uX)(),(0,t.CE)("option",{key:l,value:l},(0,y.v_)(e.name)+" ("+(0,y.v_)(e.players.length)+" players) ",9,re)))),128))],512),[[n.u1,u.selectedLineupIndex]]),l[13]||(l[13]=(0,t.Lk)("div",{class:"lineup-info"},[(0,t.Lk)("p",null,[(0,t.Lk)("strong",null,"Note:")]),(0,t.Lk)("ul",null,[(0,t.Lk)("li",null,"Loading a lineup with 11 players will set all other eligible players to bench."),(0,t.Lk)("li",null,"Loading a lineup with fewer than 11 players will move those players to the field if they were on the bench.")])],-1)),(0,t.Lk)("button",{onClick:l[7]||(l[7]=(...e)=>u.loadLineup&&u.loadLineup(...e)),disabled:null===u.selectedLineupIndex},"Load",8,oe),(0,t.Lk)("button",{onClick:l[8]||(l[8]=(...e)=>u.closeLoadLineupModal&&u.closeLoadLineupModal(...e))},"Cancel")])])):(0,t.Q3)("",!0)])}a(7642),a(8004),a(3853),a(5876),a(2475),a(5024),a(1698);var ce={name:"PlayerTrackingView",setup(){const e=(0,i.Pj)(),l=(0,r.rd)(),a=(0,t.WQ)("saveData"),n=(0,Q.KR)(!1),u=(0,Q.KR)(null),s=(0,Q.KR)({}),o=(0,Q.KR)(!1),p=(0,Q.KR)(!1),c=(0,Q.KR)(null),d=(0,t.EW)((()=>e.state.players)),y=(0,t.EW)((()=>e.state.minPlays)),m=(0,t.EW)((()=>e.state.lineups)),v=(0,t.EW)({get:()=>e.state.selectedPlayers,set:l=>e.dispatch("updateSelectedPlayers",l)}),L=(0,t.EW)((()=>e.getters.onBenchPlayers)),k=(0,t.EW)((()=>d.value.filter((l=>{const a=e.getters.playerPlayCount(l.number);return a<y.value})))),P=(0,t.EW)((()=>v.value.length)),b=(0,t.EW)((()=>(n.value?d.value:k.value).sort(((e,l)=>e.number-l.number)))),h=(0,t.EW)((()=>e.getters.canUndoPlay)),C=e=>n.value?L.value.includes(e):v.value.includes(e),g=l=>{const a=[...v.value],n=a.indexOf(l);n>-1?a.splice(n,1):a.push(l),e.dispatch("updateSelectedPlayers",a)},f=()=>{n.value?e.dispatch("updateSelectedPlayers",k.value.map((e=>e.number))):e.dispatch("updateSelectedPlayers",[])},E=()=>{if(v.value.length>11){const e=confirm("There are more than 11 players on the field. Do you want to proceed?");if(!e)return}e.commit("savePlay",v.value),a(),N(),o.value=!0,setTimeout((()=>{o.value=!1}),1e3)},w=()=>{e.dispatch("undoLastPlay"),N()},T=()=>{l.push("/team-mpr")},N=()=>{if(!u.value)return;const e=u.value.clientWidth,l=u.value.clientHeight,a=b.value.length;let n=Math.ceil(Math.sqrt(a)),t=Math.ceil(a/n);l>e&&([n,t]=[t,n]),s.value={display:"grid",gridTemplateColumns:`repeat(${n}, 1fr)`,gridTemplateRows:`repeat(${t}, 1fr)`,gap:"4px",height:"100%"}},M=()=>{if(null===c.value)return;const l=m.value[c.value];if(11===l.players.length)e.dispatch("updateSelectedPlayers",l.players);else{const a=new Set(v.value);l.players.forEach((e=>{a.add(e)})),e.dispatch("updateSelectedPlayers",Array.from(a))}S()},S=()=>{p.value=!1,c.value=null};return(0,t.sV)((()=>{N(),window.addEventListener("resize",N)})),(0,t.hi)((()=>{window.removeEventListener("resize",N)})),(0,t.wB)(b,N),{isOnBench:n,sortedDisplayedPlayers:b,isPlayerActive:C,togglePlayer:g,clearAllActive:f,savePlay:E,undoLastPlay:w,canUndoPlay:h,viewTeamMPR:T,gridContainer:u,gridStyle:s,showSaved:o,showLoadLineupModal:p,selectedLineupIndex:c,lineups:m,loadLineup:M,closeLoadLineupModal:S,activeOnFieldCount:P,eligiblePlayers:k}}};const de=(0,p.A)(ce,[["render",pe],["__scopeId","data-v-b7f3f2a4"]]);var ye=de;const me={class:"team-mpr"},ve={class:"table-responsive"},Le={key:1},ke=["onClick"],Pe=["onClick"];function be(e,l,a,u,s,i){return(0,t.uX)(),(0,t.CE)("div",me,[l[4]||(l[4]=(0,t.Lk)("h2",null,"Team MPR",-1)),(0,t.Lk)("div",ve,[(0,t.Lk)("table",null,[l[3]||(l[3]=(0,t.Lk)("thead",null,[(0,t.Lk)("tr",null,[(0,t.Lk)("th",null,"No."),(0,t.Lk)("th",null,"Name"),(0,t.Lk)("th",null,"Plays"),(0,t.Lk)("th",null,"Left"),(0,t.Lk)("th",null,"Status"),(0,t.Lk)("th",null,"Actions")])],-1)),(0,t.Lk)("tbody",null,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(u.sortedPlayersMPR,(e=>((0,t.uX)(),(0,t.CE)("tr",{key:e.number,class:(0,y.C4)({completed:"Completed"===e.status})},[(0,t.Lk)("td",null,(0,y.v_)(e.number),1),(0,t.Lk)("td",null,(0,y.v_)(e.firstName)+" "+(0,y.v_)(e.lastName),1),(0,t.Lk)("td",null,[u.editingPlayer===e.number?(0,t.bo)(((0,t.uX)(),(0,t.CE)("input",{key:0,"onUpdate:modelValue":l[0]||(l[0]=e=>u.editPlayCount=e),type:"number",min:"0"},null,512)),[[n.Jo,u.editPlayCount,void 0,{number:!0}]]):((0,t.uX)(),(0,t.CE)("span",Le,(0,y.v_)(e.plays),1))]),(0,t.Lk)("td",null,(0,y.v_)(e.playsRemaining),1),(0,t.Lk)("td",{class:(0,y.C4)({"status-completed":"Completed"===e.status})},(0,y.v_)(e.status),3),(0,t.Lk)("td",null,[u.editingPlayer===e.number?((0,t.uX)(),(0,t.CE)("button",{key:0,onClick:l=>u.savePlayCount(e.number),class:"save-button"},"Save",8,ke)):((0,t.uX)(),(0,t.CE)("button",{key:1,onClick:l=>u.startEditing(e),class:"edit-button"},"Edit",8,Pe)),u.editingPlayer===e.number?((0,t.uX)(),(0,t.CE)("button",{key:2,onClick:l[1]||(l[1]=(...e)=>u.cancelEditing&&u.cancelEditing(...e)),class:"cancel-button"},"Cancel")):(0,t.Q3)("",!0)])],2)))),128))])])]),(0,t.Lk)("button",{onClick:l[2]||(l[2]=(...e)=>u.backToTracking&&u.backToTracking(...e)),class:"back-button"},"Back to Tracking")])}var he={name:"TeamMPRView",setup(){const e=(0,i.Pj)(),l=(0,r.rd)(),a=(0,t.WQ)("saveData"),n=(0,Q.KR)(null),u=(0,Q.KR)(0),s=(0,t.EW)((()=>{const l=e.state.minPlays;return e.state.players.map((a=>{const n=e.getters.playerPlayCount(a.number),t=Math.max(0,l-n);return{...a,plays:n,playsRemaining:t,status:n>=l?"Completed":"In Progress"}}))})),o=(0,t.EW)((()=>{const e=s.value.filter((e=>"In Progress"===e.status)),l=s.value.filter((e=>"Completed"===e.status)),a=(e,l)=>e.plays!==l.plays?e.plays-l.plays:e.number-l.number;return e.sort(a),l.sort(((e,l)=>e.plays!==l.plays?l.plays-e.plays:e.number-l.number)),[...e,...l]})),p=e=>{n.value=e.number,u.value=e.plays},c=l=>{e.commit("updatePlayerPlayCount",{playerNumber:l,playCount:u.value}),n.value=null,a()},d=()=>{n.value=null},y=()=>{l.push("/tracking")};return{sortedPlayersMPR:o,editingPlayer:n,editPlayCount:u,startEditing:p,savePlayCount:c,cancelEditing:d,backToTracking:y}}};const Ce=(0,p.A)(he,[["render",be],["__scopeId","data-v-0c8ab034"]]);var ge=Ce;const fe=[{path:"/",name:"TeamSetup",component:q},{path:"/tracking",name:"PlayerTracking",component:ye},{path:"/team-mpr",name:"TeamMPR",component:ge}],Ee=(0,r.aE)({history:(0,r.Bt)(),routes:fe});var we=Ee,Te=(0,i.y$)({state:{players:[],minPlays:0,currentPlay:[],playHistory:[],playerPlayCounts:{},selectedPlayers:[],lineups:[]},mutations:{addPlayer(e,l){e.players.push(l)},updatePlayer(e,{index:l,player:a}){e.players.splice(l,1,a)},removePlayer(e,l){e.players=e.players.filter((e=>e.number!==l))},setMinPlays(e,l){e.minPlays=l},setPlayers(e,l){e.players=l},updateCurrentPlay(e,l){const a=e.currentPlay.indexOf(l);a>-1?e.currentPlay.splice(a,1):e.currentPlay.push(l)},savePlay(e,l){e.playHistory.push([...l]),l.forEach((l=>{e.playerPlayCounts[l]=(e.playerPlayCounts[l]||0)+1})),e.currentPlay=[]},updatePlayerPlayCount(e,{playerNumber:l,playCount:a}){e.playerPlayCounts[l]=a},clearAllPlays(e){e.currentPlay=[],e.playHistory=[],e.playerPlayCounts={}},clearAllData(e){e.players=[],e.minPlays=12,e.currentPlay=[],e.playHistory=[],e.playerPlayCounts={},e.selectedPlayers=[],e.lineups=[]},setSelectedPlayers(e,l){e.selectedPlayers=l},updateSelectedPlayers(e,l){e.selectedPlayers=l},addLineup(e,l){e.lineups.push(l)},updateLineup(e,{index:l,lineup:a}){e.lineups.splice(l,1,a)},deleteLineup(e,l){e.lineups.splice(l,1)},setLineups(e,l){e.lineups=l},clearLineups(e){e.lineups=[]},undoLastPlay(e){if(e.playHistory.length>0){const l=e.playHistory.pop();l.forEach((l=>{e.playerPlayCounts[l]>0&&e.playerPlayCounts[l]--}))}}},actions:{initializeStore({commit:e}){const l=localStorage.getItem("teamData");if(l){const{players:a,minPlays:n,playerPlayCounts:t,selectedPlayers:u,lineups:s}=JSON.parse(l);e("setPlayers",a),e("setMinPlays",n),t&&Object.entries(t).forEach((([l,a])=>{e("updatePlayerPlayCount",{playerNumber:parseInt(l),playCount:a})})),u&&e("setSelectedPlayers",u),s&&e("setLineups",s)}},saveToLocalStorage({state:e}){localStorage.setItem("teamData",JSON.stringify({players:e.players,minPlays:e.minPlays,playerPlayCounts:e.playerPlayCounts,selectedPlayers:e.selectedPlayers,lineups:e.lineups}))},updateSelectedPlayers({commit:e},l){e("updateSelectedPlayers",l)},undoLastPlay({commit:e,dispatch:l}){e("undoLastPlay"),l("saveToLocalStorage")}},getters:{playerPlayCount:e=>l=>e.playerPlayCounts[l]||0,getLineupsByPlayer:e=>l=>e.lineups.filter((e=>e.players.includes(l))),onBenchPlayers:e=>e.players.filter((l=>!e.selectedPlayers.includes(l.number))).map((e=>e.number)),canUndoPlay:e=>e.playHistory.length>0}});(0,n.Ef)(d).use(we).use(Te).mount("#app")}},l={};function a(n){var t=l[n];if(void 0!==t)return t.exports;var u=l[n]={exports:{}};return e[n].call(u.exports,u,u.exports,a),u.exports}a.m=e,function(){var e=[];a.O=function(l,n,t,u){if(!n){var s=1/0;for(p=0;p<e.length;p++){n=e[p][0],t=e[p][1],u=e[p][2];for(var i=!0,r=0;r<n.length;r++)(!1&u||s>=u)&&Object.keys(a.O).every((function(e){return a.O[e](n[r])}))?n.splice(r--,1):(i=!1,u<s&&(s=u));if(i){e.splice(p--,1);var o=t();void 0!==o&&(l=o)}}return l}u=u||0;for(var p=e.length;p>0&&e[p-1][2]>u;p--)e[p]=e[p-1];e[p]=[n,t,u]}}(),function(){a.n=function(e){var l=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(l,{a:l}),l}}(),function(){a.d=function(e,l){for(var n in l)a.o(l,n)&&!a.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:l[n]})}}(),function(){a.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){a.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)}}(),function(){var e={524:0};a.O.j=function(l){return 0===e[l]};var l=function(l,n){var t,u,s=n[0],i=n[1],r=n[2],o=0;if(s.some((function(l){return 0!==e[l]}))){for(t in i)a.o(i,t)&&(a.m[t]=i[t]);if(r)var p=r(a)}for(l&&l(n);o<s.length;o++)u=s[o],a.o(e,u)&&e[u]&&e[u][0](),e[u]=0;return a.O(p)},n=self["webpackChunkmpr"]=self["webpackChunkmpr"]||[];n.forEach(l.bind(null,0)),n.push=l.bind(null,n.push.bind(n))}();var n=a.O(void 0,[504],(function(){return a(3020)}));n=a.O(n)})();
//# sourceMappingURL=app.faa87f44.js.map