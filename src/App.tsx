import React,{useState} from 'react';
import './App.css';
import ColorPicker from './component/ColorPicker';


function App() {

  const[open,setOpen] = useState<boolean>(false);
  const[selectedImage, setSelectedImage] = useState<string>('');

  return (
    <div className="App">
      <div className="header">
        <h1>Icon Picker</h1>
      </div>
      <div className="main">
          {selectedImage && (
            <div className='sel-block'>
              <span> Selected icon: </span>
              <img src={selectedImage} alt='selectedImage' width={80} height={80} />
            </div>
          )}
          <button onClick={()=>setOpen((prevOpen)=>!prevOpen)} className='btn'>Choose Icons</button>
          {open && <ColorPicker rowsInOnePage={5} columnsInOnePage={5} iconHeight={80} iconWidth={80} pickerHeight={500} pickerWidth={500} setOpen={setOpen} setSelectedImage={setSelectedImage} />}
      </div>
    </div>
  );
}

export default App;
