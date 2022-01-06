import React, { useEffect, useState, useRef } from 'react'

import copyImg from '../img/copy-icon.svg'
import '../styles/randomcolor.scss'

interface Color {
  hex: string
}



const RandomColor = () => {
  const [color, setColor] = useState<Color>({} as Color);
  const [updateColor, setUpdateColor] = useState(false);
  const [copySucess, setCopySucess] = useState('');
  const [isLoading, setIsLoading] = useState(true)
  const textRef = useRef<HTMLDivElement>(null);
  const colorRef = useRef<HTMLDivElement>(null);

  console.log(color)

  document.body.onkeyup = function(e) {
    if(e.keyCode === 32){
      setUpdateColor(!updateColor)
    }
  }

  function setStyle(color: string) {
    if(colorRef.current) {
      colorRef.current.style.backgroundColor = color
    }
  }

  function copyToClipboard() {
    if(textRef.current){
      navigator.clipboard.writeText(textRef.current.innerText) 
    }
  
    setCopySucess('Copied!')
  }

  useEffect(() => {

    const fetchItems = async () => {
      const url = 'https://x-colors.herokuapp.com/api/random'
      const response = await fetch(url)
      const json = await response.json()
      
      setColor(json)
      setStyle(json.hex)
      setCopySucess('')  
      setIsLoading(false)
    }

    fetchItems()

  }, [updateColor]);

  return (
    <div className="rc-wrapper">
      <div className="rc-header">
        <h1 className="rc-title" >Random Color Generator</h1>
        <p className="rc-sub-title">Press the spacebar to generate a new color!</p>
      </div>

      {isLoading && <span>Loading...</span>}
      <div className="rc-picker">
        <div className="rc-color" ref={colorRef}></div>
        <div className="rc-footer">
          <div className="rc-hex" ref={textRef}>{color.hex}</div>
          <div className="rc-copy" onClick={copyToClipboard}>
            <img src={copyImg} alt="Color"/>
          </div>
        </div>
        <span className={`rc-copy-sucess ${copySucess && 'show'}`} >{copySucess}</span>
      </div>
    </div>
  )
}

export default RandomColor
