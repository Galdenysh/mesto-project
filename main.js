(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{Wq:()=>D,kH:()=>W,au:()=>M,O8:()=>Q,QO:()=>z,df:()=>I});var t={formSelector:".popup__form",inputSelector:".popup__form-item",submitButtonSelector:".popup__save-button",inactiveButtonClass:"popup__save-button_inactive",inputErrorClass:"popup__form-item_type_error",errorClass:"popup__form-item-error_active"},n=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(t)?(n.classList.remove("".concat(e.inactiveButtonClass)),n.removeAttribute("disabled")):(n.classList.add("".concat(e.inactiveButtonClass)),n.setAttribute("disabled",!0))},r={baseURL:"https://nomoreparties.co/v1/plus-cohort-6",headers:{authorization:"8aaf6757-8c7f-4d9e-9e64-5effc217e908","Content-Type":"application/json"}},o=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},c=document.querySelector(".profile"),a=c.querySelector(".profile__name"),u=c.querySelector(".profile__signature"),i=c.querySelector(".profile__avatar-image"),l=document.querySelector(".popup_type_avatar"),s=l.querySelector(".popup__form"),d=s.querySelector(".popup__form-item_select_avatar"),f=Array.from(s.querySelectorAll("".concat(t.inputSelector))),p=s.querySelector("".concat(t.submitButtonSelector)),_=document.querySelector(".popup_type_profile"),m=_.querySelector(".popup__form"),y=m.querySelector(".popup__form-item_select_name"),v=m.querySelector(".popup__form-item_select_signature"),h=m.querySelector("".concat(t.submitButtonSelector)),S=document.querySelector(".popup_type_new-card"),b=S.querySelector(".popup__form"),q=b.querySelector(".popup__form-item_select_place-name"),L=b.querySelector(".popup__form-item_select_picture-url"),g=Array.from(b.querySelectorAll("".concat(t.inputSelector))),k=b.querySelector("".concat(t.submitButtonSelector)),E=document.querySelector(".popup_type_image"),C=E.querySelector(".popup__big-image"),A=E.querySelector(".popup__image-caption");function x(e){e.classList.add("popup_opened"),document.addEventListener("keydown",U)}function O(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",U)}function U(e){"Escape"===e.key&&O(document.querySelector(".popup_opened"))}var w=document.querySelector(".cards");function j(e){var t=document.querySelector("#js-cards").content.querySelector(".cards__card").cloneNode(!0),n=t.querySelector(".cards__place"),c=t.querySelector(".cards__title"),a=t.querySelector(".cards__like-number"),u=t.querySelector(".cards__remove-button"),i=t.querySelector(".cards__like-button");return Boolean(e.likes.find((function(e){return e._id===D})))&&i.classList.add("cards__like-button_active"),e.owner._id===D&&u.classList.add("cards__remove-button_visible"),c.textContent=e.name,n.src=e.link,n.alt=e.name,a.textContent=e.likes.length,function(e,t){e.querySelector(".cards__like-button").addEventListener("click",(function(e){return function(e,t){var n,c=e.target.closest(".cards__card");e.target.classList.contains("cards__like-button_active")?(n=t._id,fetch("".concat(r.baseURL,"/cards/likes/").concat(n),{method:"DELETE",headers:r.headers}).then((function(e){return o(e)}))).then((function(t){Q(c,t),e.target.classList.toggle("cards__like-button_active")})).catch((function(e){console.log(e)})):function(e){return fetch("".concat(r.baseURL,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then((function(e){return o(e)}))}(t._id).then((function(t){Q(c,t),e.target.classList.toggle("cards__like-button_active")})).catch((function(e){console.log(e)}))}(e,t)})),e.querySelector(".cards__place").addEventListener("click",(function(){return function(e){C.src=e.link,C.alt=e.name,A.textContent=e.name,x(E)}(t)})),e.querySelector(".cards__remove-button").addEventListener("click",(function(){return function(e,t){var n;(n=t._id,fetch("".concat(r.baseURL,"/cards/").concat(n),{method:"DELETE",headers:r.headers}).then((function(e){return o(e)}))).then(e.remove()).catch((function(e){console.log(e)}))}(e,t)}))}(t,e),t}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var R=document.querySelectorAll(".popup"),P=c.querySelector(".profile__avatar-button"),T=c.querySelector(".profile__edit-button"),N=c.querySelector(".profile__add-button"),D={};Promise.all([fetch("".concat(r.baseURL,"/users/me"),{headers:r.headers}).then((function(e){return o(e)})),fetch("".concat(r.baseURL,"/cards"),{headers:r.headers}).then((function(e){return o(e)}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c=[],a=!0,u=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(c.push(r.value),!t||c.length!==t);a=!0);}catch(e){u=!0,o=e}finally{try{a||null==n.return||n.return()}finally{if(u)throw o}}return c}}(t,n)||function(e,t){if(e){if("string"==typeof e)return B(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?B(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];I(o),J(c)})).catch((function(e){console.log(e)}));var H,I=function(e){a.textContent=e.name,u.textContent=e.about,i.src=e.avatar,D=e._id},J=function(e){e.forEach((function(e){!function(e){var t=j(e);w.append(t)}(e)}))},M=function(e){i.src=e.avatar},z=function(e){!function(e){var t=j(e);w.prepend(t)}(e)},Q=function(e,t){e.querySelector(".cards__like-number").textContent=t.likes.length},W=function(e,t){e.textContent=t?"Сохранение...":"Сохранить"};H=t,Array.from(document.querySelectorAll("".concat(H.formSelector))).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(t.querySelectorAll("".concat(e.inputSelector))),o=t.querySelector("".concat(e.submitButtonSelector));n(e,r,o),r.forEach((function(c){c.addEventListener("input",(function(){!function(e,t,n){n.validity.valid?function(e,t,n){var r=t.querySelector(".".concat(n.id,"-error"));n.classList.remove("".concat(e.inputErrorClass)),r.textContent="",r.classList.remove("".concat(e.errorClass))}(e,t,n):function(e,t,n,r){var o=t.querySelector(".".concat(n.id,"-error"));n.classList.add("".concat(e.inputErrorClass)),o.textContent=r,o.classList.add("".concat(e.errorClass))}(e,t,n,n.validationMessage)}(e,t,c),n(e,r,o)}))}))}(H,e)})),R.forEach((function(e){e.addEventListener("mousedown",(function(t){t.target.classList.contains("popup_opened")&&O(e),t.target.classList.contains("popup__close-button")&&O(e)}))})),P.addEventListener("click",(function(){return x(l)})),T.addEventListener("click",(function(){y.value=a.textContent,v.value=u.textContent,x(_)})),N.addEventListener("click",(function(){return x(S)})),s.addEventListener("submit",(function(){W(p,!0),function(e){return fetch("".concat(r.baseURL,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e.value})}).then((function(e){return o(e)}))}(d).then((function(e){M(e),s.reset(),n(t,f,p)})).catch((function(e){console.log(e)})).finally((function(){W(p,!1)})),O(l)})),m.addEventListener("submit",(function(){W(h,!0),function(e,t){return fetch("".concat(r.baseURL,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e.value,about:t.value})}).then((function(e){return o(e)}))}(y,v).then((function(e){I(e)})).catch((function(e){console.log(e)})).finally((function(){W(h,!1)})),O(_)})),b.addEventListener("submit",(function(){var e={name:q.value,link:L.value};W(k,!0),function(e){return fetch("".concat(r.baseURL,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e.name,link:e.link})}).then((function(e){return o(e)}))}(e).then((function(e){z(e),b.reset(),n(t,g,k)})).catch((function(e){console.log(e)})).finally((function(){W(k,!1)})),O(S)}))})();