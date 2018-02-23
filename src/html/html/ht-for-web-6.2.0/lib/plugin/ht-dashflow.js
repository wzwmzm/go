!function(R){"use strict";var V="ht",c=R[V],$=c.Default,h=Math,Z=(h.PI,h.sin,h.cos,h.atan2,h.sqrt,h.max),q=h.floor,r=(h.round,h.ceil),F=c.Shape,v=(c.Edge,c.List),N=c.Style,U=c.graph,B=$.getInternal(),I=B.ui(),H=null,u="prototype",C=R.clearInterval,a=R.setInterval,p=function(n){var U=n.data,m=this.dm();if(U&&"add"===n.kind){var M=m.$1c,E=U instanceof F?"shape.":"edge.";M&&U.s(E+"dash.flow")&&M.indexOf(U)<0&&M.push(U)}"clear"===n.kind&&(m.$1c=[])},y=function(m){var H=m.property,T=m.data,R=m.newValue,f=this.dm().$1c,N=T instanceof F?"s:shape.dash.flow":"s:edge.dash.flow";if(f&&H===N)if(R)f.indexOf(T)<0&&f.push(T);else for(var C=f.length,S=0;C>S;S++)if(f[S]===T){f.splice(S,1);break}},j=U.GraphView[u],L=I.EdgeUI[u],P=I.ShapeUI[u],J=P._80o,E=L._80o,G=c.DataModel[u],W=G.prepareRemove,n=j.setDataModel;N["edge.dash.flow.step"]==H&&(N["edge.dash.flow.step"]=3),N["shape.dash.flow.step"]==H&&(N["shape.dash.flow.step"]=3),G.prepareRemove=function(D){W.call(this,D);var q=D._dataModel,z=q.$1c;if(z)for(var G=z.length,_=0;G>_;_++)if(z[_]===D){z.splice(_,1);break}},j.setDataModel=function(a){var d=this,i=d._dataModel;if(i!==a){i&&(i.umm(p,d),i.umd(y,d),i.$1c=[]),a.mm(p,d),a.md(y,d);var s=a.$1c=[];a.each(function(f){var N=f instanceof F?"shape.":"edge.";f.s(N+"dash.flow")&&s.indexOf(f)<0&&s.push(f)}),n.call(d,a)}},j.setDashFlowInterval=function(o){var L=this,B=L.$2c;L.$2c=o,L.fp("dashFlowInterval",B,o),L.$3c!=H&&(C(L.$3c),delete L.$3c,L.enableDashFlow(o))},j.getDashFlowInterval=function(){return this.$2c},j.$4c=function(){var S,j,i,f=this,_=f.tx(),A=f.ty(),a=f._zoom,R=f.getWidth(),t=f.getHeight(),b={x:-_/a,y:-A/a,width:R/a,height:t/a},D=f.dm().$1c,U=f._56I,s=new v;if(D.forEach(function(q){U[q.getId()]&&(S=f.getDataUI(q),S&&(i=S._79o(),i&&s.add(i)))}),0!==s.size()&&(s.each(function(X){$.intersectsRect(b,X)&&(j=$.unionRect(j,X))}),j&&(j&&($.grow(j,Z(1,1/a)),j.x=q(j.x*a)/a,j.y=q(j.y*a)/a,j.width=r(j.width*a)/a,j.height=r(j.height*a)/a,j=$.intersection(b,j)),j))){var p=f._canvas.getContext("2d");p.save(),p.lineCap=$.lineCap,p.lineJoin=$.lineJoin,B.translateAndScale(p,_,A,a),p.beginPath(),p.rect(j.x,j.y,j.width,j.height),p.clip(),p.clearRect(j.x,j.y,j.width,j.height),f.$5c(p,j),p.restore()}},j.$5c=function(c,R){var y,V,Y=this;Y._93db(c),Y.each(function(k){Y._56I[k._id]&&(y=Y.getDataUI(k),y&&(V=y._79o(),(!R||$.intersectsRect(R,V))&&(y.$7c=!0,y._42(c),delete y.$7c)))}),Y._92db(c)},j.enableDashFlow=function(x){var E=this;E.$3c==H&&(E.$3c=a(function(){E.$4c()},x||E.$2c||50))},j.disableDashFlow=function(){var O=this;C(O.$3c),delete O.$3c};var l=function(){var p=this,h=p._data,q=h instanceof F?"shape.":"edge.",N=h.s(q+"dash.pattern"),m=h.s(q+"dash.flow.reverse");if(N&&h.s(q+"dash")&&h.s(q+"dash.flow")&&p.$7c){var A=p.s(q+"dash.offset")||0,W=h.s(q+"dash.flow.step"),P=h.getStyleMap(),w=0;N.forEach(function(V){w+=V}),m&&(W=-W),A-=W,A%=w,P||(h._styleMap=P={}),P[q+"dash.offset"]=A}};L._80o=function(a){E.call(this,a),l.call(this)},P._80o=function(X){J.call(this,X),l.call(this)}}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);