var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");
var submitBtn = document.getElementById("submitBtn");
var bookmarksTable = [];


if (localStorage.getItem("bookmark") == null){
    bookmarksTable = [];
}
else{
    bookmarksTable = JSON.parse(localStorage.getItem("bookmark"))
    display();
}

function addBookmark(){
    if(siteNameInput.classList.contains('is-valid')&&
       siteUrlInput.classList.contains('is-valid') ){
        var bookmark = {
            name: siteNameInput.value,
            url: siteUrlInput.value 
        }
        // console.log(bookmark);
        bookmarksTable.push(bookmark);
        console.log(bookmarksTable);
        clearForm();
        display();
        localStorage.setItem("bookmark" , JSON.stringify(bookmarksTable));
    }
    else{
        warningBox();
    }
}

function warningBox(){
    Swal.fire({
        html: `
        <div class="warningBox d-flex mx-auto bg-body justify-content-center align-items-center flex-wrap">
        <header class="d-flex justify-content-between w-100">
            <div class="circles d-flex ">
                <div class="rounded-circle circle m-1" style="background-color: #F15F5D;"></div>
                <div class="rounded-circle circle m-1" style="background-color: #FEBE2E;"></div>
                <div class="rounded-circle circle m-1" style="background-color: #4DB748;"></div>
            </div>
        </header>
        <section class="caption text-start">
            <h5 class="py-3 fw-bold">Site Name or Url is not valid, Please follow the rules below :</h5>
            <p class="fs-5 text-start"><i class="fa-regular fa-circle-right p-2"></i> Site name must contain at least 3 characters</p>
            <p class="fs-5 text-start"><i class="fa-regular fa-circle-right p-2"></i> Site URL must be a valid one</p>

        </section>
    </div>
        `,
        showCloseButton: true,
      });
    console.log("hello");
}

function clearForm() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove('is-valid');
    siteUrlInput.classList.remove('is-valid');
}

function display() {
    var cartona = "";
    for(var i = 0 ; i <bookmarksTable.length ; i++){
    cartona += `
        <tr>
        <td>${i+1}</td>
        <td>${bookmarksTable[i].name}</td>
        <td><a href="${bookmarksTable[i].url}" class="btn btn-success btnVisit"> <i class="pe-1 fa-solid fa-eye"></i> Visit</a>
        </td>
        <td><button onclick="deleteBookmark(${i});" class="btn btn-danger btnDelete"> <i class="pe-1 fa-solid fa-trash"></i> Delete</button>
        </td>
        </tr>
    `
    }
document.getElementById("tableData").innerHTML = cartona;
}

function deleteBookmark(deleteIndex){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            bookmarksTable.splice(deleteIndex , 1);
            display();
            localStorage.setItem("bookmark" , JSON.stringify(bookmarksTable));
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
        }
      });
   
}

function validation(ele){
    var regex = {
        siteName: /^[a-z||A-Z]\w{2,}/,
        siteUrl: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gm
    }
    if(regex[ele.id].test(ele.value)){
        ele.classList.remove('is-invalid');
        ele.classList.add('is-valid');
    }
    else{
        ele.classList.add('is-invalid');
        ele.classList.remove('is-valid');
    };
}


