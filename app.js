/* =========================================================
   MATRID v1.0
   Lógica completa:
   - Rotores manuales
   - Teclado visual
   - Teclado físico
   - SHIFT
   - Luces A-Z
   - Generación de contraseña
   - Copiar
   ========================================================= */

const ROMAN = ["I","II","III","IV","V"];

const CHARACTERS =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    "abcdefghijklmnopqrstuvwxyz" +
    "0123456789" +
    "!@#$%&*?+-_=";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%&*?+-_=";

const Matrid = {
    rotorPositions:[0,1,2],
    password:"",
    processing:false,
    shift:false
};

const dom = {
    rotorDisc1:document.getElementById("rotorDisc1"),
    rotorDisc2:document.getElementById("rotorDisc2"),
    rotorDisc3:document.getElementById("rotorDisc3"),

    rotorLabel1:document.getElementById("rotorLabel1"),
    rotorLabel2:document.getElementById("rotorLabel2"),
    rotorLabel3:document.getElementById("rotorLabel3"),

    input:document.getElementById("inputDisplay"),
    password:document.getElementById("passwordDisplay"),
    length:document.getElementById("lengthSelect"),

    generate:document.getElementById("generateButton"),
    copy:document.getElementById("copyButton"),

    status:document.getElementById("statusText"),
    led:document.querySelector(".status-led"),

    shift:document.getElementById("shiftKey"),
    keys:[...document.querySelectorAll(".key[data-key]")],
    lights:[...document.querySelectorAll(".character-light[data-light-key]")]
};

const Sounds = {
    click:new Audio("assets/click.mp3"),
    finish:new Audio("assets/finish.mp3")
};

Sounds.click.volume=.35;
Sounds.finish.volume=.50;

function play(sound){
    sound.pause();
    sound.currentTime=0;
    sound.play().catch(()=>{});
}

/* =========================================================
   INICIO
   ========================================================= */

function initialize(){
    initializeRotors();
    initializeButtons();
    initializeKeyboard();
    initializePhysicalKeyboard();
    initializeInputEvents();
    loadConfiguration();

    updateRotorLabels();
    updateRotorRotation();
    updateShiftVisual();

    console.log("MATRID v1.0 iniciado");
}

/* =========================================================
   ROTORES
   ========================================================= */

function initializeRotors(){
    dom.rotorDisc1.addEventListener("click",()=>rotateRotor(0));
    dom.rotorDisc2.addEventListener("click",()=>rotateRotor(1));
    dom.rotorDisc3.addEventListener("click",()=>rotateRotor(2));
}

function rotateRotor(index){

    if(Matrid.processing){
        return;
    }

    Matrid.rotorPositions[index]++;

    if(Matrid.rotorPositions[index] >= ROMAN.length){
        Matrid.rotorPositions[index] = 0;
    }

    updateRotorLabels();

    animateRotor(index);

    saveConfiguration();

    play(Sounds.click);
}

function animateRotor(index){

    const rotors = [
        dom.rotorDisc1,
        dom.rotorDisc2,
        dom.rotorDisc3
    ];

    const rotor = rotors[index];

    if(!rotor){
        return;
    }

    rotor.classList.remove("rotor-moving");

    void rotor.offsetWidth;

    rotor.classList.add("rotor-moving");

}

function updateRotorLabels(){
    dom.rotorLabel1.textContent=ROMAN[Matrid.rotorPositions[0]];
    dom.rotorLabel2.textContent=ROMAN[Matrid.rotorPositions[1]];
    dom.rotorLabel3.textContent=ROMAN[Matrid.rotorPositions[2]];

    dom.rotorDisc1.querySelector(".rotor-center").textContent=ROMAN[Matrid.rotorPositions[0]];
    dom.rotorDisc2.querySelector(".rotor-center").textContent=ROMAN[Matrid.rotorPositions[1]];
    dom.rotorDisc3.querySelector(".rotor-center").textContent=ROMAN[Matrid.rotorPositions[2]];
}

