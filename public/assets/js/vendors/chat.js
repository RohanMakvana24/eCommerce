document.addEventListener("DOMContentLoaded",function(){var e=document.getElementById("chatinput-form"),t=document.querySelector("#chat-input"),a=document.querySelector("#conversation-list"),o=document.getElementsByClassName("contacts-link"),r=document.querySelector(".chat-body"),n=document.querySelector("[data-close]"),i=document.getElementsByClassName("username"),s=document.getElementsByClassName("user-avatar"),d=document.getElementsByClassName("chat-item"),c=document.getElementById("active-chat-user"),l=1,m=["Hi","Hello !","Hey :)","How do you do?","Are you there?","I am doing good :)","Hi can we meet today?","How are you?","May I know your good name?","I am from codescandy","Where are you from?","What's Up!"],u=(Array.from(o).forEach(function(e){e.addEventListener("click",function(e){r.classList.add("chat-body-visible")})}),n.addEventListener("click",function(e){r.classList.remove("chat-body-visible")}),document.body.contains(n)&&n.addEventListener("click",function(e){r.classList.remove("chat-body-visible")}),Array.from(d).forEach(function(d){d.addEventListener("click",function(e){var t=d.querySelector("img").parentNode.className,a=d.querySelector("img").src,o=d.querySelector("h5").innerHTML,r=d.querySelector("small"),n=t.split(" ");n=(n=n[n.length-1].split("-"))[1].slice(0,1).toUpperCase()+n[1].slice(1).toLowerCase(),c.querySelector("h4").innerHTML=o,c.querySelector("img").src=a,c.querySelector("img").parentNode.className=t,c.querySelector("p").innerHTML=n,null!==r&&r.nextElementSibling&&r.parentElement.removeChild(r.nextElementSibling),Array.from(i).forEach(function(e){e.innerHTML=o}),Array.from(s).forEach(function(e){e.src=a})})}),document.body.contains(e)&&e.addEventListener("submit",function(e){e.preventDefault();e=(e=new Date).getHours()+":"+e.getMinutes();a.insertAdjacentHTML("beforeend",'<div class="d-flex justify-content-end mb-4" id="chat-item-'+l+`">
      <div class="d-flex">
          <div class=" me-3 text-end">
              <small>`+e+`</small>
              <div class="d-flex">
                  <div class="me-2 mt-2">
                      <div class="dropdown dropstart">
                          <a class="btn btn-ghost btn-icon btn-sm rounded-circle" href="#!" role="button"
                              id="dropdownMenuLinkTwo" data-bs-toggle="dropdown"
                              aria-haspopup="true" aria-expanded="false">
                                <i  data-feather="more-vertical" class="icon-xs"></i>
                          </a>
                          <div class="dropdown-menu" aria-labelledby="dropdownMenuLinkTwo">
                              <a class="dropdown-item" href="#!">
                                <i class="dropdown-item-icon" data-feather="copy" ></i>Copy</a>
                              <a class="dropdown-item" href="#!"> 
                                <i class="dropdown-item-icon" data-feather="edit" ></i> Edit</a>
                              <a class="dropdown-item" href="#!">
                                <i class="dropdown-item-icon" data-feather="corner-up-right" ></i>Reply</a>
                              <a class="dropdown-item" href="#!">
                                <i class=" dropdown-item-icon" data-feather="corner-up-left" ></i>Forward</a>
                              <a class="dropdown-item" href="#!">
                                <i class="dropdown-item-icon" data-feather="star" ></i>Favourite</a>
                              <a class="dropdown-item" href="#!">
                                <i class="dropdown-item-icon" data-feather="trash" ></i>Delete
                              </a>
                          </div>
                      </div>
                  </div>
                  <div
                      class="card mt-2 rounded-top-md-end-0 bg-primary text-white">
                      <div class="card-body text-start p-3">
                          <p class="mb-0">`+t.value+`</p>
                      </div>
                  </div>
              </div>
          </div>
          <img src="../assets/images/avatar/avatar-11.jpg" alt="Image" class="rounded-circle avatar-md" />
      </div>
  </div>`),a.scrollTop=a.scrollHeight,feather.replace(),u(),l++}),function(){newRandomMsg=m[Math.floor(Math.random()*m.length)],t.value=newRandomMsg});u()});