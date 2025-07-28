const containers = document.querySelectorAll('.input-container');
const form = document.querySelector('form')

const tl = gsap.timeline({defaults:{duration:1}})

const start ='M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512';
const end = 'M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512';

containers.forEach(element => {
    const input =element.querySelector(".input");
    const line =element.querySelector(".line-svg path");
    const placeholder =element.querySelector(".placeholder")

    input.addEventListener('focus',()=>{
        if(!input.value){
        tl.fromTo(line,{attr:{d:start}},{attr:{d:end},ease:"Power2.easeOut",duration:0.75});
        tl.to(line,{attr:{d:start},ease:"elastic.out(3,0.5)"},"<50%")

        gsap.set(placeholder,{transformOrigin:"left"})

        tl.to(placeholder,{top:-15,left:0,scale:0.7,ease:"Power2.easeOut"},"<10%")
    }
    })

    input.addEventListener('input',(e)=>{
        if(e.target.type==="text"){
            let inputText = e.target.value;
            if(inputText.length>3) colorize("#0e57deff",line,placeholder);
            else colorize("red",line,placeholder)
        }
        if(e.target.type==="email"){
            let inputText = e.target.value;
            if(validateEmail(inputText)) colorize("#0e57deff",line,placeholder);
            else colorize("red",line,placeholder)
        }
        if(e.target.type==="tel"){
            let inputText = e.target.value;
            if(validatePhone(inputText)) colorize("#0e57deff",line,placeholder);
            else colorize("red",line,placeholder)
        }
    })

     

});

form.addEventListener('click',()=>{
    containers.forEach(element=>{
        const input =element.querySelector(".input");
    const line =element.querySelector(".line-svg path");
    const placeholder =element.querySelector(".placeholder")

    if(document.activeElement!==input){
        if(!input.value){
            gsap.to(placeholder,{top:0,left:0,ease:"Power2.easeOut",scale:1})
        }
    }

    })
})

function validateEmail(email) {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function validatePhone(phone) {
  let re = /^\d{10}$/;  // \d matches only digits, {10} ensures exactly 10 digits
  return re.test(phone);
}

function colorize(color,line,placeholder){
    gsap.to(line,{stroke:color,duration:0.75});
    gsap.to(placeholder,{color:color,duration:0.75});
}

const checkbox =document.querySelector(".checkbox")
const tl2 = gsap.timeline({defaults:{duration:0.75,ease:"Power2.easeOut"}});

const tickMark = document.querySelector(".tick-mark path")
const tickMarkLength = tickMark.getTotalLength();

gsap.set(tickMark,{strokeDashoffset:tickMarkLength,strokeDasharray:tickMarkLength})

checkbox.addEventListener('click',()=>{
    if(checkbox.checked){
        tl2.to(".checkbox-fill",{top:"0%"})
        .fromTo(tickMark,{strokeDashoffset:tickMarkLength},{strokeDashoffset:0},"<30%")
        .to(".checkbox-label",{color:"#0e57deff"},"<")
    }
    else{
        tl2.fromTo(tickMark,{strokeDashoffset:0},{strokeDashoffset:tickMarkLength})
         .to(".checkbox-label",{color:"black"},"<")
        .to(".checkbox-fill",{top:"100%"},"<30%")  
    }
})

// Animation on character

gsap.fromTo("#eye",{scale:1,transformOrigin:"center "},{scale:0.6,yoyo:true,repeat:-1,duration:0.7,repeatDelay:0.5,ease:"Power2.easeOut"});
gsap.fromTo("#left-eyebrow",{y:0},{y:1,yoyo:true,repeat:-1,duration:0.7,repeatDelay:0.5})
gsap.fromTo("#right-eyebrow",{y:0},{y:1,yoyo:true,repeat:-1,duration:0.7,repeatDelay:0.5})


const btn = document.querySelector('button')
const tl3 = gsap.timeline({defaults:{duration:0.75,ease:"Power2.easeOut"}});

btn.addEventListener('click',(e)=>{
    e.preventDefault();
    tl3.to(".left-content , .right-content",{y:30,opacity:0})
    .to("form",{scale:0.8},"<")
    .fromTo(".submitted",{opacity:0,y:30},{opacity:1,y:0})
    .fromTo("#hand",{rotation:0,y:0,transformOrigin:"left"},{rotation:-10,y:2,x:-3,ease:"elastic(3,0.3)",duration:2})
})