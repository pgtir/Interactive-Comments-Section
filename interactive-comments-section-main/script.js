// Selectors
const userReply = document.querySelector(".your-reply");
const replyBtn = document.querySelectorAll(".reply");
const editBtn = document.querySelectorAll(".edit");
const deleteBtn = document.querySelectorAll(".delete");
const sendBtn = document.querySelectorAll(".send-btn");
const textField = document.querySelector(".text-field");
const commentSection = document.querySelector(".comment-section");
const comment = document.querySelector(".comment");
const innerReplyBody = document.querySelector(".inner-reply-body");
const yourComment = document.querySelector(".your-comment");
const deleteModal = document.querySelector(".delete-modal");
const yesDeleteBtn = document.querySelector(".del");
const noCancelBtn = document.querySelector(".cancel");
const plusBtn = document.querySelectorAll(".plus");
const minusBtn = document.querySelectorAll(".minus");
const body = document.body;

// event Listeners
minusBtn.forEach((minus) => {
  minus.addEventListener("click", downVote);
});
plusBtn.forEach((plus) => {
  plus.addEventListener("click", upVote);
});
deleteBtn.forEach((del) => {
  del.addEventListener("click", launchDeleteModal);
});

editBtn.forEach((edit) => {
  edit.addEventListener("click", editComment);
  edit.addEventListener("click", deleteComment);
});

replyBtn.forEach((reply) => {
  reply.addEventListener("click", replyComment);
});

sendBtn.forEach((send) => {
  send.addEventListener("click", add);
});

// Objects
const votes =  {
   amy : {
     upVoted : false,
     downVoted : false,
   },
   max : {
     upVoted : false,
     downVoted : false,
   },
   ram : {
     upVoted : false,
     downVoted : false,
   }
  }
// functions
function upVote(e) {
  const parent = getParent(e);
  for (const name in votes) {
    if(!votes[`${name}`].upVoted) {
      if(parent.classList.contains(`${name}`)) {
        const personVotes = document.querySelectorAll(`.${name}-num`);
        personVotes[0].innerText++;
        personVotes[1].innerText++;
        votes[`${name}`].upVoted = true;
        votes[`${name}`].downVoted = false;
      }
    }
  }
}
function downVote(e) {
  const parent = getParent(e);
  for (const name in votes) {
    if(!votes[`${name}`].downVoted) {
      if(parent.classList.contains(`${name}`)) {
        const personVotes = document.querySelectorAll(`.${name}-num`);
        personVotes[0].innerText--;
        personVotes[1].innerText--;
        votes[`${name}`].downVoted = true;
        votes[`${name}`].upVoted = false;
      }
    }
  }
}

