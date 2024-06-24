const select=document.querySelectorAll("select");
const translate=document.querySelector("button");
let text_from=document.querySelector(".input_from");
let text_to=document.querySelector(".input_to");
let icons=document.querySelectorAll(".icons");

const exchangeicon=document.querySelector(".exchange");
select.forEach((tag,id) =>{
    for(const code in countries) {
        let selected;
        if(id==0&&code=="en-GB"){
            selected="selected";
        } 
        else if(id==1&&code=="hi-IN"){
            selected="selected";
        }
        let option=`<option value="${code}" ${selected} >${countries[code]}</option>`;
        tag.insertAdjacentHTML("beforeend",option);
    }
});
async function translateinfo(){
    let text=text_from.value;
    if(!text) return;
    let from_lang=select[0].value;
    let to_lang=select[1].value;
    console.log(text,from_lang,to_lang);
    const url=`https://api.mymemory.translated.net/get?q=${text}&langpair=${from_lang}|${to_lang}`;
    let promise=await fetch(url);
    let response=await promise.json();
    text_to.value=response.responseData.translatedText;
}
translate.addEventListener("click",()=>
{
    translateinfo();
})
exchangeicon.addEventListener("click",()=>
{
    let imm_text=text_from.value;
    text_from.value=text_to.value;
    text_to.value=imm_text;
    let temp_lang=select[0].value;
    select[0].value=select[1].value;
    select[1].value=temp_lang;
});

icons.forEach(icon=>{
    icon.addEventListener("click",({target})=>{
            if(target.classList.contains("fa-copy")){
                if(target.id=="from"){
                    navigator.clipboard.writeText(text_from.value);
                }
                else{
                    navigator.clipboard.writeText(text_to.value);
                }
            }
            else{
                if(target.id=="from"){
                    utterance=new SpeechSynthesisUtterance(text_from.value);
                    utterance.lang=select[0].value;
                }
                else{
                    utterance=new SpeechSynthesisUtterance(text_to.value);
                    utterance.lang=select[1].value;
            
                }
                speechSynthesis.speak(utterance);
            }
        });
})
