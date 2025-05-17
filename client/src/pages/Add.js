import React, { useState } from 'react';
import '../components/styles/Add.css'
import axios from 'axios';

const Add = () => {
  const [logement,setLogement] = useState({});
  const [file,setFile] = useState([]);
  const id = sessionStorage.getItem("id");

  const handleChangeAdd = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    const files = e.target.files;
    if(files){
      setFile(Array.from(files));
      const namesArray = Array.from(files).map((file) => file.name);
      value = namesArray;
    }
    setLogement(values => ({...values, [name]:value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost/backend/add_logement.php', {
        logement: logement,
        id: id,
      });
    
      const idLogement = res.data.id_logement;

      const formData = new FormData();
      formData.append('id', idLogement);
      file.forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error('Error uploading files');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className='add'>
      <div className='add_container'>
        <div className='form_container'>
          <form className='form_inputs' onSubmit={handleSubmit}>
          <div className='input-box'>
              <label>
                <span>Title</span>
              </label>
              <input type="text" className="input" placeholder="Appartement-Maison" name='title' onChange={handleChangeAdd} required/>
            </div>
            <div className='input-box'>
              <label>
                <span>Adresse</span>
              </label>
              <input type="text" className="input" placeholder="1 Rue de Paris" name='adresse' onChange={handleChangeAdd} required/>
            </div>
            <div className='input-box two-inputs'>
              <div className='inputs'>
                <label>
                  <span>Ville</span>
                </label>
                <input type="text" className="input" placeholder="Paris" name='ville' onChange={handleChangeAdd} required/>
              </div>
              <div className='inputs'>
                <label>
                  <span>Code Postal</span>
                </label>
                <input type="text" className="input cp" placeholder="75000" name='cp' onChange={handleChangeAdd} required/>
              </div>
              <div className='inputs'>
                <label>
                  <span>Pays</span>
                </label>
                <input type="text" className="input" placeholder="France" name='pays' onChange={handleChangeAdd} required/>
              </div>
            </div>
            <div className='input-box'>
              <label>
                <span>Type de logement</span>
              </label>
              <div className='type-radio'>
                <div className='two-radio'>
                  <div className='radio-item'><input type="radio" className="radio" id='entier' value="Logement entier" name='tl' onChange={handleChangeAdd} required/><label for="entier">Logement entier</label></div>
                  <div className='radio-item'><input type="radio" className="radio" id='privée' value="Chambre privée" name='tl' onChange={handleChangeAdd} required/><label for="privée">Chambre privée</label></div>
                  {/* <div className='radio-item'><input type="radio" className="radio" id='hotel' value="Chambre d'hôtel" name='tl' onChange={handleChangeAdd} required/><label for="hotel">Chambre d'hôtel</label></div> */}
                </div>
                <div className='one-radio'>
                  <div className='radio-item'><input type="radio" className="radio" id='partager' value="Chambre partagée" name='tl' onChange={handleChangeAdd} required/><label for="partager">Chambre partagée</label></div>
                </div>
              </div>
            </div>
            <div className='input-box two-inputs'>
              <div className='inputs'>
                <label>
                  <span>Nb° de chambres</span>
                </label>
                <input type="number" className="input" placeholder="1" name='nc' onChange={handleChangeAdd} required/>
              </div>
              <div className='inputs'>
                <label>
                  <span>Nb° Personnes</span>
                </label>
                <input type="text" className="input" placeholder="1" name='np' onChange={handleChangeAdd} required/>
              </div>
            </div>
            <div className='input-box prices'>
                <label>
                  <span>Prix par nuit</span>
                </label>
                <input type="text" className="input" placeholder="100" name='pn' onChange={handleChangeAdd} required/>
                <img src='./img/svg/euro.svg' className='euro' alt='Euro'/>
              </div>
            <div className='inputs-bonus'>
              <div className='input-box'>
                <label>
                  <span>Photos</span>
                </label>
                <input type="file" className="input" name='images' onChange={handleChangeAdd} multiple required/>
              </div>
              <div className='input-box'>
                <label><span>Description</span>
                </label>
                <textarea className="input description" placeholder="..." name='descri' onChange={handleChangeAdd} required/>
              </div>
            </div>
            <input type="submit" className="submit" name='add'  value="Ajouter" required/>
          </form>
        </div>
        <div className='background_img'>
          <img src='./img/add.jpg' alt='#'/>
        </div>
      </div>
    </div>
  );
}

export default Add;