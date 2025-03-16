(function(){"use strict";var a={7365:function(a,e,o){var t=o(9963),n=o(6252);const i={id:"app"};function s(a,e,o,t,s,r){const c=(0,n.up)("CienciaIntro");return(0,n.wg)(),(0,n.iD)("div",i,[(0,n.Wm)(c)])}const r={id:"app"};function c(a,e,o,t,i,s){const c=(0,n.up)("BarraNavegacion"),l=(0,n.up)("VistaCarrusel"),d=(0,n.up)("VistaTarjeta"),u=(0,n.up)("IndicadoresEconomicos"),p=(0,n.up)("FotoDelDia"),m=(0,n.up)("NoticiaDelDia"),v=(0,n.up)("PieDePagina");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n.Wm)(c),(0,n.Wm)(l),(0,n.Wm)(d),(0,n.Wm)(u),(0,n.Wm)(p),(0,n.Wm)(m),(0,n.Wm)(v)])}const l={class:"navbar navbar-expand-lg navbar-light bg-light"},d=(0,n.uE)('<a class="navbar-brand" href="#">Ciencia y Educación</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="collapse navbar-collapse justify-content-end" id="navbarNav"><ul class="navbar-nav"><li class="nav-item"><a class="nav-link" href="https://pedro732.github.io/ciencias/" target="_blank"><i class="fas fa-flask"></i> Ciencia</a></li><li class="nav-item"><a class="nav-link" href="#"><i class="fas fa-envelope"></i> Contacto</a></li></ul></div>',3),u=[d];function p(a,e,o,t,i,s){return(0,n.wg)(),(0,n.iD)("nav",l,u)}var m={name:"BarraNavegacion"},v=o(3744);const b=(0,v.Z)(m,[["render",p]]);var f=b,g=o(3577);const h=["src","alt"],y={class:"carousel-caption d-none d-md-block"};function w(a,e,o,t,i,s){const r=(0,n.up)("slide"),c=(0,n.up)("navigation"),l=(0,n.up)("pagination"),d=(0,n.up)("carousel");return(0,n.wg)(),(0,n.j4)(d,{autoplay:15e3,"wrap-around":!0},{addons:(0,n.w5)((()=>[(0,n.Wm)(c),(0,n.Wm)(l)])),default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.items,((a,e)=>((0,n.wg)(),(0,n.j4)(r,{key:e},{default:(0,n.w5)((()=>[(0,n._)("img",{src:a.image,class:"d-block w-100",alt:"Slide "+(e+1)},null,8,h),(0,n._)("div",y,[(0,n._)("p",{class:(0,g.C_)({"text-blue":0===e,"text-light-green":2===e})},(0,g.zw)(a.thought),3)])])),_:2},1024)))),128))])),_:1})}var _=o(7410),D={name:"VistaCarrusel",components:{Carousel:_.lr,Slide:_.Mi,Pagination:_.tl,Navigation:_.W_},data(){return{items:[{image:"https://cdn.pixabay.com/photo/2020/06/09/11/10/giraffe-5277965_1280.jpg",thought:"Bacon no negaba la importancia de las facultades racionales de la mente, pero creía que estas facultades debían utilizarse para comprender los hechos de la naturaleza y no las invenciones de la imaginación humana."},{image:"https://cdn.pixabay.com/photo/2020/07/03/10/44/horses-5365974_1280.jpg",thought:"[...] no admitir como verdadera cosa alguna a menos que se sepa con evidencia que lo es; es decir, evitar cuidadosamente la precipitación y la prevención, y no comprender en mis juicios nada más que lo que se presentase tan clara y distintamente a mi espíritu, que no hubiese ninguna ocasión de ponerlo en duda.(Rene Descartes. Discurso del metodo)"},{image:"https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_1280.jpg",thought:"[...] conducir con orden mis pensamientos, empezando por los objetos más simples y más fáciles de conocer, para ir ascendiendo poco a poco, gradualmente, hasta el conocimiento de los más compuestos, e incluso suponiendo un orden entre los que no se preceden naturalmente."},{image:"https://cdn.pixabay.com/photo/2020/05/17/14/26/manta-5181901_1280.jpg",thought:"Poseemos tres medios principales: la observación de la naturaleza, la reflexión y la experiencia. La observación recoge los hechos, la reflexión los combina, la experiencia verifica el resultado de la combinación. Es indispensable que la observación de la naturaleza sea asidua, que la reflexión sea profunda y la experiencia sea exacta.Dennisse Diderot"}]}}};const x=(0,v.Z)(D,[["render",w],["__scopeId","data-v-edbf6242"]]);var k=x;const I={class:"d-flex justify-content-around"},j=["id"],q={class:"modal-dialog"},C={class:"modal-content"},z={class:"modal-header"},M={class:"modal-title"},O=["onClick"],B={class:"modal-body"},N={class:"modal-footer"},E=["onClick"];function P(a,e,o,t,i,s){const r=(0,n.up)("b-img"),c=(0,n.up)("b-button"),l=(0,n.up)("b-card");return(0,n.wg)(),(0,n.iD)("div",I,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(i.cards,((a,e)=>((0,n.wg)(),(0,n.j4)(l,{key:e,title:a.title,class:"mb-2"},{default:(0,n.w5)((()=>[(0,n.Wm)(r,{src:a.image,alt:"Image",class:"mb-3 card-image"},null,8,["src"]),(0,n.Wm)(c,{onClick:a=>s.showModal(e),variant:"primary"},{default:(0,n.w5)((()=>[(0,n.Uk)("Ver")])),_:2},1032,["onClick"]),(0,n._)("div",{class:"modal fade",id:`modal-${e}`,tabindex:"-1"},[(0,n._)("div",q,[(0,n._)("div",C,[(0,n._)("div",z,[(0,n._)("h5",M,(0,g.zw)(a.title),1),(0,n._)("button",{type:"button",class:"btn-close",onClick:a=>s.hideModal(e)},null,8,O)]),(0,n._)("div",B,[(0,n._)("p",null,(0,g.zw)(a.modalContent),1)]),(0,n._)("div",N,[(0,n._)("button",{type:"button",class:"btn btn-secondary",onClick:a=>s.hideModal(e)},"Cerrar",8,E)])])])],8,j)])),_:2},1032,["title"])))),128))])}var S={name:"VistaTarjeta",data(){return{cards:[{title:"Rene Descartes",image:"https://filco.es/uploads/2018/05/top-20officehacks-19-e1524577141234.png",modalContent:"Una vez conocidas por intuición las proposiciones simples viene el proceso de la síntesis a través de la deducción, que es toda inferencia necesaria de hechos que son conocidos con certeza. ” Pero la intui- ción existe también en el proceso de de- ducción, ya que necesitamos poder ver con claridad cuál de las posibles deduccio- nes es la correcta. ” Es decir, la deducción es una operación, un proceso, el cual de ser correcto debe llevarnos de intuición en intuición, es decir, de verdad en verdad. "},{title:"Galileo Galilei",image:"https://pymstatic.com/86086/conversions/galileo-galilei-wide_webp.webp",modalContent:"Galileo es uno de los científicos más conocidos del mundo, no solo por lo que aportó con sus investigaciones, sino por los grandes debates y conflictos que abrieron sus descubrimientos. Fue el precursor del famoso método científico, es decir: primero observar, experimentar y formular las leyes que expliquen el fenómeno, probarlas observando y volver a empezar, hasta encontrar la solución."},{title:"Francis Bacon",image:"https://blogmasonico.com/wp-content/uploads/2023/02/francis-bacon.jpg.webp",modalContent:"Los hombres de experimentos son como las hormigas, sólo recogen y utilizan lo que han recogido; los pensadores se parecen a las arañas, que construyen telas de su propia sustancia. La abeja, sin embargo, toma un camino intermedio: recoge su material de las flores del jardín y del campo, pero lo transforma y digiere por un poder propio. A diferencia de esto, este es el verdadero negocio de la filosofía; porque no depende exclusiva o principalmente de los poderes de la mente, ni aloja la materia que recoge de la historia natural y de los experimentos mecánicos totalmente en la memoria, tal como la encuentra, sino que la aloja en el intelecto alterada y digerida. Por lo tanto, de una conexión más estrecha y más pura entre estas dos facultades, la experimental y la racional (como nunca se ha hecho), se puede esperar mucho."}],modals:[]}},methods:{showModal(a){this.modals[a]=new bootstrap.Modal(document.getElementById(`modal-${a}`)),this.modals[a].show()},hideModal(a){this.modals[a]&&this.modals[a].hide()}}};const W=(0,v.Z)(S,[["render",P],["__scopeId","data-v-113d72ec"]]);var $=W;const Z=(0,n._)("h1",{class:"text-center"},"Indicadores Económicos",-1),T={class:"d-flex justify-content-around"},F={class:"card-body"},V={class:"card-title"},K={class:"card-text"},L=(0,n._)("p",null," Selecciona uno de los indicadores económicos y la fecha que desea consultar ",-1),H=["value"],U=(0,n._)("button",{type:"submit"},"Obtener indicador",-1),A={key:0},Y={class:"modal fade",id:"indicadorModal",tabindex:"-1","aria-labelledby":"indicadorModalLabel","aria-hidden":"true"},R={class:"modal-dialog"},G={class:"modal-content"},Q=(0,n._)("div",{class:"modal-header"},[(0,n._)("h5",{class:"modal-title",id:"indicadorModalLabel"},"Valor del indicador"),(0,n._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),J={class:"modal-body"},X=(0,n._)("div",{class:"modal-footer"},[(0,n._)("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Cerrar")],-1);function aa(a,e,o,i,s,r){return(0,n.wg)(),(0,n.iD)("div",null,[Z,(0,n._)("div",T,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.indicators,((a,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"card",style:{width:"18rem"},key:e},[(0,n._)("div",F,[(0,n._)("h5",V,(0,g.zw)(a.nombre),1),(0,n._)("p",K,(0,g.zw)(a.simbolo)+(0,g.zw)(a.valor),1)])])))),128))]),L,(0,n._)("form",{onSubmit:e[2]||(e[2]=(0,t.iM)(((...a)=>r.getIndicator&&r.getIndicator(...a)),["prevent"]))},[(0,n.wy)((0,n._)("select",{"onUpdate:modelValue":e[0]||(e[0]=a=>s.selectedIndicator=a)},[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.indicatorOptions,(a=>((0,n.wg)(),(0,n.iD)("option",{key:a,value:a},(0,g.zw)(a),9,H)))),128))],512),[[t.bM,s.selectedIndicator]]),(0,n.wy)((0,n._)("input",{type:"date","onUpdate:modelValue":e[1]||(e[1]=a=>s.selectedDate=a)},null,512),[[t.nr,s.selectedDate]]),U],32),s.selectedIndicatorData?((0,n.wg)(),(0,n.iD)("div",A,[(0,n._)("h2",null,(0,g.zw)(s.selectedIndicatorData.nombre),1),(0,n._)("p",null,(0,g.zw)(s.selectedIndicatorData.simbolo)+(0,g.zw)(s.selectedIndicatorData.valor),1)])):(0,n.kq)("",!0),(0,n._)("div",Y,[(0,n._)("div",R,[(0,n._)("div",G,[Q,(0,n._)("div",J,(0,g.zw)(s.selectedIndicatorData?s.selectedIndicatorData.valor:""),1),X])])])])}var ea=o(5121),oa=o(9909),ta={name:"IndicadoresEconomicos",data(){return{indicators:[],selectedIndicator:"",selectedDate:"",selectedIndicatorData:null,indicatorOptions:["uf","ivp","dolar","dolar_intercambio","euro","ipc","utm","imacec","tpm","libra_cobre","tasa_desempleo","bitcoin"]}},async created(){const a=["uf","dolar","euro","utm"],e=["$","$","€","$"],o=await Promise.all(a.map((a=>ea.Z.get(`https://mindicador.cl/api/${a}`).then((a=>a.data)))));this.indicators=o.map(((a,o)=>({nombre:a.nombre,valor:a.serie[0].valor,simbolo:e[o]})))},methods:{async getIndicator(){const a=this.selectedDate.split("-"),e=`${a[2]}-${a[1]}-${a[0]}`,o=await ea.Z.get(`https://mindicador.cl/api/${this.selectedIndicator}/${e}`),t=o.data;t.serie&&t.serie.length>0?this.selectedIndicatorData={nombre:t.nombre,valor:t.serie[0].valor,simbolo:"$"}:console.error("No data available for this date and indicator");var n=new oa.u_(document.getElementById("indicadorModal"));n.show()}}};const na=(0,v.Z)(ta,[["render",aa]]);var ia=na;const sa={class:"d-flex justify-content-center"},ra=["src","alt"];function ca(a,e,o,t,i,s){return(0,n.wg)(),(0,n.iD)("div",sa,[i.photo?((0,n.wg)(),(0,n.iD)("img",{key:0,src:i.photo.urls.regular,alt:i.photo.alt_description,class:"img-fluid"},null,8,ra)):(0,n.kq)("",!0)])}var la={name:"FotoDelDia",data(){return{photo:null}},async created(){const a=await ea.Z.get("https://api.unsplash.com/photos/random",{headers:{Authorization:"Client-ID tMyjKmNW96NFkFTI-4yBF6Uylnr8xeO461QeoK4FRr0"},params:{query:"nature",orientation:"landscape",content_filter:"high",count:1}});this.photo=a.data[0]}};const da=(0,v.Z)(la,[["render",ca],["__scopeId","data-v-dd59c3dc"]]);var ua=da;const pa=a=>((0,n.dD)("data-v-001f8004"),a=a(),(0,n.Cn)(),a),ma={class:"container"},va=pa((()=>(0,n._)("p",null,'Busca por una palabra clave o una determinada frase, por ejemplo "lo último de Microsoft", o "Biología", o "Química" o " Física"',-1))),ba=pa((()=>(0,n._)("button",{type:"submit"},"Buscar",-1))),fa=["src"],ga={class:"card-body"},ha={class:"card-title"},ya={class:"card-text"},wa=["href"];function _a(a,e,o,i,s,r){return(0,n.wg)(),(0,n.iD)("div",ma,[va,(0,n._)("form",{onSubmit:e[1]||(e[1]=(0,t.iM)(((...a)=>r.buscarNoticias&&r.buscarNoticias(...a)),["prevent"]))},[(0,n.wy)((0,n._)("input",{"onUpdate:modelValue":e[0]||(e[0]=a=>s.terminoBusqueda=a),type:"text",placeholder:"Buscar noticias..."},null,512),[[t.nr,s.terminoBusqueda]]),ba],32),((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(s.noticias,((a,e)=>((0,n.wg)(),(0,n.iD)("div",{class:"card",key:e},[(0,n._)("img",{src:a.urlToImage,class:"card-img-top",alt:"..."},null,8,fa),(0,n._)("div",ga,[(0,n._)("h5",ha,(0,g.zw)(a.title),1),(0,n._)("p",ya,(0,g.zw)(a.description),1),(0,n._)("a",{href:a.url,class:"btn btn-primary",target:"_blank"},"Leer más",8,wa)])])))),128))])}var Da={name:"NoticiaDelDia",data(){return{terminoBusqueda:"",noticias:[]}},methods:{async buscarNoticias(){const a=new Date,e=new Date(a.setMonth(a.getMonth()-1)).toISOString().split("T")[0],o=await ea.Z.get(`https://newsapi.org/v2/everything?q=${this.terminoBusqueda}&from=${e}&sortBy=popularity`,{headers:{"x-api-key":"b13e42abf600456580b13b51f2d661bb"}});console.log(o.data),this.noticias=o.data.articles}}};const xa=(0,v.Z)(Da,[["render",_a],["__scopeId","data-v-001f8004"]]);var ka=xa;const Ia={class:"footer"},ja=(0,n.uE)('<p data-v-5da45868>¡Recomiendo encarecidamente visitar el sitio web de Ciencia y Educación! Es una fuente invaluable de conocimiento científico y recursos educativos. Explora sus artículos, experimentos y actividades interactivas para enriquecer tu comprensión de diversas disciplinas científicas. Aprovecha su contenido actualizado y confiable para mantenerte al día con los avances científicos. ¡Sumérgete en la fascinante aventura del aprendizaje científico a través de Ciencia y Educación! ¡No te arrepentirás!</p><div class="social-icons" data-v-5da45868><a href="https://www.facebook.com/cienciaenchile/?locale=es_LA" target="_blank" data-v-5da45868><i class="fab fa-facebook-f" data-v-5da45868></i></a><a href="https://www.instagram.com/nasa/?hl=es" target="_blank" data-v-5da45868><i class="fab fa-instagram" data-v-5da45868></i></a><a href="https://twitter.com/min_ciencia?lang=es" target="_blank" data-v-5da45868><i class="fab fa-twitter" data-v-5da45868></i></a><a href="https://www.linkedin.com/company/ciencia-2030-uc/?originalSubdomain=cl" target="_blank" data-v-5da45868><i class="fab fa-linkedin-in" data-v-5da45868></i></a></div><div class="copyright" data-v-5da45868><p data-v-5da45868>© Derechos reservados</p></div>',3),qa=[ja];function Ca(a,e,o,t,i,s){return(0,n.wg)(),(0,n.iD)("div",Ia,qa)}var za={name:"PieDePagina"};const Ma=(0,v.Z)(za,[["render",Ca],["__scopeId","data-v-5da45868"]]);var Oa=Ma,Ba={name:"CienciaIntro",components:{BarraNavegacion:f,VistaCarrusel:k,VistaTarjeta:$,IndicadoresEconomicos:ia,FotoDelDia:ua,NoticiaDelDia:ka,PieDePagina:Oa}};const Na=(0,v.Z)(Ba,[["render",c]]);var Ea=Na,Pa={name:"App",components:{CienciaIntro:Ea}};const Sa=(0,v.Z)(Pa,[["render",s]]);var Wa=Sa,$a=o(2201);const Za=[{path:"/",name:"home",component:Ea}],Ta=(0,$a.p7)({history:(0,$a.PO)("/"),routes:Za});var Fa=Ta,Va=o(3907),Ka=(0,Va.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),La=o(6825);o(2666);const Ha=(0,t.ri)(Wa);Ha.use(Ka),Ha.use(Fa),Ha.use(La.eH),Ha.mount("#app")}},e={};function o(t){var n=e[t];if(void 0!==n)return n.exports;var i=e[t]={exports:{}};return a[t].call(i.exports,i,i.exports,o),i.exports}o.m=a,function(){var a=[];o.O=function(e,t,n,i){if(!t){var s=1/0;for(d=0;d<a.length;d++){t=a[d][0],n=a[d][1],i=a[d][2];for(var r=!0,c=0;c<t.length;c++)(!1&i||s>=i)&&Object.keys(o.O).every((function(a){return o.O[a](t[c])}))?t.splice(c--,1):(r=!1,i<s&&(s=i));if(r){a.splice(d--,1);var l=n();void 0!==l&&(e=l)}}return e}i=i||0;for(var d=a.length;d>0&&a[d-1][2]>i;d--)a[d]=a[d-1];a[d]=[t,n,i]}}(),function(){o.d=function(a,e){for(var t in e)o.o(e,t)&&!o.o(a,t)&&Object.defineProperty(a,t,{enumerable:!0,get:e[t]})}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(a){if("object"===typeof window)return window}}()}(),function(){o.o=function(a,e){return Object.prototype.hasOwnProperty.call(a,e)}}(),function(){o.r=function(a){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(a,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(a,"__esModule",{value:!0})}}(),function(){var a={143:0};o.O.j=function(e){return 0===a[e]};var e=function(e,t){var n,i,s=t[0],r=t[1],c=t[2],l=0;if(s.some((function(e){return 0!==a[e]}))){for(n in r)o.o(r,n)&&(o.m[n]=r[n]);if(c)var d=c(o)}for(e&&e(t);l<s.length;l++)i=s[l],o.o(a,i)&&a[i]&&a[i][0](),a[i]=0;return o.O(d)},t=self["webpackChunkintro"]=self["webpackChunkintro"]||[];t.forEach(e.bind(null,0)),t.push=e.bind(null,t.push.bind(t))}();var t=o.O(void 0,[998],(function(){return o(7365)}));t=o.O(t)})();
//# sourceMappingURL=app.88ac48fc.js.map