function add(event) {
  event.preventDefault();
  const newComment = document.createElement("div");
  newComment.classList.add("main-parent");
  newComment.innerHTML = ` <article class="mb-3 your-reply shadow-sm box ">
    <div class="card-body bg-white d-flex">
      <!-- side-bar -->
      <div class="side-bar me-4 ms-2 d-none d-md-block">
        <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
          <div class="plus ">+</div>
          <div class="num px-2">0</div>
          <div class="minus">-</div>
        </div>
      </div>
      <!-- main-content -->
      <div class="main-content flex-grow-1">
        <div class="header d-flex align-items-center justify-content-between w-100">
          <!-- user-info -->
          <div class="user-info d-flex align-items-center">
            <div class="dp  pe-0 me-3">
              <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
            </div>
            <div class="name  me-2">juliusomo</div>
            <div class="you me-3">you</div>
             <div class="time ">Just Now</div>
          </div>
          <div class="activity d-none d-md-block">
            <div class="right d-flex">
              <div class="delete del-btn pe-3">
                <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                <span>Delete</span>
              </div>
              <div class="edit edit-btn ps-sm-2">
                <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                <span>Edit</span>
              </div>
            </div>
          </div>
        </div>
        
       <!-- user-comment -->
       <div class="user-comment py-3">
        ${textField.value}
       </div>
       <!-- comment-updates -->
       <div class="updates d-flex d-md-none justify-content-between align-items-center">
        <div class="left d-flex align-items-center px-2 py-1">
          <div class="plus me-3">+</div>
          <div class="num me-3">0</div>
          <div class="minus">-</div>
        </div>
        <div class="right d-flex">
          <div class="delete pe-3">
            <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
            <span>Delete</span>
          </div>
          <div class="edit ps-sm-2">
            <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
            <span>Edit</span>
          </div>
        </div>
      </div>
      </div>
       
      
    </div>
  </article> `;
  commentSection.appendChild(newComment);
  let text = document.querySelector(".text-field");
  let textVal = text.value;
  textField.value = "";
  const deleteBtn = document.querySelectorAll(".delete");
  const editBtn = document.querySelectorAll(".edit");
  deleteBtn.forEach((del) => {
    del.addEventListener("click", launchDeleteModal);
  });
  editBtn.forEach((edit) => {
    edit.addEventListener("click", editAddComment);
    edit.addEventListener("click", deleteComment);
  });
  let time = 'Just Now';
  function editAddComment(event) {
    const html = ` <article class="mb-3 your-reply shadow-sm box  main-parent">
       <div class="card-body bg-white d-flex">
         <!-- side-bar -->
         <div class="side-bar me-4 ms-2 d-none d-md-block">
           <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
             <div class="plus ">+</div>
             <div class="num px-2">0</div>
             <div class="minus">-</div>
           </div>
         </div>
         <!-- main-content -->
         <div class="main-content flex-grow-1">
           <div class="header d-flex align-items-center justify-content-between">
             <!-- user-info -->
             <div class="user-info d-flex align-items-center">
               <div class="dp  pe-0 me-3">
                 <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
               </div>
               <div class="name  me-2">juliusomo</div>
               <div class="you me-3">you</div>
               <div class="time ">${time}</div>
             </div>
            
           </div>
           
          <!-- user-comment -->
          <div class="text-area w-100 mb-2 mt-3">
          <textarea class=" p-3 w-100 text-field" name="" id="" cols="" rows="4" placeholder="" >${textVal}</textarea>
        </div> 
          <!-- comment-updates -->
          <div class="updates d-flex justify-content-between justify-content-md-end align-items-center">
           <div class="left d-md-none d-flex align-items-center px-2 py-1">
             <div class="plus me-3">+</div>
             <div class="num me-3">0</div>
             <div class="minus">-</div>
           </div>
           <div class="">
              <div class="update-btn  d-inline-block">
                <span class="p-1">UPDATE</span>
              </div>
            </div>
         </div>
         </div>
       </div>
     </article> `;
      const parent = getParent(event);
      parent.insertAdjacentHTML("afterend", html);
      const textField = document.querySelector(".text-field");
      const updateBtn = document.querySelector(".update-btn");
      updateBtn.addEventListener("click", (event) => {
        const parent = getParent(event);
        const text = textField.value;
        const html = `  <article class="mb-3 your-reply shadow-sm box  main-parent">
        <div class="card-body bg-white d-flex">
          <!-- side-bar -->
          <div class="side-bar me-4 ms-2 d-none d-md-block">
            <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
              <div class="plus ">+</div>
              <div class="num px-2">0</div>
              <div class="minus">-</div>
            </div>
          </div>
          <!-- main-content -->
          <div class="main-content  justify-content-between">
            <div class="header d-flex align-items-center justify-content-between">
              <!-- user-info -->
              <div class="user-info d-flex align-items-center">
                <div class="dp  pe-0 me-3">
                  <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
                </div>
                <div class="name  me-2">juliusomo</div>
                <div class="you me-3">you</div>
                <div class="time ">Just Now (edited)</div>
              </div>
              <div class="activity d-none d-md-block">
                <div class="right d-flex">
                  <div class="delete pe-3">
                    <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                    <span>Delete</span>
                  </div>
                  <div class="edit ps-sm-2">
                    <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                    <span>Edit</span>
                  </div>
                </div>
              </div>
            </div>
            
           <!-- user-comment -->
           <div class="user-comment your-comment  py-3">
           <span></span> ${text}
           </div>
           <!-- comment-updates -->
           <div class="updates d-flex d-md-none justify-content-between align-items-center">
            <div class="left d-flex align-items-center px-2 py-1">
              <div class="plus me-3">+</div>
              <div class="num me-3">0</div>
              <div class="minus">-</div>
            </div>
            <div class="right d-flex">
              <div class="delete pe-3">
                <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                <span>Delete</span>
              </div>
              <div class="edit ps-sm-2">
                <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                <span>Edit</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </article> `;
      const textField2 = document.querySelector(".text-field");
       textVal = textField2.value;
       time = 'Just Now (edited)';
        parent.insertAdjacentHTML("afterend", html);
        parent.remove();
        const editBtn = document.querySelectorAll(".edit");
        const deleteBtn = document.querySelectorAll(".delete");
        
        deleteBtn.forEach((del) => {
          del.addEventListener("click", deleteComment);
        });

        editBtn.forEach((edit) => {
          edit.addEventListener("click", editAddComment);
          edit.addEventListener("click", deleteComment);
        });
      });
  }
}

