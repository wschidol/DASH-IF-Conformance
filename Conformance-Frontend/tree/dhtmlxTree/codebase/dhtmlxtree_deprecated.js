/*
Product Name: dhtmlxTree 
Version: 5.1.0 
Edition: Standard 
License: content of this file is covered by DHTMLX Commercial or enterpri. Usage outside GPL terms is prohibited. To obtain Commercial or Enterprise license contact sales@dhtmlx.com
Copyright UAB Dinamenta http://www.dhtmlx.com
*/

window.dhtmlxAjax={get:function(a,c,b){if(b){return dhx4.ajax.getSync(a)}else{dhx4.ajax.get(a,c)}},post:function(a,b,d,c){if(c){return dhx4.ajax.postSync(a,b)}else{dhx4.ajax.post(a,b,d)}},getSync:function(a){return dhx4.ajax.getSync(a)},postSync:function(a,b){return dhx4.ajax.postSync(a,b)}};dhtmlXMenuObject.prototype.loadXML=function(a,b){this.loadStruct(a,b)};dhtmlXMenuObject.prototype.loadXMLString=function(b,a){this.loadStruct(b,a)};dhtmlXMenuObject.prototype.setIconPath=function(a){this.setIconsPath(a)};dhtmlXMenuObject.prototype.setImagePath=function(){};dhtmlXTreeObject.prototype.addPath=function(b,e,c,h){this.activatePaths();c=c||{};var d=[];var g=null;var f=this._idpull[e];var a=this._idpull[b];while(a!=g){d.push({open:this._getOpenState(f),from:f.id,size:(g?this._getIndex(g):0),to:(g?g.id:null),style:"border-left:"+(c.width||1)+"px "+(c.mode||"solid")+" "+(c.color||"red")+"; border-bottom:"+(c.width||1)+"px "+(c.mode||"solid")+" "+(c.color||"red")+";"});g=f;f=f.parentObject}while(!h||this._pathspull[h]){h=(h||0)+1}this._pathspull[h]={path:d,id:h};this._paths.push(this._pathspull[h]);this._renderPath(this._pathspull[h])};dhtmlXTreeObject.prototype.activatePaths=function(a){var b=this;this.attachEvent("onOpenEnd",function(){for(var c=0;c<b._paths.length;c++){b._clearPath(b._paths[c]);b._renderPath(b._paths[c])}});this.attachEvent("onXLE",function(e){var d=dhx4.ajax.xpath("//pathend",e);var h=dhx4.ajax.xpath("//pathstart",e);var g={};for(var f=0;f<h.length;f++){g[h[f].getAttribute("id")]=h[f]}for(var f=0;f<h.length;f++){var c=d[f].parentNode;var j=g[d[f].getAttribute("id")];this.addPath(j.parentNode.getAttribute("id"),c.getAttribute("id"),{color:j.getAttribute("color"),mode:j.getAttribute("mode"),width:j.getAttribute("width")},j.getAttribute("id"))}});if(a){this._halfHeight=a}else{if(this._idpull[0].childsCount){this._halfHeight=Math.floor(this._idpull[0].childNodes[0].span.parentNode.offsetHeight/2)}}if(!this._halfHeight){this._halfHeight=9}this.activatePaths=function(){}};dhtmlXTreeObject.prototype._clearPath=function(c){for(var b=c.path.length-1;b>0;b--){var a=c.path[b];if(a._html){a._html.parentNode.removeChild(a._html)}a._html=null}};dhtmlXTreeObject.prototype._renderPath=function(g){var k=this._idpull[g.path[g.path.length-1].from].span.parentNode.parentNode;var f=(_isIE?9:8)+this._halfHeight;var e=(_isIE?27:27);while(k.offsetParent!=this.allTree){f+=k.offsetTop;e+=k.offsetLeft;k=k.offsetParent}for(var b=g.path.length-1;b>0;b--){var a=g.path[b];var h=document.createElement("div");if(!this._idpull[a.to].tr.offsetHeight){return}var j=this._idpull[a.to].tr.offsetTop;h.style.cssText="position:absolute; z-index:1; width:"+(_isIE?10:8)+"px; height:"+(j-9)+"px; left:"+e+"px; top:"+f+"px;"+a.style;f+=j;e+=18;this.allTree.appendChild(h);a._html=h}};dhtmlXTreeObject.prototype.deletePath=function(c){var b=this._pathspull[c];if(b){this._clearPath(b);delete this._pathspull[c];for(var a=0;a<this._paths.length;a++){if(this._paths[a]==b){return this._paths.splice(a,1)}}}};dhtmlXTreeObject.prototype.deleteAllPaths=function(b){for(var a=this._paths.length-1;a>=0;a--){this.deletePath(this._paths[a].id)}};dhtmlXTreeObject.prototype._paths=[];dhtmlXTreeObject.prototype._pathspull={};dhtmlXTreeObject.prototype.enableSmartRendering=function(){this.enableSmartXMLParsing(true);this._srnd=true;this.itemHeight=18;var a=this;this.allTree.onscroll=function(){if(a._srndT){return}a._srndT=window.setTimeout(function(){a._srndT=null;a._renderState()},300)};this.attachEvent("onXLE",function(){a._renderState()});this._singleTimeSRND()};dhtmlXTreeObject.prototype._renderState=function(){if(!this._idpull[this.rootId]._sready){this.prepareSR(this.rootId,true)}var b=this.allTree.scrollTop;var c=Math.floor(b/this.itemHeight);var a=Math.ceil(this.allTree.offsetHeight/this.itemHeight);this._group_render=true;this._getItemByPos(b,this.itemHeight,a,null,false,this._renderItemSRND);this._group_render=false};dhtmlXTreeObject.prototype._renderItemSRND=function(k,j){if(!k.span){k.span=-1;var f=k.parentObject.htmlNode.childNodes[0].childNodes;var e=j*this.itemHeight;var l=null;for(var c=1;c<f.length;c++){l=f[c];var g=l.nodem?this.itemHeight:(l.offsetHeight||parseInt(l.childNodes[1].firstChild.style.height));e-=g;if(e<0){if(e==-1){e++;continue}var d=l.childNodes[1].firstChild;d.style.height=(parseInt(d.style.height)-(g-Math.abs(e)+this.itemHeight))+"px";if(Math.abs(e)!=g){var n=this._drawNewHolder(e+g,true);l.parentNode.insertBefore(n,l)}l.tr={nextSibling:l};break}}if(d&&d.style.height!="0px"&&!l.offsetHeight){var m=this._hAdI;this._hAdI=true}this._parseItem(k._sxml,k.parentObject,null,l);if(d&&d.style.height!="0px"&&!l.offsetHeight){this._hAdI=m}if(k.unParsed){this._correctPlus(k)}if(d&&d.style.height=="0px"){l.parentNode.removeChild(l)}}};dhtmlXTreeObject.prototype._buildSRND=function(b,a){if(b.parentObject){this._globalIdStorageFind(b.parentObject.id)}if(!this._idpull[this.rootId]._sready){this.prepareSR(this.rootId,true)}this._renderItemSRND(b,this._getIndex(b));if((b.unParsed)&&(!a)){this.reParse(b,0)}if(!b.prepareSR){this.prepareSR(b.id)}};dhtmlXTreeObject.prototype._getIndex=function(c){for(var b=0;b<c.parentObject.childsCount;b++){if(c.parentObject.childNodes[b]==c){return b}}};dhtmlXTreeObject.prototype.prepareSR=function(a,c){a=this._idpull[a];if(a._sready){return}var b=this._drawNewHolder(this.itemHeight*a.childsCount,c);a.htmlNode.childNodes[0].appendChild(b);a._sready=true};dhtmlXTreeObject.prototype._drawNewHolder=function(e,g){var d=document.createElement("TR");var a=document.createElement("TD");var c=document.createElement("TD");var f=document.createElement("DIV");f.innerHTML="&nbsp;";a.appendChild(f);d.appendChild(c);d.appendChild(a);if(!g){d.style.display="none"}f.style.height=e+"px";return d};dhtmlXTreeObject.prototype._getNextNodeSR=function(a,b){if((!b)&&(a.childsCount)){return a.childNodes[0]}if(a==this.htmlNode){return -1}if((a.tr)&&(a.tr.nextSibling)&&(a.tr.nextSibling.nodem)){return a.tr.nextSibling.nodem}return this._getNextNode(a.parentObject,true)};dhtmlXTreeObject.prototype._getItemByPos=function(k,e,b,d,a,g){if(!d){this._pos_c=k;d=this._idpull[this.rootId]}for(var c=0;c<d.childsCount;c++){this._pos_c-=e;if(this._pos_c<=0){a=true}if(a){g.apply(this,[d.childNodes[c],c]);b--}if(b<0){return b}if(d.childNodes[c]._open){b=this._getItemByPos(null,e,b,d.childNodes[c],a,g);if(b<0){return b}}}return b};dhtmlXTreeObject.prototype._addItemSRND=function(b,f,e){var c=this._idpull[b];var a=c.childsCount;var d=c.childNodes;d[a]=new dhtmlXTreeItemObject(f,"",c,this,null,1);itemId=d[a].id;d[a]._sxml=e.clone();c.childsCount++};dhtmlXTreeObject.prototype._singleTimeSRND=function(){this._redrawFrom=function(){};var a=dhtmlXTreeItemObject;this._singleTimeSRND=function(){};window.dhtmlXTreeItemObject=function(g,c,d,b,e,f){if(!b._srnd){return a.call(this,g,c,d,b,e,f)}this.htmlNode="";this.acolor="";this.scolor="";this.tr=0;this.childsCount=0;this.tempDOMM=0;this.tempDOMU=0;this.dragSpan=0;this.dragMove=0;this.span=0;this.closeble=1;this.childNodes=new Array();this.userData=new cObject();this.checkstate=0;this.treeNod=b;this.label=c;this.parentObject=d;this.actionHandler=e;this.images=new Array(b.imageArray[0],b.imageArray[1],b.imageArray[2]);this.id=b._globalIdStorageAdd(g,this);if(g==b.rootId){if(this.treeNod.checkBoxOff){this.htmlNode=this.treeNod._createItem(1,this,f)}else{this.htmlNode=this.treeNod._createItem(0,this,f)}this.htmlNode.objBelong=this}return this};this.setCheckSR=this.setCheck;this.setCheck=function(c,b){this._globalIdStorageFind(c);return this.setCheckSR(c,b)};this._get_srnd_p=function(e){var d=[];while(e!=this.rootId){var b=this.getParentId(e);for(var c=0;c<this._idpull[b].childsCount;c++){if(this._idpull[b].childNodes[c].id==e){d.push([b,c]);break}}e=b}d.reverse();return d};this._get_srnd_p_last=function(f,d,b){d=d||[];var e=0;while(true){var c=this._idpull[f];if(c._sxml&&this.findStrInXML(c._sxml.d,"text",b)){this._globalIdStorageFind(c.id)}var e=c.childsCount;if(!e){break}d.push([f,e-1]);f=c.childNodes[e-1].id}return d};this._get_prev_srnd=function(e,b){var c;if(!e.length){e.push.apply(e,this._get_srnd_p_last(this.rootId,null,b));c=e[e.length-1];return this._idpull[c[0]].childNodes[c[1]]}c=e[e.length-1];if(c[1]){c[1]--;var d=this._idpull[c[0]].childNodes[c[1]];this._get_srnd_p_last(d.id,e,b);var c=e[e.length-1];return this._idpull[c[0]].childNodes[c[1]]}else{e.pop();if(!e.length){return this._get_prev_srnd(e,b)}var c=e[e.length-1];return this._idpull[c[0]].childNodes[c[1]]}};this._get_next_srnd=function(e,c){if(!e.length){e.push([this.rootId,0]);return this._idpull[this.rootId].childNodes[0]}var b=e[e.length-1];var d=this._idpull[b[0]].childNodes[b[1]];if(d.childsCount&&!c){e.push([d.id,0]);return d.childNodes[0]}b[1]++;var d=this._idpull[b[0]].childNodes[b[1]];if(d){return d}e.pop();if(!e.length){return this.htmlNode}return this._get_next_srnd(e,true)};this._findNodeByLabel=function(b,f,d){var b=b.replace(new RegExp("^( )+"),"").replace(new RegExp("( )+$"),"");b=new RegExp(b.replace(/([\*\+\\\[\]\(\)]{1})/gi,"\\$1").replace(/ /gi,".*"),"gi");if(!d){d=this._selected[0];if(!d){d=this.htmlNode}}var c=d;var e=this._get_srnd_p(c.id);while(d=(f?this._get_prev_srnd(e,b):this._get_next_srnd(e))){if(d.label){if(d.label.search(b)!=-1){return d}}else{if(d._sxml){if(d._sxml.get("text").search(b)!=-1){return d}if(this.findStrInXML(d._sxml.d,"text",b)){this._globalIdStorageFind(d.id)}}}if((d.unParsed)&&(this.findStrInXML(d.unParsed.d,"text",b))){this.reParse(d)}if(c.id==d.id){break}if(f&&e.length==1&&e[0][1]==0){break}}return null};this.deleteChildItems=function(b){if(this.rootId==b){this._selected=new Array();this._idpull={};this._p=this._pos_c=this._pullSize=null;this.allTree.removeChild(this.htmlNode.htmlNode);this.htmlNode=new dhtmlXTreeItemObject(this.rootId,"",0,this);this.htmlNode.htmlNode.childNodes[0].childNodes[0].style.display="none";this.htmlNode.htmlNode.childNodes[0].childNodes[0].childNodes[0].className="hiddenRow";this.allTree.insertBefore(this.htmlNode.htmlNode,this.selectionBar);if(_isFF){this.allTree.childNodes[0].width="100%";this.allTree.childNodes[0].style.overflow="hidden"}}};this._HideShow=function(c,g){if((this.XMLsource)&&(!c.XMLload)){if(g==1){return}c.XMLload=1;this._loadDynXML(c.id);return}if(!c.span){this._buildSRND(c)}if(c.unParsed){this.reParse(c);this.prepareSR(c.id)}if(c.childsCount==0){return}var f=c.htmlNode.childNodes[0].childNodes;var b=f.length;if(b>1){if(((f[1].style.display!="none")||(g==1))&&(g!=2)){this.allTree.childNodes[0].border="1";this.allTree.childNodes[0].border="0";var e="none";c._open=false}else{var e="";c._open=true}for(var d=1;d<b;d++){f[d].style.display=e}this._renderState()}this._correctPlus(c)}};