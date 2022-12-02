import React from 'react'

export default function Meme() {
    const[Meme,setMeme]=React.useState({
      topText:"",
      bottomText:"",
      randomImage:"https://i.imgflip.com/3oevdk.jpg"
    })
    const[allMeme,setallMeme]=React.useState([])

    React.useEffect( () => {
      fetch("https://api.imgflip.com/get_memes")
        .then(res=>res.json())
        .then(data=>setallMeme(data.data.memes))
    },[])

    function getMemeImage()
    {
        const variable=Math.floor(Math.random()*allMeme.length);
        const url =allMeme[variable].url
        setMeme(prevMeme => ({
          ...prevMeme,
          randomImage:url
        }))
    }

    function handleChange(event)
    {
      const{name,value}=event.target
      setMeme(prevMeme =>({
        ...prevMeme,
        [name]:value
      }))
    }
  return (
    <>
    <div className='meme'>
        <input placeholder='top text' 
        className='input--box' 
        type="text" 
        name='topText'
        value={Meme.topText}
        onChange={handleChange} />
                
        <input type="text"
         className='input--box' 
         placeholder='bottom text' 
         name='bottomText'
         onChange={handleChange} 
         value={Meme.bottomText}/>
        
        <button className='meme--btn' onClick={getMemeImage}>Get a new meme image</button>
    </div>
    <div className='meme--image'>
      <h2 className="meme--text top">{Meme.topText}</h2>
        <img src={Meme.randomImage} className='meme--image--' alt="" />
        <h2 className="meme--text bottom">{Meme.bottomText}</h2>
    </div>
    </>
  )
}