function launchDeleteModal(e) {
  deleteModal.style.display = 'flex';
  const item = e;
  yesDeleteBtn.addEventListener("click", deleteComment);
  noCancelBtn.addEventListener("click", (e) => {
     deleteModal.style.display = 'none';
  });
  // noCancelBtn.addEventListener("click", closeDeleteModal);
  function deleteComment(event) {
    //  DELETE Comment
    const parent = getParent(item);
    parent.remove();
    deleteModal.style.display = 'none';
  }
}

function deleteComment(event) {
  //  DELETE Comment
  const parent = getParent(event);
  parent.remove();
}

function getParent(e) {
  const item = e.target;
  let parent = item.parentElement;
  while (!parent.classList.contains("main-parent"))
    parent = parent.parentElement;
  return parent;
}

let time = "2 days ago";
let textVal = yourComment.innerText;

function editComment(event) {

  const html = ` <article class="mb-3 your-reply shadow-sm box  main-parent">
  <div class="card-body bg-white d-flex">
    <!-- side-bar -->
    <div class="side-bar me-4 ms-2 d-none d-md-block">
      <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
        <div class="plus ">+</div>
        <div class="num px-2">2</div>
        <div class="minus">-</div>
      </div>
    </div>
    <!-- main-content -->
    <div class="main-content flex-grow-1">
      <div class="header d-flex align-items-center justify-content-between">
        <!-- user-info -->
        <div class="user-info d-flex align-items-center">
          <div class="dp  pe-0 me-3">
            <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
          </div>
          <div class="name  me-2">juliusomo</div>
          <div class="you me-3">you</div>
          <div class="time ">${time}</div>
        </div>
       
      </div>
      
     <!-- user-comment -->
     <div class="text-area w-100 mb-2 mt-3">
     <textarea class=" p-3 w-100 text-field" name="" id="" cols="" rows="4" placeholder="" >${textVal}</textarea>
   </div> 
     <!-- comment-updates -->
     <div class="updates d-flex justify-content-between justify-content-md-end align-items-center">
      <div class="left d-md-none d-flex align-items-center px-2 py-1">
        <div class="plus me-3">+</div>
        <div class="num me-3">2</div>
        <div class="minus">-</div>
      </div>
      <div class="">
         <div class="update-btn  d-inline-block">
           <span class="p-1">UPDATE</span>
         </div>
       </div>
    </div>
    </div>
  </div>
</article> `;
 const parent = getParent(event);
 parent.insertAdjacentHTML("afterend", html);
 const textField = document.querySelector(".text-field");
 const updateBtn = document.querySelector(".update-btn");
 updateBtn.addEventListener("click", (event) => {
   const parent = getParent(event);
   const text = textField.value;
   const replyToUserLength = getReplyToUserLength(text);
   const userName = text.slice(1, replyToUserLength + 1);
   const userText = text.slice(replyToUserLength + 2);
   const html = `  <article class="mb-3 your-reply shadow-sm box  main-parent">
   <div class="card-body bg-white d-flex">
     <!-- side-bar -->
     <div class="side-bar me-4 ms-2 d-none d-md-block">
       <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
         <div class="plus ">+</div>
         <div class="num px-2">2</div>
         <div class="minus">-</div>
       </div>
     </div>
     <!-- main-content -->
     <div class="main-content  justify-content-between">
       <div class="header d-flex align-items-center justify-content-between">
         <!-- user-info -->
         <div class="user-info d-flex align-items-center">
           <div class="dp  pe-0 me-3">
             <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
           </div>
           <div class="name  me-2">juliusomo</div>
           <div class="you me-3">you</div>
           <div class="time ">2 days ago (edited)</div>
         </div>
         <div class="activity d-none d-md-block">
           <div class="right d-flex">
             <div class="delete pe-3">
               <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
               <span>Delete</span>
             </div>
             <div class="edit ps-sm-2">
               <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
               <span>Edit</span>
             </div>
           </div>
         </div>
       </div>
       
      <!-- user-comment -->
      <div class="user-comment your-comment  py-3">
      <span>@${userName}</span> ${userText}
      </div>
      <!-- comment-updates -->
      <div class="updates d-flex d-md-none justify-content-between align-items-center">
       <div class="left d-flex align-items-center px-2 py-1">
         <div class="plus me-3">+</div>
         <div class="num me-3">2</div>
         <div class="minus">-</div>
       </div>
       <div class="right d-flex">
         <div class="delete pe-3">
           <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
           <span>Delete</span>
         </div>
         <div class="edit ps-sm-2">
           <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
           <span>Edit</span>
         </div>
       </div>
     </div>
     </div>
   </div>
 </article> `;
 const textField2 = document.querySelector(".text-field");
  textVal = textField2.value;
  time = '2 days ago (edited)';
   parent.insertAdjacentHTML("afterend", html);
   parent.remove();
   const editBtn = document.querySelectorAll(".edit");
   const deleteBtn = document.querySelectorAll(".delete");
   
   deleteBtn.forEach((del) => {
     del.addEventListener("click", launchDeleteModal);
   });

   editBtn.forEach((edit) => {
     edit.addEventListener("click", editComment);
     edit.addEventListener("click", deleteComment);
   });
 });
}