function updateRotorRotation(){

    const rotors = [
        dom.rotorDisc1,
        dom.rotorDisc2,
        dom.rotorDisc3
    ];

    rotors.forEach((rotor,index)=>{

        rotor.classList.remove("rotor-moving");

        /*
         * Forzamos al navegador a recalcular
         * la animación para que funcione
         * cada vez que se pulsa.
         */
        void rotor.offsetWidth;

        rotor.classList.add("rotor-moving");

    });

}

/* =========================================================
   BOTONES
   ========================================================= */

function initializeButtons(){
    dom.generate.addEventListener("click",generatePassword);
    dom.copy.addEventListener("click",copyPassword);

    dom.shift.addEventListener("click",()=>{
        toggleShift();
        play(Sounds.click);
    });
}

function toggleShift(){
    Matrid.shift=!Matrid.shift;
    updateShiftVisual();
}

function updateShiftVisual(){
    dom.shift.classList.toggle("shift-on",Matrid.shift);

    dom.keys.forEach(key=>{
        const value=key.dataset.key;

        if(/^[A-Z]$/.test(value)){
            key.textContent=Matrid.shift ? value : value.toLowerCase();
        }
    });
}

/* =========================================================
   TECLADO VISUAL
   ========================================================= */

function initializeKeyboard(){
    dom.keys.forEach(key=>{
        key.addEventListener("mousedown",event=>{
            event.preventDefault();
        });

        key.addEventListener("click",()=>{
            const value=key.dataset.key;

            if(value==="SHIFT"){
                return;
            }

            pressCharacter(value);
        });
    });
}

function pressCharacter(value){
    if(Matrid.processing){
        return;
    }

    if(value.length!==1){
        return;
    }

    let character=value;

    if(/^[A-Z]$/.test(character)){
        character=Matrid.shift
            ? character
            : character.toLowerCase();
    }

    insertCharacter(character);
    flashKey(value);
    flashLight(character);
    play(Sounds.click);
}

function insertCharacter(character){
    const start=dom.input.selectionStart ?? dom.input.value.length;
    const end=dom.input.selectionEnd ?? dom.input.value.length;

    const before=dom.input.value.slice(0,start);
    const after=dom.input.value.slice(end);

    dom.input.value=before+character+after;

    const position=start+character.length;

    dom.input.focus();
    dom.input.setSelectionRange(position,position);

    updateInputLights();
}

function flashKey(value){
    const key=dom.keys.find(item=>item.dataset.key===value);

    if(!key){
        return;
    }

    key.classList.add("active","lit");

    clearTimeout(key._flashTimer);

    key._flashTimer=setTimeout(()=>{
        key.classList.remove("active","lit");
    },180);
}

function flashLight(character){
    const letter=character.toUpperCase();

    if(!/^[A-Z]$/.test(letter)){
        return;
    }

    const light=dom.lights.find(item=>item.dataset.lightKey===letter);

    if(!light){
        return;
    }

    light.classList.add("active");

    clearTimeout(light._flashTimer);

    light._flashTimer=setTimeout(()=>{
        light.classList.remove("active");
    },350);
}

function updateInputLights(){
    dom.lights.forEach(light=>{
        light.classList.remove("active");
    });
}

/* =========================================================
   TECLADO FÍSICO
   ========================================================= */

function initializePhysicalKeyboard(){
    document.addEventListener("keydown",event=>{
        if(Matrid.processing){
            return;
        }

        /*
         * Si el usuario está escribiendo directamente en el input,
         * dejamos que el navegador gestione las teclas normales.
         * Nosotros solamente controlamos las luces.
         */
        if(document.activeElement===dom.input){
            if(event.key==="Enter"){
                event.preventDefault();
                generatePassword();
                return;
            }

            handlePhysicalLight(event.key);
            return;
        }

        const key=event.key;

        if(key==="Shift"){
            Matrid.shift=true;
            updateShiftVisual();
            return;
        }

        if(key==="Enter"){
            generatePassword();
            return;
        }

        if(key==="Backspace"){
            removeLastCharacter();
            play(Sounds.click);
            return;
        }

        if(key==="Delete"){
            dom.input.value="";
            updateInputLights();
            play(Sounds.click);
            return;
        }

        const normalized=normalizePhysicalCharacter(key);

        if(normalized){
            event.preventDefault();
            insertCharacter(normalized);
            flashKey(normalized.toUpperCase());
            flashLight(normalized);
            play(Sounds.click);
        }
    });

    document.addEventListener("keyup",event=>{
        if(event.key==="Shift"){
            /*
             * SHIFT físico funciona como una tecla real.
             * No mantenemos el modo activado al soltarla.
             */
            if(Matrid.shift){
                Matrid.shift=false;
                updateShiftVisual();
            }
        }
    });
}

