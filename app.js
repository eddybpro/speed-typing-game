const timer = document.querySelector('.timer h4')
const textPara = document.querySelector('.text-para')
const txt = document.querySelector('.txt');
const score = document.querySelector('.score');


getRandomQuote()

async function getRandomQuote(){
    const res = await fetch('https://type.fit/api/quotes')
    const data =await res.json();
    const para = data[Math.floor(Math.random() * data.length)].text;
    const paraLetterArr = para.split('');


    textPara.innerHTML= paraLetterArr.map((el, idx)=>`<span class='a${idx.toString()}aa'>${el}</span>`).join('')
    let time=0;
    let len = paraLetterArr.length;
    let count = 0;
    let interval;


    txt.addEventListener('keyup',(e)=>{
        e.preventDefault();
        timer.style.display='block'
        interval = setInterval(()=>{
            time++;
            timer.textContent=time < 10? '0'+ time: time;
        },500)
    },{once:true})

    txt.addEventListener('keyup', (e)=>{
        e.preventDefault();
        let txtResult = e.target.value;
        let txtResultArr = txtResult.split('');
        
        txtResultArr.map((el, idx)=>{
            const letter = textPara.querySelector(`.a${idx.toString()}aa`)
            
        if(txtResultArr.length <= len){
            if(el===paraLetterArr[idx]){
                letter.style.color = 'green';
                
            }else{
                letter.style.color = 'red';
            }
        }

            if(idx == len-1){
                score.parentElement.style.display = 'block'
                paraLetterArr.map((el, idx)=>el==txtResultArr[idx]?count++:count)
                
                let scoreVal = (count / len).toFixed(2) 

                if(scoreVal> .5){
                    score.style.color ='green'
                }else{
                    score.style.color ='red'
                }
                

                score.textContent = `${scoreVal* 100}%`;
                clearInterval(interval);

                setTimeout(()=>{
                    txtResultArr = null;
                    idx=0;
                    txt.value =''
                    score.parentElement.style.display = 'none';
                    count = 0;
                    len = null;
                    time=0;
                    timer.textContent=time < 10? '0'+ time: time;
                    getRandomQuote() 
                
                },2000)
                
            }
        })
        
    

})

}





































