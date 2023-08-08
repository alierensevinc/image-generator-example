import './App.css'
import {Configuration, OpenAIApi} from "openai";
import {useState} from "react";

const configuration = new Configuration({
    apiKey: import.meta.env.VITE_MY_API_KEY
})

const openAi = new OpenAIApi(configuration);

function App() {

    const [image, setImage] = useState("https://api.time.com/wp-content/uploads/2022/11/best-inventions-2022-OpenAI-DALL-E-2.jpg");
    const [isLoading, setIsLoading] = useState(false);
    const [prompt, setPrompt] = useState('');


    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await openAi.createImage({
                prompt: prompt,
                n: 1,
                size: "512x512"
            });
            setImage(response.data.data[0].url);
            setIsLoading(false);
        } catch (e) {
            console.log(e);
            setIsLoading(false);
        }
    }

    return (
        <div class="container">
            <h1>Image Generator</h1>
            <div class="prompt-container">
                <input type="text" placeholder={"Enter your dream"} onChange={(e) => setPrompt(e.target.value)}/>
                <button onClick={fetchData}>Generate</button>
            </div>
            <div className="image-container">
                {isLoading ? (
                    <>
                        <p>Loading...</p>
                    </>
                ) : (
                    <img src={image} alt={'Random images'}/>
                )}
            </div>
        </div>
    )
}

export default App
