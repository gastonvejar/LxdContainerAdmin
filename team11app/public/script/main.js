var url="http://localhost:3000"; //for local testing.
//var url="https://team11cm.com"; //for production.


/*Info component*/
Vue.component('info',{
        template:`<div>
        <h2>Container Management System</h2>
        <h4>Developed by</h4><br>
        <p>Gaston Vejar (11011692)</p><br><p>and</p><br><p>Chetan Tuli (11011689)</p>
        <br>
        <p> Front-end:HTML, CSS and Vue.js created by Chetan Tuli</p>
        <br>
        <p> Back-end:Node.js; Container Server (LXD); Load Balancer (nginx) with SSL; Web Servers (nginx); Database (mySQL) by Gaston Vejar<p>
        </div>
        
        `
})
/* Navbar Component*/
Vue.component('navbar',{
        template:`<div v-bind:style="navbarStyle">
                        <h1>{{heading}}</h1>
                        <h4>{{subHeading}}</h4>
                 </div>`,
    data(){
            return{
                heading:"Container Manager",
                subHeading:"Presented by Team 11", 
                navbarStyle:{
                        background:'linear-gradient(-180deg, dodgerblue,rgb(26, 133, 122))',
                        height:'100px',
                        margin:'0 0 5px 0'
                        
                }
            }
    }
})
/* Sidebar Component*/
Vue.component('sidebar',{
        template:`<ul>
                        <li><a href="index.html"><i class="fa fa-fw fa-home">&nbsp&nbsp{{home}}</i></a></li>
                        <li><a href="forms.html"><i class="fa fa-fw fa-user">&nbsp&nbsp&nbsp{{login}}</i></a></li>
                  </ul>`,
        data(){
                return{
                    home:"Home",
                    login:"Login"
                }
        }
})
/* Login Form Component*/
Vue.component('login',{
        template:`<form style="max-width:500px;margin:auto">
                        <h2>{{login}}</h2>
                                <div :style="formContainer">
                                        <i class="fa fa-envelope icon"></i>
                                        <input :style="formField" type="email" v-model="email" placeholder="Email" required minlength="10" id=email>
                                </div>
                                <div :style="formContainer">
                                        <i class="fa fa-key icon"></i>
                                        <input :style="formField" type="password" v-model="password" placeholder="Password" required id=password>
                                </div>
                                <button type="submit" :style="buttonStyle1" v-on:click.prevent="userLogin(email,password)">{{login}}</button>&nbsp;&nbsp;&nbsp;<button :style="buttonStyle1" type="button" v-on:click="openModal">{{register}}</button>
                </form>
                        <div id="modalID" class="modal">
                                <span onclick="document.getElementById('modalID').style.display='none'" class="close" title="Close Modal">&times;</span>
                                <form class="modal-content">
                                        <div class="container">
                                                <h1>{{register}}</h1>
                                                <p>{{registerSubHeading}}</p>
                                                <hr>
                                                <label>{{firstName}}:</label>
                                                <input type="text" placeholder="First Name" v-model="storeRegisterData.firstName" required minlength="5"><br>
                                                <label>{{lastName}}:</label>
                                                <input type="text" placeholder="Last Name" v-model="storeRegisterData.lastName" required minlength="5"><br>
                                                <label>{{email}}:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <input type="email" placeholder="Email" v-model="storeRegisterData.email" required minlength="10"><br>
                                                <label>{{password}}:&nbsp;</label>
                                                <input type="password" placeholder="Password" v-model="storeRegisterData.password" required>
                                        <div class="clear">
                                                <button type="button" v-bind:style="buttonStyle1" v-on:click="cancelModal">{{cancel}}</button>&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button type="submit" v-bind:style="buttonStyle1" v-on:click.prevent="userRegister()">{{register}}</button>
                                </div>
                        </div>
                /form>
            </div>`,
        
       
data(){
                return{
                        authenticated:false,
                                
                        storeRegisterData:{
                                firstName:"",
                                lastName:"",
                                email:"",
                                password:""
                        },
                        registerData:[
                                {
                                        firstName:"",
                                        lastName:"",
                                        email:"",
                                        password:""
                                }
                        ],
                        loginUserId: '',
                        login:"Login",
                        firstName:"First Name",
                        lastName:"Last Name",
                        register:"Register",
                        email:"Email",
                        password:"Password",
                        cancel:"Cancel",
                        buttonStyle1:{
                                background:'dodgerblue',
                                color:'white',
                                padding:'15px 20px',
                                border:'none',
                                cursor:'pointer',
                                width:'20%',
                                opacity:'0.9',
                                margin:'3px',
                                display:'inline-block'
                        },
                        formContainer:{
                                display:'-ms-flexbox',
                                display:'flex',
                                width:'100%',
                                margin:'0 0 15px'
                        },
                        formField:{
                                width: '100%',
                                padding:'15px',
                                outline:'none'
                        },
                        loginUserIdData:""
                }
        },
methods:{
        openModal(){
                document.getElementById('modalID').style.display='block';style="width:auto"
        },
        cancelModal(){
                document.getElementById('modalID').style.display='none'
        },
        userLogin(email,password){
                axios({ method: "GET", "url":url+'/login/'+email+'/'+password, "headers": { "content-type": "application/json" } }).then(result => {
                        this.response = result.data;
                        if(typeof result.data == "string"){
                                alert(result.data)
                        } else{
                                loginUserId = result.data[0].id;
                                localStorage.setItem('userID',loginUserId);
                                console.log("User id: " + loginUserId)
                                console.log("login:" +result.data[0].id)
                                window.location.href = url+"/display.html";
                        }
                }, error => {
                        console.error(error);
                });      
        },

        userRegister(){
                axios({ method: "GET",
                        "url":url+'/register/'+this.storeRegisterData.firstName+'/'+this.storeRegisterData.lastName+'/'+this.storeRegisterData.email+'/'+this.storeRegisterData.password,"headers": { "content-type": "application/json" } }).then(result => {
                        this.response = result.data;
                        window.location.reload();
                        console.log(result.data);
                        alert('User registered!');
                }, 
                error => {
                        console.error(error);
                });
            }
                }
        
        
},)
/*Display table component*/
Vue.component('display',{
        template:` 
        <h2>{{containers}} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button :style="buttonStyle1" v-on:click="openModal2">{{displayHeading}}</button></h2>
        <br>
         <table>
        <tr>
            <th>{{nameHeading}}</th>
            <th>{{statusHeading}}</th>
            <th>{{actionsHeading}}</th>
        </tr>
        <tr v-for="(index,newData) in dataForPage">
            <td>{{newData.name}}</td>
            <td v-model="dataForPage.status">{{newData.status}}</td>
            <td><button :style="buttonStyle1" v-on:click="containerStart(index)">{{start}}</button><button :style="buttonStyle1" v-on:click="containerStop(index)">{{stop}}</button><button :style="buttonStyle1" v-on:click="containerDelete(index)">{{delete}}</button><button :style="buttonStyle1" v-on:click="detailsPage(index)">{{details}}</button></td>
            </tr>
        
    </table>
    <div id="modalID2" class="modal">
                <span onclick="document.getElementById('modalID2').style.display='none'" class="close" title="Close Modal">&times;</span>
                <form class="modal-content">
                    <div class="container">
                        <h1>{{displayHeading}}</h1>
                        <p>{{instruction}}</p>
                        <hr>
                        <table>
                                <tr>
                                    <th>{{nameHeading}}</th>
                                    <th>{{distribution}}</th>
                                    <th>{{ver}}</th>
                                    <th>{{arch}}</th>
                                    <th>{{selection}}</th>
                                </tr>
                                <tr v-for="(index,data) in dataForModal">
                                <h3> Please enter a container name<h3>
                                <input type="text" v-model="newContainerName" required>
                                    <td>{{data.name}}</td>
                                    <td>{{data.distribution}}</td>
                                    <td>{{data.version}}</td>
                                    <td>{{data.architecture}}</td>
                                    <td><button :style="buttonStyle1" v-on:click.prevent="selectNewContainer(index)"></button></td>
                                </tr>
                        </table>
                            <button v-bind:style="buttonStyle1" v-on:click="cancelModal2">{{cancel}}</button>&nbsp;&nbsp;&nbsp;&nbsp;
                        </div>
                    </div>
                </form>
        </div>`,


        data(){
            return{     
                        dataForModal:{
                                id:''
                        },
                        dataForPage:{
                                name:'',
                                created_date:'',
                                deleted_date:'',
                                id:'',
                                image_id:'',
                                status:'',
                                user_id:''
                        },
                        details:"Details",
                        containersUserId:"",
                        newContainerName:"",
                        sampleData:"Enter Sample",
                        instruction:"Please select the blue box in order to create a new container",
                        start:"Start",
                        stop:"Stop",
                        delete:"Delete",
                        nameHeading:"Name",
                        statusHeading:"Status",
                        actionsHeading:"Actions",
                        new:"New",
                        container:"Container",
                        cancel:"Cancel",
                        distribution:"Distribution",
                        ver:"Version",
                        arch:"Arch",
                        selection:"Selection",
                        buttonStyle1:{
                                background:'dodgerblue',
                                color:'white',
                                padding:'15px 20px',
                                border:'none',
                                cursor:'pointer',
                                width:'20%',
                                opacity:'0.9',
                                margin:'3px',
                                display:'inline-block'
                        },
                        containers:"My Containers",
                        response:"",
                        
            }
            
    },
    
    methods:{
        openModal2(){
                document.getElementById('modalID2').style.display='block';style="width:auto"
        },
        cancelModal2(){
                document.getElementById('modalID2').style.display='none'
        },
        getDataForModal(){
                this.$http.get(url+'/search/images',{responseType:'json'}).then(function(data){
                this.dataForModal = data.body;
                console.log(data);
            }).catch(e =>{
                    console.log('Error',e);
            })
        },
        getDataForPage(){
                        let userIdS = localStorage.getItem('userID')
                        console.log("userIdS:"+userIdS)
                        this.$http.get(url+'/search/containers/'+userIdS,{responseType:'json'}).then(function(newData){
                                this.dataForPage = newData.body;
                                console.log(newData);
                                
                        }).catch(e =>{
                                console.log('Error',e);
                        })

        },
        detailsPage(index){
                localStorage.setItem('containerID',this.dataForPage[index].id);
                localStorage.setItem('containerNAME', this.dataForPage[index].name);
                window.location.href = url+"/details.html"         
                       
        },
        containerStart(index){
                axios({ method: "GET",
                         "url":url+'/containers/'+this.dataForPage[index].name+'/start',
                         "headers": { "content-type": "application/json" } }).then(result2 => {
                    this.response = result2.data;
                    console.log(this.dataForPage[index].name);
                    window.location.reload();
                    alert(result2.data)
                }, error => {
                    console.error(error);
                });
        },
        containerStop(index){
                axios({ method: "GET",
                         "url":url+'/containers/'+this.dataForPage[index].name+'/stop',
                         "headers": { "content-type": "application/json" } }).then(result2 => {
                    this.response = result2.data;
                    console.log(this.dataForPage[index].name);
                    window.location.reload();
                    alert(result2.data)
                }, error => {
                    console.error(error);
                });
        },
        containerDelete(index){
                axios({ method: "GET",
                         "url":url+'/containers/'+this.dataForPage[index].name+'/delete',
                         "headers": { "content-type": "application/json" } }).then(result2 => {
                    this.response = result2.data;
                    console.log(this.dataForPage[index].name);
                    window.location.reload();
                    alert(result2.data)
                }, error => {
                    console.error(error);
                });
        },
        selectNewContainer(index){
                let userIdS = localStorage.getItem('userID')
                console.log("userIdS:"+userIdS)
                axios({ method: "GET",
                         "url":url+'/containers/create/'+this.newContainerName+'/'+userIdS+'/'+this.dataForModal[index].id,
                         "headers": { "content-type": "application/json" } }).then(result2 => {
                    this.response = result2.data;
                    window.location.reload();
                    console.log(this.dataForPage[index].name);
                    console.log(this.dataForModal[index].id)
                    console.log(this.newContainerName)
                }, error => {
                    console.error(error);
                });
        },
        
    },
    computed:{
            displayHeading(){
                    return this.new + ' ' + this.container
            }
    },
    created(){
            
            this.getDataForModal();
            this.getDataForPage();
    }

})
/* Details Component + New Snapshot Modal*/
Vue.component('details',{
        template:` <h1>{{sampleData}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button type="button" :style="buttonStyle1" v-on:click="openModal3">{{detailsHeading}}</button></h1>
        <textarea v-model="dats" rows="4" cols="100"></textarea>
           <!--<button :style="buttonStyle1" v-on:click="containerStart(index)">{{start}}</button><button :style="buttonStyle1" v-on:click="containerStop(index)">{{stop}}</button>-->
        
       <h2>{{snapshots}}</h2>
       <table>
        <tr>
            <th>{{name}}</th>
            <th>{{description}}</th>
            <th>{{time}}</th>
            <th>{{action}}</th>
        </tr>
        <tr v-for= "(index,detData) in detailData">
            <td>{{detData.name}}</td>
            <td>{{detData.description}}</td>
            <td>{{detData.created_date}}</td>
            <td><button :style="buttonStyle1" v-on:click.prevent="restoreContainer(index)">{{restore}}</td>
        </tr>
       </table>
       <div id="modalID3" class="modal">
       <span onclick="document.getElementById('modalID3').style.display='none'" class="close" title="Close Modal">&times;</span>
       <form class="modal-content">
           <div class="container">
               <h1>{{detailsHeading}}</h1>
                 <hr>
                        {{snapshotName}}<input type="text" v-model="snapName">
                        {{snapshotDetails}}<br><textarea rows="4" cols="50" v-model="snapDetails"></textarea>
                   <button v-bind:style="buttonStyle1">{{cancel}}</button>&nbsp;&nbsp;&nbsp;&nbsp;<button v-bind:style="buttonStyle1" v-on:click="newSnapshot()">{{create}}</button>
               </div>
           </div>
       </form>
</div>`,

       data(){
               
               return{  
                        dataDetails:{},
                        restore:"Restore",
                        snapName:"",
                        snapDetails:"",
                        create:"Create",
                        sampleData:"Sample Data",
                        snapshots:"Snapshots",
                        enter:"Enter",
                        snapshot:"Snapshot",
                        name:"Name",
                        details:"Details",
                        buttonStyle1:{
                                background:'dodgerblue',
                                color:'white',
                                padding:'15px 20px',
                                border:'none',
                                cursor:'pointer',
                                width:'30%',
                                opacity:'0.9',
                                margin:'3px',
                                display:'inline-block'
                        },
                        name:"Name",
                        description:"Description",
                        time:"Time Stamp",
                        IP:"IP",
                        status:"Status",
                        actions:"Actions",
                        cancel:"Cancel",
                        new:"New",
                        container:"Container",
                        dats:"",
                        detailData:{},
                        start:"Start",
                        stop:"Stop",
                        action:"Actions"

               }
       },
       methods:{
        openModal3(){
                document.getElementById('modalID3').style.display='block';style="width:auto"
        },
        cancelModal3(){
                document.getElementById('modalID3').style.display='none'
        },
        getDataForDetailsPage(){
                let containerIdS = localStorage.getItem('containerID')
                console.log("containerIdS:"+containerIdS)
                this.$http.get(url+'/search/containers/snapshots/'+containerIdS,{responseType:'json'}).then(function(snapData){
                        this.detailData = snapData.body;
                        console.log(snapData);
                        console.log(this.detailData)
                }).catch(e =>{
                        console.log('Error',e);
                })
        }, 
        restoreContainer(index){
                let containerIdS = localStorage.getItem('containerID')
                console.log("containerIdS:"+containerIdS)
                axios({ method: "GET",
                         "url":url+'/containers/snapshots/restore/'+this.detailData[index].name+ '/' + containerIdS
                        }).then(result2 => {
                    this.response = result2.data;
                    console.log(result2.data);
                    window.location.reload();
                    alert(result2.data)
                },error => {
                    console.error(error);
                });
        },
        newSnapshot(){
                let containerIdS = localStorage.getItem('containerID')
                console.log("containerIdS:"+containerIdS)
                axios({ method: "GET",
                "url":url+'/containers/snapshots/create/'+this.snapName+'/'+this.snapDetails+'/'+containerIdS,
                "headers": { "content-type": "application/json" } }).then(snapData => {
                        this.detailsData=snapData.data
                        console.log(this.snapName);
                        console.log(this.snapDetails); 
                        console.log(snapData.data);
                        alert("Created Snapshot: " + this.snapName + "!");    
                        window.location.reload();   
           
       }, error => {
           console.error(error);
       })
        },
        getContainerData(){
                let containerName = localStorage.getItem('containerNAME')
                this.$http.get(url+'/containers/' + containerName + '/info').then(function(data){
                       return data.body;
                       
                }).then(function(data){
                        this.dats=data;
                        console.log(data)
                }).catch(e=>{
                        console.log('Err',e);
                })
        },
      
},
       computed:{
               detailsHeading(){
                       return this.new + ' ' + this.snapshot
               },
               snapshotName(){
                       return this.enter + ' ' + this.snapshot + ' ' + this.name
               },
               snapshotDetails(){
                       return this.enter + ' ' + this.snapshot + ' ' + this.details
               }
       },
       created(){
                this.getDataForDetailsPage();
                this.getContainerData();
       }
       
})
var data = new Vue(
        {   
            el:"#data",

        },
        
    )