function normalizePhysicalCharacter(key){
    if(/^[a-zA-Z]$/.test(key)){
        return Matrid.shift ? key.toUpperCase() : key.toLowerCase();
    }

    if(/^[0-9]$/.test(key)){
        return key;
    }

    if(SYMBOLS.includes(key)){
        return key;
    }

    return null;
}

function handlePhysicalLight(key){
    if(/^[a-zA-Z]$/.test(key)){
        flashLight(key);
    }
}

function removeLastCharacter(){
    const start=dom.input.selectionStart ?? dom.input.value.length;
    const end=dom.input.selectionEnd ?? dom.input.value.length;

    if(start!==end){
        dom.input.value=
            dom.input.value.slice(0,start)+
            dom.input.value.slice(end);

        dom.input.setSelectionRange(start,start);
    }
    else if(start>0){
        dom.input.value=
            dom.input.value.slice(0,start-1)+
            dom.input.value.slice(start);

        dom.input.setSelectionRange(start-1,start-1);
    }

    updateInputLights();
}

/* =========================================================
   ENTRADA
   ========================================================= */

function initializeInputEvents(){
    dom.input.addEventListener("input",()=>{
        /*
         * El teclado físico normal del navegador sigue funcionando.
         * Aquí actualizamos la lámpara de la última letra introducida.
         */
        const value=dom.input.value;

        if(value.length>0){
            flashLight(value[value.length-1]);
        }
    });

    dom.input.addEventListener("keydown",event=>{
        if(event.key==="Enter"){
            event.preventDefault();
            generatePassword();
        }
    });

    dom.length.addEventListener("change",saveConfiguration);
}

/* =========================================================
   GENERACIÓN
   ========================================================= */

function getInputText(){
    return dom.input.value.trim();
}

function getPasswordLength(){
    return parseInt(dom.length.value,10);
}

function getRotorKey(){
    return Matrid.rotorPositions.join("-");
}

function buildSeed(){
    return [
        getInputText(),
        getRotorKey(),
        getPasswordLength()
    ].join("|");
}

function validateInput(){
    if(getInputText().length===0){
        alert("Introduce una palabra.");
        dom.input.focus();
        return false;
    }

    return true;
}

function setProcessing(processing){
    Matrid.processing=processing;

    if(processing){
        dom.status.textContent="PROCESSING";
        dom.led.classList.remove("online");
        dom.led.classList.add("processing");
        dom.generate.disabled=true;
    }
    else{
        dom.status.textContent="SYSTEM READY";
        dom.led.classList.remove("processing");
        dom.led.classList.add("online");
        dom.generate.disabled=false;
    }
}

async function generatePassword(){
    if(Matrid.processing){
        return;
    }

    if(!validateInput()){
        return;
    }

    setProcessing(true);

    try{
        const seed=buildSeed();
        const password=await createPassword(seed);

        Matrid.password=password;

        await showPassword(password);

        play(Sounds.finish);
    }
    catch(error){
        console.error(error);
        dom.status.textContent="ERROR";
        alert("Error generando la contraseña.");
    }
    finally{
        setProcessing(false);
    }
}

async function createPassword(seed){
    const length=getPasswordLength();

    const bytes=await generateBytes(
        seed,
        length+64
    );

    let password="";

    for(let i=0;i<length;i++){
        password+=CHARACTERS[
            bytes[i]%CHARACTERS.length
        ];
    }

    return ensureComplexity(password,bytes);
}

