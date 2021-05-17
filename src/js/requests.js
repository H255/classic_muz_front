const login = document.getElementsByName('uname');
const password = document.getElementsByName('psw');

const fName = document.getElementsByName('fName');
const email = document.getElementsByName('email');
const message = document.getElementsByName('message');

const header = document.getElementsByName('header');
const yt = document.getElementsByName('yt');
const text = document.getElementsByName('text');
const file = document.getElementsByName('file');

const cName = document.getElementsByName('comment-name');
const cForm = document.getElementsByName('comment-form');

function requestLogin(){
    console.log(login[0].value, 'login');
    console.log(password[0].value, 'password');

    $.ajax({
        type: 'POST',
        url: "http://localhost:3001/api/v1/login",
        data: {
            username: login[0].value,
            password: password[0].value
        },
        success: function(result){
            console.log(result);
            console.log(result.token);
            localStorage.setItem('token', result.token);
            window.location.href = "/admin";
            if(localStorage.token){
                window.location.href = "/admin";
            }else{
                window.location.href = "/login.html";
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function requestDoContact() {
    console.log(fName[0].value);
    console.log(email[0].value);
    console.log(message[0].value);

    $.ajax({
        type: 'POST',
        url: "http://localhost:3001/api/v1/do",
        data: {
            firstName: fName[0].value,
            email: email[0].value,
            data: message[0].value
        },
        success: function(result){
            console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function requestGetContact() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3001/api/v1/feedbacks",
        success: function(result){
            for(let i=0; i<result.feedBacks.length;i++){
                $('.infos').append( `
                <div class="info">
                    <h4><strong>Անուն:</strong> ${result.feedBacks[i].firstName}</h4>
                    <p><strong>Email:</strong> ${result.feedBacks[i].email}</p>
                    <p><strong>Հաղորդագրություն:</strong> ${result.feedBacks[i].feedback}</p>
                </div>
            ` )
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
}

requestGetContact();


function requestDoNewPage() {
    console.log(header[0].value);
    console.log(yt[0].value);
    console.log(text[0].value);
    console.log(file[0].value);

    $.ajax({
        type: 'POST',
        url: "http://localhost:3001/api/v1/input",
        data: {
            header: header[0].value,
            data: yt[0].value,
            youtube: text[0].value,
            photo: file[0].value
        },
        success: function(result){
            console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

// function base(imageSrc){
//     let photo = imageSrc;
//     photo.crossOrigin = 'Anonymous';
//     photo.onload = function(){
//         let canvas = document.createElement('canvas');
//         let ctx = canvas.getContext('2d');
//         canvas.height = this.naturalHeight;
//         canvas.width = this.naturalWidth;
//         ctx.drawImage(this,0,0);
//         let data = canvas.toDataURL('image/jpeg');
//         console.log(data);
//         return data;
//     }
// }

// base('../img/bach.jpeg');

function requestGetPages() {
    let cUrl = location.search.split('id=')[1];
    console.log(cUrl, 'cURL');
    $.ajax({
        type: 'GET',
        url: `http://localhost:3001/api/v1/post/${cUrl}`,
        success: function(result){
            console.log(result);
            console.log(result.post, 'Pages');
            $('.data').append( `
                <p><a class="back_btn" href="../../arm_music.html">&#8617;</a></p>
                <h1 style="text-align: center;">${result.post.header}</h1>
                <p>
                <!--<img style="float: left; margin-right:10px; margin-top:5px" src="${result.post.photo}" alt="${result.post.header}" width="175" height="auto">-->
                </p>
                <p>
                    ${result.post.data}
                    <!--${result.post.youtube}-->
                </p>
            `)
        },
        error: function(error) {
            console.log(error);
        }
    })
}

requestGetPages();

function requestGetHeader() {
    $.ajax({
        type: 'GET',
        url: "http://localhost:3001/api/v1/headers",
        success: function(result){
            for(let i=0; i<result.postsHeaders.length;i++){
                $('.arm_mus').append( `
                    <li>
                        <a href="./src/arm_mus/index.html?id=${id=result.postsHeaders[i].id}">&bull; ${result.postsHeaders[i].header}</a>
                    </li>
                ` )
            }
        },
        error: function(error) {
            console.log(error);
        }
    })
}

requestGetHeader()

function toComment(){
    console.log(cName[0].value);
    console.log(cForm[0].value);

    let cUrl = location.search.split('id=')[1];
    console.log(cUrl, 'cURL');

    $.ajax({
        type: 'POST',
        url: "http://localhost:3001/api/v1/toComments",
        data: {
            tittle: cName[0].value,
            content: cForm[0].value,
            postId: cUrl
        },
        success: function(result){
            console.log(result);
        },
        error: function(error) {
            console.log(error);
        }
    })
}

function getComments(){
    let cUrl = location.search.split('id=')[1];
    console.log(cUrl, 'cURL');

    $.ajax({
        type: 'GET',
        url: `http://localhost:3001/api/v1/comments/${cUrl}`,
        success: function(result){
            console.log(result);

            for(let i=0; i<result.comments.length;i++){
                $('.comments').append( `
                    <h4>Անուն։ ${result.comments[i].tittle}</h4>
                    <p>Մեկնաբանություն։ ${result.comments[i].content}</p>
                    <hr/>
                ` )
            }

        },
        error: function(error) {
            console.log(error);
        }
    })
}

getComments();
