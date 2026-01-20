import {useState} from 'react';
import Snowfall from 'react-snowfall'
import Spinner from './Spinner';
import WelcomeMessage from './WelcomeMessage';
const Card =()=>{
    const [Description, setDescription]=useState("");
    const [Temperature, setTemparature]=useState("");
    const [text, setText]=useState("");
    const [Loading, setLoading]=useState(false);
    const [welcomeMessage, setWelcomeMessage]=useState(false);
    
    const checkWeather=async()=>{
        
        const cityRegex = /^[A-Za-z\u00C0-\u017F]+(?:[\s\-'[A-Za-z\u00C0-\u017F]+)*$/;
        if (!cityRegex.test(text)) {
            alert("Please enter a valid city name");
            return;
        }
        else{
            setWelcomeMessage(true);
            setLoading(true);
            
        }
        const response = await fetch(`https://goweather.xyz/weather/${text}`);
        const data = await response.json();
        setDescription("Weather: " + data.description);
       
        setTemparature("Temperature: " + data.temperature);
        setLoading(false);
        
        setText('')
        setTimeout(() => {
            setDescription("");
            setTemparature("");
        }, 5000);
        
    }
    return (
        <>
        <Snowfall/>
        <section className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 justify-center items-center h-150 w-75 bg-[#FEEE91] p-4 rounded-lg shadow-lg text-[#061E29] font-bold  " id='card'>
                {welcomeMessage && <WelcomeMessage />}
                <img src='/sun.svg' className='h-30 w-30'/>
                <h1 className='text-[#061E29] text-2xl '>Weather Checker</h1>
                <div className=' p-4 rounded-lg w-60 ' id='content'>
                <input type="text" name="city" id="city" placeholder="Enter city"required className='placeholder-[#5fa8c7] bg-white text-[#061E29] rounded-md text-center h-7 w-full border border-[#8CE4FF]  focus:border-[#FFA239]  focus:ring-2  focus:ring-[#FFA239]/40 outline-none transition-all duration-200' value={text} onChange={(e)=> setText(e.target.value)} /> 
                {Loading && <Spinner />}
                {!Loading && (
                <>
                <p className='text-center ' id='weather'> {Description}</p>
                <p className='text-center ' id='temp'>{Temperature}</p>
                </>
                )}
                </div>
                
                
                <button className="bg-[#FFA239] hover:bg-[#FFB347] text-[#061E29] cursor-pointer font-bold py-2 px-4 rounded"onClick={checkWeather}>Check Weather</button>
            </div>
        </section>
        
        </>
    )
}

export default Card;