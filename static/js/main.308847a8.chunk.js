(this.webpackJsonpwo=this.webpackJsonpwo||[]).push([[0],{117:function(e,t,a){e.exports=a.p+"static/media/anchor.40fa0fb2.svg"},132:function(e,t,a){e.exports=a(271)},137:function(e,t,a){},270:function(e,t,a){},271:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),c=a(18),l=a.n(c),o=(a(137),a(25)),s=a(2),i=a(13),d=a(116),p=a(19),u=a(303),g=a(297),m=a(49),h=a(300),f=a(309),v=a(302),x=a(298),y=a(301),w=a(308);var E=function(e){var t=Object(r.useRef)(null),a=Object(r.useRef)(!1),c=Object(r.useState)(""),l=Object(o.a)(c,2),s=l[0],E=l[1];Object(r.useEffect)((function(){if(!a.current){var r=new d({apiKey:"keyABekhLaYIHre0d"}).base("appQx1tmm4vNz1Zvh"),n=[],c={},l=e.show;r("Log").select({view:"Grid view"}).eachPage((function(e,t){n=n.concat(e),t()}),(function(o){o?console.error(o):r("Exercises").select({view:"All",fields:["Name","Weight","Reps","Sets"]}).eachPage((function(e,t){var a=!0,r=!1,n=void 0;try{for(var l,s=e[Symbol.iterator]();!(a=(l=s.next()).done);a=!0){var i=l.value;c[i.id]={name:i.get("Name"),weight:i.get("Weight"),reps:i.get("Reps"),sets:i.get("Sets")}}}catch(o){r=!0,n=o}finally{try{a||null==s.return||s.return()}finally{if(r)throw n}}t()}),(function(r){if(r)console.error(r);else{var o=n.reduce((function(e,t){var a=t.get("Date");return e.has(a)?e.get(a).push(t):e.set(a,[t]),e}),new Map);o.forEach((function(e,t){o.set(t,e.reduce((function(e,a){var r=c[a.get("Exercise")];if(e.has(r.name)){var n=e.get(r.name);n.weights.push(a.get("Weight")),n.averageWeight=n.weights.reduce((function(e,t){return e+t}),0)/n.weights.length,n.reps.push(a.get("Reps")),n.averageReps=n.reps.reduce((function(e,t){return e+t}),0)/n.reps.length,n.sets.push(a.get("Sets")),n.averageSets=n.sets.reduce((function(e,t){return t+e}),0)}else e.set(r.name,{date:t,exercise:a.get("Exercise"),weights:[a.get("Weight")],averageWeight:a.get("Weight"),goalWeight:r.weight,reps:[a.get("Reps")],averageReps:a.get("Reps"),goalReps:r.reps,sets:[a.get("Sets")],averageSets:a.get("Sets"),goalSets:r.sets});return e}),new Map))}));var s=[],i=!0,d=!1,u=void 0;try{for(var g,m=o.values()[Symbol.iterator]();!(i=(g=m.next()).done);i=!0){var h=g.value;s=s.concat(Array.from(h))}}catch(r){d=!0,u=r}finally{try{i||null==m.return||m.return()}finally{if(d)throw u}}var f=s.reduce((function(e,t,a){return-1===Object.keys(e).indexOf(t[1].date)?e[t[1].date]=[a]:e[t[1].date].push(a),e}),{}),v=p.e(t.current),x=180*Array.from(o.keys()).length-160;t.current.style.width="".concat(x,"px");var y=v.append("g");y.append("circle").attr("class","goal").attr("cx",60).attr("cy",50).attr("r",5),y.append("text").attr("class","label").attr("x",110).attr("y",55).attr("text-anchor","middle").text("Goal met!"),y.append("circle").attr("class","goal nah").attr("cx",175).attr("cy",50).attr("r",5),y.append("text").attr("class","label").attr("x",240).attr("y",55).attr("text-anchor","middle").text("Goal not met :("),y.append("circle").attr("class","goal woah").attr("cx",325).attr("cy",50).attr("r",5),y.append("text").attr("class","label").attr("x",395).attr("y",55).attr("text-anchor","middle").text("Goal exceeded!");var w=v.append("g").attr("transform","translate(".concat(80,", ").concat(80,")")),b=p.c().range([0,x]).domain(Array.from(o.keys())).padding(.45),k=p.d().range([440,0]).domain([0,e.scale]);w.append("g").attr("transform","translate(0, ".concat(440,")")).call(p.a(b)),w.append("g").call(p.b(k)),w.append("g").attr("class","grid").call(p.b().scale(k).tickSize(-x,0,0).tickFormat(""));var S=w.selectAll().data(s).enter().append("g");S.append("rect").attr("style","fill:#141926; filter:drop-shadow(0px 1px 1px rgba(0, 0, 0, 1))").attr("class",(function(e){return"".concat(e[0].replace(/ /g,"_")," d").concat(e[1].date)})).attr("x",(function(e,t){var a=e[1].date,r=f[a].indexOf(t),n=0;return-1!==r&&(n=r),b(a)+12*n})).attr("y",(function(e){return k(e[1]["average".concat(l)])})).attr("height",(function(e){return 440-k(e[1]["average".concat(l)])})).attr("width",10).on("click",(function(e){var t;v.selectAll(".d".concat(e[1].date)).classed("selected",(function(e,t){return p.e(this).classed("selected",!0)})),t=".d".concat(e[1].date),v.selectAll(":not(".concat(t,")")).classed("selected",!1),E({value:[e[1].date,o.get(e[1].date)]})})),S.append("circle").attr("class",(function(e){var t=e[1]["goal".concat(l)],a=e[1]["average".concat(l)];return a>t?"goal woah":a<t?"goal nah":"goal"})).attr("cx",(function(e,t){var a=e[1].date,r=f[a].indexOf(t),n=0;return-1!==r&&(n=r),b(a)+12*n+5})).attr("cy",(function(e){return k(c[e[1].exercise][l.toLowerCase()])})).attr("r",5),v.append("text").attr("class","label").attr("x",-300).attr("y",80/2.4).attr("transform","rotate(-90)").attr("text-anchor","middle").text(l),v.append("text").attr("class","label").attr("x",x/2+80).attr("y",576).attr("text-anchor","middle").text("Training days"),v.selectAll(".d".concat(o.keys().next().value)).classed("selected",!0),E(o.entries().next()),a.current=!0}}))}))}}));var b=Object(g.a)("(min-width:1200px)"),k=Object(g.a)("(min-width:600px)"),S=b?1e3:k?600:300,R=0,A=s?n.a.createElement(x.a,{elevation:1,style:{padding:"1em"}},n.a.createElement(m.a,{variant:"h3"},"Workout of ",s.value[0]),n.a.createElement(m.a,{variant:"h6"},"Aggregate success report"),Object(i.a)(s.value[1]).map((function(e,t){R=0;var a=new Array(Math.max(e[1].goalSets-e[1].averageSets,0)).fill();return[n.a.createElement(m.a,{key:"ex".concat(t),variant:"h4",style:{marginTop:"20px"}},e[0]),n.a.createElement("div",{key:"cex".concat(t)},n.a.createElement(h.a,{style:{display:"flex",flexWrap:"wrap",flexDirection:"row",padding:0}},e[1].sets.map((function(t,a){return Array(t).fill().map((function(t,r){R++;var c=e[1].goalWeight-e[1].weights[a],l=c<0?"Green":c>0?"Red":"Black",o=e[1].goalReps-e[1].reps[a],s=o<0?"Green":o>0?"Red":"Black",i=n.a.createElement("span",null,n.a.createElement("span",{style:{color:l}},e[1].weights[a],"/",e[1].goalWeight,"lbs"),n.a.createElement("br",null),n.a.createElement("span",{style:{color:s}},e[1].reps[a],"/",e[1].goalReps," times")),d=R>e[1].goalSets?"Green":"#a0a0a0";return n.a.createElement(f.a,{key:"l".concat(a,"_").concat(r),style:{flex:"25%"}},n.a.createElement(y.a,null,n.a.createElement(w.a,{style:{backgroundColor:d,textAlign:"center",fontSize:"15px"}},"Set ".concat(R))),n.a.createElement(v.a,{primary:i}))}))})),a.map((function(e,t){return R++,n.a.createElement(f.a,{key:"s".concat(t)},n.a.createElement(y.a,null,n.a.createElement(w.a,{style:{backgroundColor:"Red",textAlign:"center",fontSize:"15px"}},"Set ".concat(R))),n.a.createElement(v.a,{primary:n.a.createElement("span",{style:{color:"red"}},"Skipped!")}))}))))]}))):"";return[n.a.createElement("div",{key:"graph",style:{width:"".concat(S,"px"),height:"600px",margin:"auto",backgroundColor:"#01A9DB",overflowX:"scroll",overflowY:"hidden"}},n.a.createElement("svg",{style:{height:"100%"},ref:t})),n.a.createElement(u.a,{fixed:!0,key:"stats",style:{width:"".concat(S,"px"),margin:"auto",marginTop:"1em"}},A)]},b=(a(270),a(117)),k=a.n(b),S=a(307),R=a(304),A=a(306),O=a(118);Object(O.a)({palette:{primary:{main:"#141926"},text:{primary:{main:"#141926"}},secondary:{main:"#01A9DB"}}});function W(e){var t=e.children,a=e.value,r=e.index,c=Object(s.a)(e,["children","value","index"]);return n.a.createElement(m.a,Object.assign({component:"div",role:"tabpanel",hidden:a!==r,id:"full-width-tabpanel-".concat(r),"aria-labelledby":"full-width-tab-".concat(r)},c),a===r&&n.a.createElement(A.a,{p:3},t))}var j=function(){var e=n.a.useState(0),t=Object(o.a)(e,2),a=t[0],r=t[1];return n.a.createElement("div",{className:"App"},n.a.createElement("div",{className:"header"},n.a.createElement("a",{href:"https://airtable.com/tbl3m3QRI8q9N0n3l/viwh9YqwZxENXZhQV"},n.a.createElement("img",{className:"anchor",src:k.a}))),n.a.createElement(x.a,null,n.a.createElement(S.a,{value:a,onChange:function(e,t){r(t)},indicatorColor:"primary",centered:!0},n.a.createElement(R.a,{label:"Weight"}),n.a.createElement(R.a,{label:"Reps"}),n.a.createElement(R.a,{label:"Sets"}))),n.a.createElement("div",null,n.a.createElement(W,{value:a,index:0},n.a.createElement(E,{show:"Weight",scale:"140"})),n.a.createElement(W,{value:a,index:1},n.a.createElement(E,{show:"Reps",scale:"20"})),n.a.createElement(W,{value:a,index:2},n.a.createElement(E,{show:"Sets",scale:"10"}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(n.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[132,1,2]]]);
//# sourceMappingURL=main.308847a8.chunk.js.map