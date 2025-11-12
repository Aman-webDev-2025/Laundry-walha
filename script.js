//making our service what we want to display
const serviceElement = [
    {id:1, name:'Dry Cleaning', price:200.00, isadded:false},
    {id:2, name:'Wash & Fold', price:100.00, isadded:false},
    {id:3, name:'Ironing', price:30.00, isadded:false},
    {id:4, name:'Stain Removal', price:500.00, isadded:false},
    {id:5, name:'Leather & Suede Cleaning', price:999.00, isadded:false},
    {id:6, name:'Wedding Dress Cleaning', price:2500.00, isadded:false}
];

const serviceList = document.querySelector('.service-list');                     
const prevItem = document.querySelector('.prev-item');
const price = document.querySelector('.prices');


let sum = 0;

// displaying the service in serviceList
serviceList.innerHTML = 
`<ul>
${serviceElement.map(service => 
    `<li>
        ${service.id}. ${service.name} - <span style="color:blue">₹${service.price}</span>
        <button class="service-btn" id="${service.id}">Add item <i class="fa-solid fa-circle-plus"></i></button>
    </li>`).join('')}
</ul>`;

if(sum==0){
    prevItem.innerHTML = `
        <h3><i class="fa-solid fa-circle-info"></i><br>NO items Added</h3>
        <p>Please add the services to your cart</p>`;
}

// added a function for adding items in cart
function updateCart() {
    const added = serviceElement.filter(s => s.isadded);                     //it will filter perticular item if isadded is ture of it
    if (added.length === 0) {                                           //if no item is added it will display the message
        prevItem.innerHTML = `
        <h3><i class="fa-solid fa-circle-info"></i><br>NO items Added</h3>
        <p>Please add the services to your cart</p>`;
        sum = 0;
    } else {
        const rows = added.map((s, i) =>               //whose isadded is true that item will return to new array s will check each service and i is index its value is 0
            `<tr id="r-${s.id}">                                            
                <td>${i + 1}</td>
                <td>${s.name}</td>
                <td>₹${s.price}</td>
            </tr>`).join('');
        prevItem.innerHTML = `<table>
            <thead>
                <tr><th>Sl no.</th><th>Item</th><th>Price</th></tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>`;
    }
    price.innerHTML = `₹${sum}`;
}


function rerender() {                         
    const allBtn = document.querySelectorAll('.service-btn');
    allBtn.forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.id);                         //string will converted into number
            const matchItem = serviceElement.find(s => s.id === id);         //finding service whose service and button id will match
            if (!matchItem) return;                                    

            if (!matchItem.isadded) {                       //isadded is false so if aa button is clicked this part will run
                matchItem.isadded = true;
                sum += matchItem.price;
                btn.innerHTML = 'Remove item <i class="fa-solid fa-circle-minus"></i>';
                
            } else {
                matchItem.isadded = false;
                sum -= matchItem.price;
                btn.innerHTML = 'Add item <i class="fa-solid fa-circle-plus"></i>';
            }

            updateCart();              //calling this function so when it will run when isadded value is true
        });
    });
}

rerender();

    const bookingForm=document.getElementById('booking-form');
    const cnfrm = document.querySelector('.cnfrm');
    const bookingBtn = document.getElementById('booking-btn');


    //accessing detail of user which he has given
    let userName=document.getElementById('name');
    let userEmail=document.getElementById('email');
    let userPhone=document.getElementById('phone');


//when user will click on book it will send msg to mail
bookingForm.addEventListener("submit", () => {

    if (sum === 0) {
        event.preventDefault(); 
        cnfrm.style.color = 'red';
        cnfrm.innerHTML = `❌ Please add at least one service to your cart.`;
        return; 
    }
    event.preventDefault();            //stop for getting page refreshed
    let selectedService=serviceElement.filter(s=>s.isadded)              //it will filter the service whose isadded value is true
    let selectedCarts=selectedService.map(s=>                            //that service will map on selectedCarts
        `${s.name} - ${s.price}\n`).join('')
        let displayMessage=`This are the item which you have selected:\n\n ${selectedCarts}\n\n Total Price : ₹${sum} \n\n we will shortly contact you`

        let templateParams={
        // "mr.aman.kr2025@gmail.com",
        email: userEmail.value,

        Name: userName.value,
        Email: userEmail.value,
        PhoneNumber: userPhone.value,
        message: displayMessage,
        }


    emailjs.send('service_vqvaslq', 'template_jc9jpho', templateParams).then(
    (response) => {
    console.log('SUCCESS!', response.status, response.text);
    cnfrm.innerHTML = `✅ Your booking has been confirmed!`;
    },
    
    (error) => {
    console.log('FAILED...', error);
    }
);


});











