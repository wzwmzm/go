!function(y,E,Z){"use strict";var g="px",I="0",M="innerHTML",n="className",X=ht.Default,f=ht.Color,R=ht.Node,s="position",C="top",r="left",m=X.animate,J=X.getInternal(),o="width",I="0",w="none",K="max-height",L="font",V="background",u="border-box",p="user-select",q="box-sizing",H="overflow",z=X.isTouchable,J=X.getInternal(),v=f.titleIconBackground,N=X.scrollBarInteractiveSize,t=/msie 9/.test(y.navigator?y.navigator.userAgent.toLowerCase():""),h=null,Y=function(){return document},F=function(R){return Y().createElement(R)},b=function(){return F("div")},j=function(){var e=b(),u=e.style;return u.msTouchAction=w,u.cursor="default",z&&u.setProperty("-webkit-tap-highlight-color","rgba(0, 0, 0, 0)",h),u.position="absolute",u.left=I,u.top=I,e},B=function(){return F("canvas")},k=function(){return document.body},O=function(G,D,B){G.style.setProperty(D,B,h)},_=function(f,d){f.style.removeProperty(d)},T=function(M,r,R){X.def(ht.widget[M],r,R)},e=function(I,y){I.appendChild(y)},c=function(Q,n){Q.removeChild(n)},P=function(E,W,x,X){E.addEventListener(W,x,!!X)};J.addMethod(X,{paletteExpandIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:v,rotation:3.14}]},paletteCollapseIcon:{width:16,height:16,comps:[{type:"triangle",rect:[4,4,10,8],background:v}]},paletteTitleLabelColor:X.labelSelectColor,paletteTitleLabelFont:X.labelFont,paletteContentLabelFont:X.labelFont,paletteContentLabelColor:"#777",paletteContentBackground:"#fff",paletteTitleHeight:X.widgetTitleHeight,paletteTitleBackground:f.titleBackground,paletteTitleHoverBackground:f.titleBackground,paletteSeparatorWidth:1,paletteSeparatorColor:Z,paletteItemHoverBorderColor:f.highlight,paletteItemSelectBackground:f.highlight},!0);var S=".palette-item:hover{border: 1px solid "+X.paletteItemHoverBorderColor+" !important}"+" .palette-header:hover{background: "+X.paletteTitleHoverBackground+" !important}",i=document.createElement("style");z||(i.styleSheet?i.styleSheet.cssText=S:i.appendChild(Y().createTextNode(S))),Y().getElementsByTagName("head")[0].appendChild(i);var W=function(N){var G=this;G.$22h=N,G.addListeners()};X.def(W,E,{ms_listener:1,getView:function(){return this.$22h.getView()},$26h:function(){var c=this;c.$36h&&k().removeChild(c.$36h),c.$23h=c.$24h=c.$25h=c.$35h=c.$36h=h},handle_touchstart:function(v){for(var R,U=this,B=U.$22h,K=v.target,Z=B.sm(),y=B.dm(),e="palette-header",u="palette-header-tool",N="palette-item",P=!1,A=!1,V=!1;K&&(K[n]||"").indexOf(e)<0&&(K[n]||"").indexOf(N)<0;)K=K.parentNode;if(K&&K[n].indexOf(u)>=0?P=!0:K&&K[n].indexOf(e)>=0?V=!0:K&&K[n].indexOf(N)>=0&&(A=!0),X.isLeftButton(v))if(U.$27h(v))U.$24h=X.getClientPoint(v),U.$25h=B.ty();else if(P){X.preventDefault(v),R=K.parentNode.$11h;var w=y.getDataById(R),T=w.s("tools")[K.toolIndex];T.action&&T.action.call(B)}else if(V){X.preventDefault(v),R=K.$11h;var w=y.getDataById(R);w.isExpanded()?w.setExpanded(!1):w.setExpanded(!0)}else if(A){R=K.$11h;var G=y.getDataById(R);Z.ss(G),B.handleDragAndDrop&&(X.preventDefault(v),G.s("draggable")&&(B.handleDragAndDrop(v,"prepare"),U.$35h=0)),G.s("draggable")||(X.preventDefault(v),U.$24h=X.getClientPoint(v),U.$25h=B.ty())}else X.preventDefault(v),U.$24h=X.getClientPoint(v),U.$25h=B.ty();else U.$26h(v)},handle_mousedown:function(E){this.handle_touchstart(E)},handle_mousewheel:function(G){this.handleScroll(G,G.wheelDelta/40,G.wheelDelta!==G.wheelDeltaX)},handle_DOMMouseScroll:function(s){this.handleScroll(s,-s.detail,1)},handleScroll:function(J,U,e){var f=this.$22h;X.preventDefault(J),e&&f._41o()&&f.ty(f.ty()+20*U)},handle_mouseup:function(u){this.handle_touchend(u)},handle_touchend:function(O){var H=this;H.$37h(O),H.$26h(O)},handleWindowMouseUp:function(O){this.handleWindowTouchEnd(O)},handleWindowTouchEnd:function(N){var q=this;q.$37h(N),q.$26h(N)},$37h:function(h){var y=this,p=y.$22h;2===y.$35h&&(y.$35h=3,p.handleDragAndDrop(h,"end"))},handleWindowMouseMove:function(i){this.handleWindowTouchMove(i)},handleWindowTouchMove:function(e){var R=this,o=R.$22h,V=R.$23h,v=R.$24h,D=R.$25h,l=X.getClientPoint(e),b=o._29I,E=R.$36h;if(1===R.$35h||2===R.$35h){if(R.$35h=2,o.handleDragAndDrop(e,"between"),z){var j=e.touches[0];e=j?j:e.changedTouches[0]}E.style.left=e.pageX-parseInt(E.width)/2+g,E.style.top=e.pageY-parseInt(E.height)/2+g}else"p"===V?o.ty(D+l.y-v.y):"v"===V&&o.ty(D+(v.y-l.y)/b.height*o._59I)},handle_mousemove:function(v){this.handle_touchmove(v)},handle_touchmove:function(M){if(!X.isDragging()&&X.isLeftButton(M)){var C=this,j=C.$22h,m=C.$27h(M);if(C.$24h){if(!C.$23h){if(X.getDistance(X.getClientPoint(M),C.$24h)<2)return;C.$23h=m?"v":"p",X.startDragging(C)}}else if(m)j._43o();else if(0===C.$35h){if(C.$35h=1,j.handleDragAndDrop(M,"begin"),z){var w=M.touches[0];M=w?w:M.changedTouches[0]}var t=C.$36h=new Image,b=j.$10h[j.sm().ld().getId()].querySelector(".image-box"),s=parseInt(b.style.width),x=parseInt(b.style.height);t.draggable=!1,t.src=b.toDataURL(),t.width=s,t.height=x,t.style.position="absolute",t.style.left=M.pageX-s/2+g,t.style.top=M.pageY-x/2+g,k().appendChild(t),X.startDragging(C)}}},$27h:function(w){var Q=this.$22h,P=Q.getView(),k=P.getBoundingClientRect(),S=Q._29I,R=w.clientX-k.left+P.scrollLeft;return Q._41o()&&S.x+S.width-R<N}}),ht.widget.Palette=function(z){var D=this,B=D._view=J.createView(null,D);D.$9h={},D.$10h={},D.$4h={},D._29I={x:0,y:0,width:0,height:0},D._59I=0,D.dm(z?z:new ht.DataModel),B[n]="ht-widget-palette",D.$29h=new W(D),O(B,V,X.paletteContentBackground),O(B,H,"auto"),O(B,q,u),O(B,"-moz-"+q,u),O(B,"-webkit-"+p,w),O(B,"-moz-"+p,w),O(B,"-ms-"+p,w),O(B,p,w),O(B,"position","absolute"),O(B,"overflow","hidden"),e(B,D._79O=j()),P(B,"dragstart",function(i){i.dataTransfer&&(i.dataTransfer.setData("Text","nodeid:"+i.target.$11h),i.dataTransfer.effectAllowed="all",D.$29h.$26h())})},T("Palette",E,{ms_v:1,ms_fire:1,ms_dm:1,ms_sm:1,ms_vs:1,ms_ac:["itemImageWidth","itemImageHeight","itemImagePadding","itemMargin","layout","autoHideScrollBar","scrollBarSize","scrollBarColor"],$30h:0,_itemImagePadding:4,_itemImageWidth:70,_itemImageHeight:50,_itemMargin:10,_layout:"largeicons",_autoHideScrollBar:X.autoHideScrollBar,_scrollBarSize:X.scrollBarSize,_scrollBarColor:X.scrollBarColor,getViewRect:function(){return this._29I},ty:function(Y){return Y?(this.setTranslateY(Y),void 0):this.getTranslateY()},setTranslateY:function(r){if(this.$32h==h){var b=this,L=b.$33h(r),Q=b.$30h;b.$30h=L,b.fp("translateY",Q,L)}},getTranslateY:function(){return this.$30h},setLayout:function(h){var u,w,r=this,x=r._layout;r._layout=h,"smallicons"===h?u=w=20:"iconsonly"===h?u=w=50:(u=70,w=50),r.setItemImageWidth(u),r.setItemImageHeight(w),r.setItemImagePadding(4),r.fp("layout",x,h)},getDataAt:function(C){for(var I=C.target;I&&I.$11h==h;)I=I.parentNode;return I&&I.$11h!=h?this.getDataModel().getDataById(I.$11h):void 0},$20h:function(){var f=16;return z&&(f*=1.2),f},$19h:function(){return X.paletteTitleHeight},$18h:function(){var R=X.paletteSeparatorWidth,q=X.paletteTitleBackground,m=X.paletteSeparatorColor||X.brighter(q);return R+g+" solid "+m},$17h:function(F){O(F,"cursor","pointer"),O(F,"display","inline-block"),O(F,"margin-right",(z?8:4)+g),O(F,"vertical-align",C)},$1h:function(Q){var G=this,p=b(),z=b(),c=F("span");p[n]="palette-header",O(p,s,"relative"),O(p,V,X.paletteTitleBackground),O(p,"color",X.paletteTitleLabelColor),O(p,C,I),O(p,q,u),O(p,"-moz-"+q,u),O(p,"padding","0 5px 0 0"),O(p,"border-top",G.$18h()),O(p,o,"100%"),O(p,"cursor","pointer"),O(p,"white-space","nowrap"),O(p,H,"hidden"),O(p,L,X.paletteTitleLabelFont),O(p,"line-height",G.$19h()+g),p.$11h=Q.getId();var j=B(),d=G.$19h(),a=G.$20h();G.$17h(j),J.setCanvas(j,a,d),e(p,j);var K=Q.s("tools");if(K)for(var h=0;h<K.length;h++){var Y=B();G.$17h(Y),J.setCanvas(Y,a,d),Y[n]="palette-header-tool palette-header-tool"+Q.getId()+"-"+h,Y.style.position="absolute",Y.style.right=(a+10)*h+"px",Y.toolIndex=h,e(p,Y)}return j[n]="palette-toggle-icon-"+Q.getId(),z[n]="palette-content",O(z,"max-height",0+g),O(z,L,X.paletteContentLabelFont),O(z,H,"hidden"),z.$11h=Q.getId(),G.$9h[Q.getId()]=z,c[M]=Q.getName(),O(c,L,X.paletteTitleLabelFont),e(p,j),e(p,c),[p,z]},$2h:function(R){var l=this,p=l._layout,Z=t&&R.s("draggable")?F("a"):b(),V=B(),u=b(),k=R.getName()||"",$=R.s("title")||R.getToolTip()||k,L=l._itemMargin;V[n]="image-box";var K=l.getItemImageWidth(),I=l.getItemImageHeight();return J.setCanvas(V,K,I),e(Z,V),u[M]=k,u[n]="label-box","iconsonly"!==p&&e(Z,u),Z[n]="palette-item",O(Z,"vertical-align",C),O(Z,"cursor","pointer"),O(Z,"border-radius",5+g),O(Z,"border","1px solid transparent"),O(Z,"text-align","center"),O(Z,"display","inline-block"),O(Z,"margin-left",L+g),O(Z,"margin-top",L+g),O(Z,"color",X.paletteContentLabelColor),"smallicons"===p?(O(V,"vertical-align","middle"),O(Z,"margin-left",2+g),O(Z,"margin-top",2+g),O(Z,"padding",2+g),O(Z,"text-align",r),O(u,"display","inline-block"),O(u,"min-width",l.$21h+l._itemMargin+g)):"largeicons"===p&&(O(u,"max-width",K+g),O(u,"overflow","hidden")),Z.$11h=R.getId(),$&&(Z.title=$),R.s("draggable")&&!l.handleDragAndDrop&&(t?(Z.href="#",O(Z,"text-decoration",w)):Z.draggable="true"),Z},$16h:function($,L,E,z){var l=J.initContext($);J.translateAndScale(l,0,0,1),l.clearRect(0,0,E,E);var d=(E-z)/2;X.drawStretchImage(l,X.getImage(L),"fill",0,d,z,z),l.restore()},$15h:function(Q){var S=this,U=Q.getId(),n=S._view.querySelector(".palette-toggle-icon-"+U),z=Q.isExpanded()?X.paletteCollapseIcon:X.paletteExpandIcon;if(n&&z){var J=S.$19h(),$=S.$20h();S.$16h(n,z,J,$)}},_drawToolsIcon:function(s){var d=this,c=s.s("tools");if(c)for(var L=0;L<c.length;L++){var k=d._view.querySelector(".palette-header-tool"+s.getId()+"-"+L),l=c[L].icon,H=d.$19h(),n=d.$20h();d.$16h(k,l,H,n)}},$14h:function(R){var p=this,E=R.getId(),A=p.$10h[E].querySelector(".image-box"),z=R.getImage(),U=R.s("image.stretch");if(A&&z){var k=J.initContext(A),O=p.getItemImagePadding();O="smallicons"===p._layout?O/2:O;var C=p.getItemImageWidth()-2*O,m=p.getItemImageHeight()-2*O;J.translateAndScale(k,0,0,1),k.clearRect(0,0,C,m),X.drawStretchImage(k,X.getImage(z),U,O,O,C,m,R,p),k.restore()}},validateImpl:function(){var j,O,E,C=this,w=C.$9h,W=C._layout,S=C.$10h,l=C.$4h,B=C._view,V=C.dm();if(C.$13h&&(delete C.$13h,l={},V.each(function(q){l[q.getId()]=q})),"smallicons"===W)for(var z in l){var H=l[z];if(H instanceof R){var Q=H.getName()||"",n=X.getTextSize(X.paletteContentLabelFont,Q).width;C.$21h!=h&&C.$21h>n||(C.$21h=n)}}for(var z in l){E=l[z];var v,f;if(V.contains(E)){if(E instanceof ht.Group){var o,N=C.$1h(E),i=S[E.getId()];i&&(o=i.nextSibling,c(B,o),c(B,i)),O=V.getSiblings(E).indexOf(E);var T=B.children[2*O]||C._79O;T&&T.parentNode?(B.insertBefore(N[0],T),B.insertBefore(o||N[1],T)):(B.appendChild(N[0]),B.appendChild(o||N[1])),S[E.getId()]=N[0],j=w[E.getId()]=o||N[1],f=E.$12h;var $=E.s("promptText");f||(E.$12h=F("div"),E.$12h[M]=$||"",f=E.$12h),0===E.getChildren().size()?j.contains(f)||e(j,f):j.contains(f)&&c(j,f)}else if(v=E.getParent()){var x=C.$2h(E),p=S[E.getId()];j=w[v.getId()],p&&c(p.parentNode,p),O=V.getSiblings(E).indexOf(E);var Y=j.children[O];Y?j.insertBefore(x,Y):e(j,x),S[E.getId()]=x,C.$14h(E)}}else{var b=S[E.getId()],J=b.parentNode;if(E instanceof ht.Group){var q=b.nextSibling;c(B,b),c(B,q),delete w[E.getId()]}else c(J,b),0===J.children.length&&(v=V.getDataById(J.$11h),f=v.$12h,f&&!J.contains(f)&&e(J,f));delete S[E.getId()]}}C.$4h={};var u=function(){var G=C._59I,g=0;C.$32h!=h&&(clearInterval(C.$32h),g=0,delete C.$32h),C.$32h=setInterval(function(){C.$31h(),G===C._59I?(g++,g>=2&&(clearInterval(C.$32h),delete C.$32h)):(g=0,G=C._59I)},30)};for(var U in w)if(j=w[U],E=V.getDataById(w[U].$11h),C.$15h(E),C._drawToolsIcon(E),E.isExpanded()){if(j.style.maxHeight===0+g){var A=j.scrollHeight+C._itemMargin+g;m(j).duration(200).set(K,A).set("padding-bottom",C._itemMargin+g).end(function(){return function(){u()}}(A))}else j.style.maxHeight=j.scrollHeight+g;j.style.paddingBottom=C._itemMargin+g}else j.style.maxHeight!==0+g&&m(j).duration(200).set(K,I).set("padding-bottom",I).end(function(){return function(){u()}}(j));C.$28h(),C.$31h()},$31h:function(){for(var x=this,E=x._view,Y=0,D=E.children,N=0;N<D.length;N++){var Z=D[N];Z.className&&Z.className.indexOf("palette-")>=0&&(Y+=Z.offsetHeight)}x._59I=Y,x.$30h=x.$33h(x.ty());var r=x.ty();E.scrollTop=-r,x._29I={x:0,y:-r,width:E.clientWidth,height:E.clientHeight},O(x._79O,C,-r+g),x._93I()},$33h:function(Q){var v=this,e=v._29I.height-v._59I;return e>Q&&(Q=e),Q>0?0:Math.round(Q)},redraw:function(){this.$13h||(this.$13h=1,this.iv())},onPropertyChanged:function(w){["autoHideScrollBar","scrollBarSize","scrollBarColor","translateY"].indexOf(w.property)<0&&this.redraw(),"translateY"===w.property&&(this.iv(),this._43o())},findDataByName:function(k){for(var r=this.dm().getDatas(),d=0;d<r.size();d++){var j=r.get(d);if(j.getName()===k)return j}},setDataModel:function(c){var n=this,_=n._dataModel,C=n._selectionModel;_!==c&&(_&&(_.umm(n.$6h,n),_.umd(n.$8h,n),_.umh(n.$7h,n),C||_.sm().ums(n.$28h,n)),n._dataModel=c,c.mm(n.$6h,n),c.md(n.$8h,n),c.mh(n.$7h,n),C?C._21I(c):c.sm().ms(n.$28h,n),n.sm().setSelectionMode("single"),n.fp("dataModel",_,c))},$6h:function(P){var h=this,f=h._view,T=P.data,V=h.$4h;"add"===P.kind?V[T.getId()]=T:"remove"===P.kind?V[T.getId()]=T:"clear"===P.kind&&(h.$10h={},h.$9h={},h.$4h={},f[M]=""),h.iv()},$7h:function(C){var T=this,Q=C.data;T.$4h[Q.getId()]=Q,T.iv()},$8h:function(J){var X=this,R=J.data,b=J.property;"expanded"===b?X.iv():(X.$4h[R.getId()]=R,X.iv())},$28h:function(){var g,A=this,w=A.sm(),F="palette-item",I=w.ld();this.dm().each(function(H){g=A.$10h[H.getId()],g&&g[n].indexOf(F)>=0&&(H===I?O(g,V,X.paletteItemSelectBackground):_(g,V))})}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);