function replyComment(event) {
  let replyToUser = getReplyToUser(event);
  let parent = getParent(event);

  // REPLY_COMMENT_BOX CODE
  const html = `  <div class="add-comment main-parent">
         <article class=" shadow-sm mb-3 box">
           <div class="card-body w-100 d-md-flex justify-content-between  bg-white">
             <div class="dp d-none d-md-inline-block me-md-3">
               <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
             </div>
             <div class="text-area me-md-3 flex-fill mb-2">
               <textarea class="w-100 p-3 text-field" name="" id="" cols="" rows="3" placeholder="Add your reply..." >@${replyToUser}</textarea>
             </div>
             <div class="reply-btn d-none d-md-block ">
               <span class="p-1">REPLY</span>
             </div>
             <div class="bottom  d-flex justify-content-between align-items-center d-md-none">
               <div class="dp d-inline-block ">
                 <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
               </div>
               <div class="reply-btn  d-inline-block">
                 <span class="p-1">REPLY</span>
               </div>

             </div>
           </div>
         </article>
       </div> `;

  //  ADD REPLY_COMMENT_BOX and CALL SUBMIT_REPLY FUNCTIONS
    parent.insertAdjacentHTML("afterend", html);

  const submitReplyAmy = document.querySelectorAll(".reply-btn");
  submitReplyAmy.forEach((reply) => {
    reply.addEventListener("click", submitReply);
    reply.addEventListener("click", deleteComment);
    // reply.addEventListener("click", deleteComment);
  });

  const st = replyToUser.length + 1;

  // submitReply Function
  function submitReply(event) {
    const textField = document.querySelector(".text-field");
    const textValue = textField.value.slice(st);

    event.preventDefault();
    const replyAmyHTML = ` <div class="replies ms-md-5 ps-md-4 ">
  <!-- inner_reply_body -->
  <div class="inner-reply-body ms-3">   
  <!-- your-reply -->
  <article class="mb-3 your-reply shadow-sm box  main-parent">
    <div class="card-body bg-white d-flex">
      <!-- side-bar -->
      <div class="side-bar me-4 ms-2 d-none d-md-block">
        <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
          <div class="plus ">+</div>
          <div class="num px-2">0</div>
          <div class="minus">-</div>
        </div>
      </div>
      <!-- main-content -->
      <div class="main-content flex-grow-1">
        <div class="header d-flex align-items-center justify-content-between">
          <!-- user-info -->
          <div class="user-info d-flex align-items-center">
            <div class="dp  pe-0 me-3">
              <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
            </div>
            <div class="name  me-2">juliusomo</div>
            <div class="you me-3">you</div>
            <div class="time ">Just Now</div>
          </div>
          <div class="activity d-none d-md-block">
            <div class="right d-flex">
              <div class="delete pe-3">
                <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                <span>Delete</span>
              </div>
              <div class="edit ps-sm-2">
                <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                <span>Edit</span>
              </div>
            </div>
          </div>
        </div>
        
       <!-- user-comment -->
       <div class="user-comment py-3">
       <span>@${replyToUser}</span> ${textValue} 
       </div>
       <!-- comment-updates -->
       <div class="updates d-flex d-md-none justify-content-between align-items-center">
        <div class="left d-flex align-items-center px-2 py-1">
          <div class="plus me-3">+</div>
          <div class="num me-3">0</div>
          <div class="minus">-</div>
        </div>
        <div class="right d-flex">
          <div class="delete pe-3">
            <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
            <span>Delete</span>
          </div>
          <div class="edit ps-sm-2">
            <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
            <span>Edit</span>
          </div>
        </div>
      </div>
      </div>
    </div>
  </article>
  </div>
</div> `;
    const replyOthersHTML = ` <article class="mb-3 your-reply shadow-sm box  main-parent">
  <div class="card-body bg-white d-flex">
    <!-- side-bar -->
    <div class="side-bar me-4 ms-2 d-none d-md-block">
      <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
        <div class="plus ">+</div>
        <div class="num px-2">0</div>
        <div class="minus">-</div>
      </div>
    </div>
    <!-- main-content -->
    <div class="main-content flex-grow-1">
      <div class="header d-flex align-items-center justify-content-between">
        <!-- user-info -->
        <div class="user-info d-flex align-items-center">
          <div class="dp  pe-0 me-3">
            <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
          </div>
          <div class="name  me-2">juliusomo</div>
          <div class="you me-3">you</div>
          <div class="time ">Just Now</div>
        </div>
        <div class="activity d-none d-md-block">
          <div class="right d-flex">
            <div class="delete pe-3">
              <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
              <span>Delete</span>
            </div>
            <div class="edit ps-sm-2">
              <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
              <span>Edit</span>
            </div>
          </div>
        </div>
      </div>
      
     <!-- user-comment -->
     <div class="user-comment py-3">
     <span>@${replyToUser}</span> ${textValue} 
     </div>
     <!-- comment-updates -->
     <div class="updates d-flex d-md-none justify-content-between align-items-center">
      <div class="left d-flex align-items-center px-2 py-1">
        <div class="plus me-3">+</div>
        <div class="num me-3">0</div>
        <div class="minus">-</div>
      </div>
      <div class="right d-flex">
        <div class="delete pe-3">
          <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
          <span>Delete</span>
        </div>
        <div class="edit ps-sm-2">
          <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
          <span>Edit</span>
        </div>
      </div>
    </div>
    </div>
  </div>
</article> `;
 let textVal = document.querySelector(".text-field");

    // ADD REPLY (also delete and edit reply functionality)
    const htmlObject = document.createElement("div");
    if (replyToUser === "amyrobson") {
      htmlObject.innerHTML = replyAmyHTML;
      comment.insertAdjacentElement("beforeend", htmlObject);
    } else {
      htmlObject.innerHTML = replyOthersHTML;
      innerReplyBody.insertAdjacentElement("beforeend", htmlObject);
    }
    const deleteBtn = document.querySelectorAll(".delete");
    deleteBtn.forEach((del) => {
      del.addEventListener("click", launchDeleteModal);
    });
    const editBtn = document.querySelectorAll(".edit");
    editBtn.forEach((edit) => {
      edit.addEventListener("click", editCommentReply);
      edit.addEventListener("click", deleteComment);
    });
    let time = 'Just Now';
    function editCommentReply(event) {
      const html = ` <article class="mb-3 your-reply shadow-sm box  main-parent">
       <div class="card-body bg-white d-flex">
         <!-- side-bar -->
         <div class="side-bar me-4 ms-2 d-none d-md-block">
           <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
             <div class="plus ">+</div>
             <div class="num px-2">0</div>
             <div class="minus">-</div>
           </div>
         </div>
         <!-- main-content -->
         <div class="main-content flex-grow-1">
           <div class="header d-flex align-items-center justify-content-between">
             <!-- user-info -->
             <div class="user-info d-flex align-items-center">
               <div class="dp  pe-0 me-3">
                 <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
               </div>
               <div class="name  me-2">juliusomo</div>
               <div class="you me-3">you</div>
               <div class="time ">${time}</div>
             </div>
            
           </div>
           
          <!-- user-comment -->
          <div class="text-area w-100 mb-2 mt-3">
          <textarea class=" p-3 w-100 text-field" name="" id="" cols="" rows="4" placeholder="" >${textVal.value}</textarea>
        </div> 
          <!-- comment-updates -->
          <div class="updates d-flex justify-content-between justify-content-md-end align-items-center">
           <div class="left d-md-none d-flex align-items-center px-2 py-1">
             <div class="plus me-3">+</div>
             <div class="num me-3">0</div>
             <div class="minus">-</div>
           </div>
           <div class="">
              <div class="update-btn  d-inline-block">
                <span class="p-1">UPDATE</span>
              </div>
            </div>
         </div>
         </div>
       </div>
     </article> `;
      const parent = getParent(event);
      parent.insertAdjacentHTML("afterend", html);
      const textField = document.querySelector(".text-field");
      const updateBtn = document.querySelector(".update-btn");
      updateBtn.addEventListener("click", (event) => {
        const parent = getParent(event);
        const text = textField.value;
        const replyToUserLength = getReplyToUserLength(text);
        const userName = text.slice(1, replyToUserLength + 1);
        const userText = text.slice(replyToUserLength + 2);
        const html = `  <article class="mb-3 your-reply shadow-sm box  main-parent">
        <div class="card-body bg-white d-flex">
          <!-- side-bar -->
          <div class="side-bar me-4 ms-2 d-none d-md-block">
            <div class="left d-flex flex-column justify-content-center align-items-center px-2 py-1">
              <div class="plus ">+</div>
              <div class="num px-2">0</div>
              <div class="minus">-</div>
            </div>
          </div>
          <!-- main-content -->
          <div class="main-content  justify-content-between">
            <div class="header d-flex align-items-center justify-content-between">
              <!-- user-info -->
              <div class="user-info d-flex align-items-center">
                <div class="dp  pe-0 me-3">
                  <img class="img-fluid" src="/interactive-comments-section-main/images/avatars/image-juliusomo.png" alt="">
                </div>
                <div class="name  me-2">juliusomo</div>
                <div class="you me-3">you</div>
                <div class="time ">Just Now (edited)</div>
              </div>
              <div class="activity d-none d-md-block">
                <div class="right d-flex">
                  <div class="delete pe-3">
                    <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                    <span>Delete</span>
                  </div>
                  <div class="edit ps-sm-2">
                    <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                    <span>Edit</span>
                  </div>
                </div>
              </div>
            </div>
            
           <!-- user-comment -->
           <div class="user-comment your-comment  py-3">
           <span>@${userName}</span> ${userText}
           </div>
           <!-- comment-updates -->
           <div class="updates d-flex d-md-none justify-content-between align-items-center">
            <div class="left d-flex align-items-center px-2 py-1">
              <div class="plus me-3">+</div>
              <div class="num me-3">0</div>
              <div class="minus">-</div>
            </div>
            <div class="right d-flex">
              <div class="delete pe-3">
                <img class="pe-1  pb-1" src="/interactive-comments-section-main/images/icon-delete.svg" alt="">
                <span>Delete</span>
              </div>
              <div class="edit ps-sm-2">
                <img class="pe-1 pb-1" src="/interactive-comments-section-main/images/icon-edit.svg" alt="">
                <span>Edit</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </article> `;
      const textField2 = document.querySelector(".text-field");
       textVal = textField2;
       time = 'Just Now (edited)';
        parent.insertAdjacentHTML("afterend", html);
        parent.remove();
        const editBtn = document.querySelectorAll(".edit");
        const deleteBtn = document.querySelectorAll(".delete");
        
        deleteBtn.forEach((del) => {
          del.addEventListener("click", launchDeleteModal);
        });

        editBtn.forEach((edit) => {
          edit.addEventListener("click", editCommentReply);
          edit.addEventListener("click", deleteComment);
        });
      });
    }
  }
}

function getReplyToUser(e) {
  const item = e.target;
  let replyToUser = "amyrobson";
  let parent = item.parentElement;

  if (parent.classList.contains("max")) {
    replyToUser = "maxblagun ";
  } else if (parent.classList.contains("ram")) {
    replyToUser = "ramsesmiron ";
  } 
  return replyToUser;
}

function getReplyToUserLength(str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      return i - 1;
    }
  }
}