// allBtn.forEach(btn =>{
//     btn.addEventListener("click",()=>{
//         isAdded=true;
//         isClicked=true;
//         let clickedBtn=btn.id;
//         const matchItem=serviceElement.find(item=> item.id==clickedBtn)
//         if(matchItem){
//              if(btn.innerHTML=='Add item <i class="fa-solid fa-circle-plus"></i>'){
//                 prevItem.innerHTML=`<table>
//                                 <thead>
//                                     <tr>
//                                         <th>Sl no.</th>
//                                         <th>Item</th>
//                                         <th>Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     ${`<tr>
//                                         <td>${count}</td>
//                                         <td>${matchItem.name}</td>
//                                         <td>${matchItem.price}</td>
//                                     </tr>`}
//                                 </tbody>
//                              </table>`
//                              count++;
//                              btn.innerHTML='Remove item <i class="fa-solid fa-circle-minus"></i>';
//                              price.innerHTML=`${matchItem.price}`;
//              } 
//              else{
//                 btn.innerHTML=`Add item <i class="fa-solid fa-circle-plus"></i>`;
//                 count--;
                
//              }
//         }
//     })
// })






// let prevItem=document.querySelector('.prev-item')
// const allBtn=document.querySelectorAll('.service-btn');
// let prices=document.querySelector('.prices')
// let count=1;

// let isClickbutton=false;
// let againClickButton=false;

// allBtn.forEach(btn =>{
//     btn.addEventListener("click" , () =>{
//         isClickbutton=true;
//         let clickedBtn=btn.id;
//         // isadded=!isadded;
//         const matchItem=serviceElement.find(item=>item.id==clickedBtn)
//         if(matchItem){
//         prevItem.innerHTML=`<table>
//                                 <thead>
//                                     <tr>
//                                         <th>Sl no.</th>
//                                         <th>Item</th>
//                                         <th>Price</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     ${`<tr>
//                                         <td>${count}</td>
//                                         <td>${matchItem.name}</td>
//                                         <td>${matchItem.price}</td>
//                                     </tr>`}
//                                 </tbody>
//                              </table>`
//                              isadded=true;
//         prices.innerHTML=`${matchItem.price}` 
//         btn.innerHTML=`Remove`;
//     }
//     })
// })



// allBtn.forEach(btn =>{
//     btn.addEventListener("click" , () =>{
//         const clickedBtn=this.id;
//         serviceElement.forEach(item =>{
//             if(item.id==clickedBtn){
//                 prevItem.innerHTML=`${item.name}`;
//             }else{
//                 prevItem.innerHTML=`${item.price}`;
//             }
//         })
//     })
// })


// serviceElement.forEach(item =>{
//     allBtn.forEach(btn =>{
//         btn.addEventListener("click", ()=>{
//             let clickedBtn=this.id;
//             if(item.id==service.id){
//                 prevItem.innerHTML=`hy`;
//             }else{
//                 prevItem.innerHTML=`by`;
//             }
//         })
//     })
// })



// allBtn.forEach(btn =>{
//     btn.addEventListener("click" , () =>{
//         const clickedBtn=this.id;
//         serviceElement.filter(item => {
//            if(clickedBtn==item.id){
//             prevItem.innerHTML=`hy`;
//            }
//            else{
//             prevItem.innerHTML=`by`;
//            }
//         })
//     })
// })



        // allBtn.forEach(btn =>{
        //     btn.addEventListener("click",()=>{
        //     const clickedBtn=this.id;
        //     serviceElement.filter(item =>)
               
        // })})


    // btn.addEventListener("click",()=>{
    //     serviceElement.forEach(item =>{
    //         if(btn.id==item.id){
    //         prevItem.innerHTML=
    //         `<ul>
    //             ${serviceElement.filter(item =>
    //                 `<li>
    //                    ${item.name} -${item.price}
    //                 </li>`)}
    //         </ul>`
    //         }
    //     })
    // })


// btn.addEventListener("click",()=>{
//     if(btn.textContent=='Add item'){
//     btn.textContent='Remove item';
//     // prevItem.innerHTML=`NAme=${serviceElement[0].name} , Price = ${serviceElement[0].price} `;
//     }else{
//         btn.textContent='Add item';
//     }
// serviceElement.forEach(item=>{
//      prevItem.innerHTML += `<div>Name: ${item.name}, Price: ${item.price}</div>`;
//     });
// })

// btn.forEach(btn => {
    // btn.addEventListener("click",()=>{
    // if(btn.textContent==='Add item'){
    //    btn.textContent='Remove item';
    // //    prevItem.innerHTML`<ul>${cart.map(item => `<li> ${item.name} - ₹${item.price}</li>` )}<ul>`
    // }else{
    //    btn.textContent='Add item';
    // }
//  })   
// });