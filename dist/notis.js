!function(t,i){"object"==typeof module&&module.exports?module.exports=i():t.notis=i()}(this,function(){"use strict";var e={type:"success",duration:6e3,indentY:25,indentX:25,max:5,width:"300px",close:!1,closeBtn:!0,position:"top-right",showAnimation:"",beforeCreate:function(t){},beforeDestroy:function(t){}},o=function(t,i){var s={};for(var e in i=i||{},t)t.hasOwnProperty(e)&&(s[e]=t[e]);for(e in i)i.hasOwnProperty(e)&&(s[e]=i[e]);return s},s=function(t){this.el=t,this.text=null},n=function(t,o){var i=this;return this.positions={},this.create=function(){var t=document.createElement("div");this.notis=new s(t)},this.setDestroy=function(){this.notis.destroy=this._destroy.bind(this)},this.setTimer=function(){o.duration&&(this.notis.timer=setTimeout(this.notis.destroy,o.duration))},this.addCloseBtn=function(){if(o.closeBtn){var t=document.createElement("button");t.className="notis__close",t.onclick=this.notis.destroy,this.notis.el.insertBefore(t,this.notis.el.firstChild)}},this.setOnClick=function(){o.close&&(this.notis.el.onclick=this.notis.destroy)},this.addClassName=function(){this.notis.el.classList.add("notis"),this.notis.el.classList.add("notis-"+o.position),this.notis.el.classList.add("notis-"+o.type),this.notis.el.className+=" "+o.showAnimation},this.addText=function(){t=t+""||"",this.notis.text=document.createElement("span"),this.notis.text.className="notis__text",this.notis.text.textContent=t+"",this.notis.el.appendChild(this.notis.text)},this.setPositions=function(){var t=/(^(top|bottom))[-]((right|left)$)/.test(o.position)?o.position:"top-right";t=t.split("-"),this.positions.Y=t[0],this.positions.X=t[1]},this.setStyles=function(){var t=this.notis.el;t.style.position="fixed",t.style.width=parseFloat(o.width)+"px",t.style[this.positions.Y]=o.indentY+"px",t.style[this.positions.X]=o.indentX+"px",t.style.transition="all 0.3s ease-out",t.style.webkitTransition="all 0.3s ease-out"},this.updatePositions=function(){for(var t=o.indentY,i=document.querySelectorAll(".notis-"+o.position),s=0;s<i.length;s++){var e=i[s].offsetHeight;i[s].style[this.positions.Y]=t+"px",t+=e+10}},this.setUpdateMethod=function(){this.notis.update=function(t){this.text.textContent=t}},this.callBeforeCreate=function(){"function"==typeof o.beforeCreate&&o.beforeCreate(this.notis.el)},this.callBeforeDestroy=function(){"function"==typeof o.beforeCreate&&o.beforeDestroy(this.notis.el)},this.append=function(){document.body.insertBefore(this.notis.el,document.body.firstChild)},this._destroy=function(){this.callBeforeDestroy(),this.notis.timer&&clearTimeout(this.notis.timer),this.notis.el.onclick=null,this.notis.el.classList.add("hide"),setTimeout(function(){document.body.removeChild(i.notis.el),i.notis=null,i.updatePositions()},300)},this.build=function(){return this.create(),this.setDestroy(),this.setTimer(),this.setOnClick(),this.addCloseBtn(),this.setPositions(),this.addClassName(),this.addText(),this.setStyles(),this.setUpdateMethod(),this.callBeforeCreate(),this.append(),this.updatePositions(),this.notis},this.build()};return{show:function(t,i){var s=o(e,i);return new n(t,s)},config:function(t){e=o(e,t)}}});