async function generateBytes(seed,length){
    const result=[];
    let counter=0;

    /*
     * crypto.subtle no está disponible en algunos navegadores cuando
     * index.html se abre directamente con file://. MATRID debe seguir
     * funcionando en ese caso, por lo que usamos SHA-256 cuando está
     * disponible y un generador determinista local como respaldo.
     */
    if(
        window.crypto &&
        window.crypto.subtle &&
        typeof TextEncoder !== "undefined"
    ){
        const encoder=new TextEncoder();

        while(result.length<length){
            const data=encoder.encode(seed+"|"+counter);
            const hash=await window.crypto.subtle.digest("SHA-256",data);

            result.push(...new Uint8Array(hash));
            counter++;
        }

        return result;
    }

    /* Fallback para abrir el proyecto directamente desde disco. */
    let state=0x811c9dc5;
    const text=seed;

    while(result.length<length){
        const block=text+"|"+counter;

        for(let i=0;i<block.length;i++){
            state^=block.charCodeAt(i);
            state=Math.imul(state,16777619);
            state+=(state<<13);
            state^=state>>>7;
            state+=(state<<3);
            state^=state>>>17;
            state+=(state<<5);
            state|=0;
        }

        for(let i=0;i<32;i++){
            state^=state>>>16;
            state=Math.imul(state,0x45d9f3b);
            state^=state>>>16;
            state=Math.imul(state,0x45d9f3b);
            state^=state>>>16;
            result.push(state&255);
        }

        counter++;
    }

    return result;
}

function ensureComplexity(password,bytes){
    if(password.length<4){
        return password;
    }

    const result=password.split("");

    if(!/[A-Z]/.test(password)){
        result[0]=UPPER[bytes[40]%UPPER.length];
    }

    if(!/[a-z]/.test(password)){
        result[1]=LOWER[bytes[41]%LOWER.length];
    }

    if(!/[0-9]/.test(password)){
        result[2]=NUMBERS[bytes[42]%NUMBERS.length];
    }

    if(!/[!@#$%&*?+\-_=]/.test(password)){
        result[3]=SYMBOLS[bytes[43]%SYMBOLS.length];
    }

    return result.join("");
}

async function showPassword(password){
    dom.password.textContent="";

    for(const character of password){
        dom.password.textContent+=character;
        await sleep(35);
    }
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

/* =========================================================
   COPIAR
   ========================================================= */

async function copyPassword(){
    if(Matrid.password===""){
        return;
    }

    try{
        await navigator.clipboard.writeText(Matrid.password);

        dom.copy.disabled=true;
        dom.copy.textContent="✓ COPIADA";

        setTimeout(()=>{
            dom.copy.disabled=false;
            dom.copy.textContent="COPIAR";
        },1500);
    }
    catch(error){
        /* Fallback para navegadores que bloquean Clipboard API en file:// */
        try{
            const helper=document.createElement("textarea");
            helper.value=Matrid.password;
            helper.style.position="fixed";
            helper.style.left="-9999px";
            document.body.appendChild(helper);
            helper.focus();
            helper.select();
            document.execCommand("copy");
            helper.remove();

            dom.copy.disabled=true;
            dom.copy.textContent="✓ COPIADA";

            setTimeout(()=>{
                dom.copy.disabled=false;
                dom.copy.textContent="COPIAR";
            },1500);
        }
        catch(fallbackError){
            console.error(fallbackError);
            alert("No se pudo copiar la contraseña.");
        }
    }
}

/* =========================================================
   CONFIGURACIÓN DE ROTORES
   ========================================================= */

function saveConfiguration(){
    localStorage.setItem(
        "matrid",
        JSON.stringify({
            rotors:Matrid.rotorPositions,
            length:getPasswordLength()
        })
    );
}

function loadConfiguration(){
    try{
        const data=localStorage.getItem("matrid");

        if(!data){
            return;
        }

        const config=JSON.parse(data);

        if(
            Array.isArray(config.rotors) &&
            config.rotors.length===3
        ){
            Matrid.rotorPositions=config.rotors.map(
                value=>Math.max(0,Math.min(4,parseInt(value,10)||0))
            );
        }

        if(config.length){
            dom.length.value=String(config.length);
        }
    }
    catch(error){
        console.warn("No se pudo cargar la configuración.",error);
    }
}

/* =========================================================
   ARRANQUE
   ========================================================= */

window.addEventListener(
    "DOMContentLoaded",
    initialize
);
