import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser,FaLock,FaEnvelope,FaRegUser,FaPhone } from "react-icons/fa";
import { Oval } from 'react-loader-spinner';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '../components/styles/Connexion.css'


const Connexion = () => {
  const navigate = useNavigate();

  const [action, setAction] = useState('');
  const [inscription, setInscription] = useState({});
  const [connexion, setConnexion] = useState({});
  const [loading,setLoading] = useState(false);
  let errors = []

  const handleChangeInscrip = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInscription(values => ({...values,[name]:value}));
  }

  const handleChangeConn = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setConnexion(values => ({...values,[name]:value}));
  }

  // const validateMdp = (mdp) => {
  //   if (mdp.length < 8) {
  //     errors.push('Le mot de passe doit contenir au moins 8 caractères.');
  //   }
  //   if (!/[A-Z]/.test(mdp)) {
  //     errors.push('Le mot de passe doit contenir au moins une lettre majuscule.');
  //   }
  //   if (!/[a-z]/.test(mdp)) {
  //     errors.push('Le mot de passe doit contenir au moins une lettre minuscule.');
  //   }
  //   if (!/[0-9]/.test(mdp)) {
  //     errors.push('Le mot de passe doit contenir au moins un chiffre.');
  //   }
  //   if (!/[!@#$%^&*(),.?":{}|<>]/.test(mdp)) {
  //     errors.push('Le mot de passe doit contenir au moins un caractère spécial.');
  //   }

  //   if(errors.length === 0){
  //     return mdp;
  //   } else {
  //     return errors;
  //   }
  // }

  const handleSubmitInscrip = (e) => {
    e.preventDefault();
    // const validMdp = validateMdp(inscription.mdp);

    axios.post('http://localhost/backend/create_user.php', inscription)
    .then(res => {
      console.log(res.data);
      if(res.data.success){
        toast.success("L'inscription s'est bien effectuée!", {
          position: "bottom-left",
          autoClose: 2000
        });
        setInscription({
          nom: '',
          prenom: '',
          email: '',
          mdp: '',
          tel: '',
          statut: ''
        });
      }
    });
    setAction('');
    if(errors.length){
      errors = [];
    }
  }

  const handleSubmitConn = (e) => {
    const buttonConn = document.querySelector('.connexion-button')
    e.preventDefault();
    axios.post('http://localhost/backend/connexion.php', connexion)
    .then(response => {
      console.log(response.data);
      if(response.data.success) {
        setTimeout(() => {
          navigate('/');
          window.location.reload();
        },1000);

        sessionStorage.setItem("nom", response.data.nom);
        sessionStorage.setItem("prenom", response.data.prenom);
        sessionStorage.setItem("id", response.data.id);
        sessionStorage.setItem("statut", response.data.statut);
      } else if (response.data.wrong_mdp) {
        setTimeout(() => {
          setLoading(false);
          buttonConn.style.display = "block";
        },2000);

        showErorToastMdp();
      } else if (!response.data.success) {
        setTimeout(() => {
          setLoading(false);
          buttonConn.style.display = "block";
        },2000);
        
        showErorToast();
      }
    })

    setLoading(true);
    buttonConn.style.display = "none";
  }

  const showErorToast = () => {
    toast.error("Email ou mot de passe incorrect", {
      position: "top-center",
      className: "toast-error",
      autoClose: 1500
    });
  }

  const showErorToastMdp = () => {
    toast.error("Votre mot de passe est incorrect, Veuillez réesayer", {
      position: "top-center",
      className: "toast-error",
      autoClose: 1500
    });
  }

  const inscriptionLink = () => {
    setAction(' active');
  }

  const connexionLink = () => {
    setAction('');
  }

  // eslint-disable-next-line 
  // if(inscription.statut == ''){
  //   console.log('test');
  // }

  return (
    <div className="body-connexion">
      <div className={`wrapper ${action}`}>
        <div className="connexion">
          <div className="container" >
            <form onSubmit={handleSubmitConn}>
              <h1>Connexion</h1>
              <div className="input-box">
                <input type="text" className="input" placeholder="email@domaine.com" name='email' onChange={handleChangeConn} required/>
                <FaUser className='icon'/>
              </div>
              <div className="input-box">
                <input type="password" className="input" placeholder="Mot de passe" name='mdp' onChange={handleChangeConn} required/>
                <FaLock className='icon'/>
              </div>
              <button type='submit' className='connexion-button'>Connexion</button>
              <Oval visible={loading} height="60" width="50" color="#e7eaf6" secondaryColor="#a2a8d3" ariaLabel="oval-loading" />
              <div className="inscription-link">
                <p>Pas de compte ? <a href='// eslint-disable-next-line#' onClick={inscriptionLink}>Inscrivez-vous</a></p>
              </div>
            </form>
          </div>
        </div>
        <div className="inscription">
          <div className="container" >
            <form onSubmit={handleSubmitInscrip}>
              <h1>Inscription</h1>
              <div className="input-box">
                <input type="text" className="input" placeholder="Nom" value={inscription.nom} name='nom' onChange={handleChangeInscrip} required/>
                <FaUser className='icon'/>
              </div>
              <div className="input-box">
                <input type="text" className="input" placeholder="Prénom" value={inscription.prenom} name='prenom' onChange={handleChangeInscrip} required/>
                <FaRegUser className='icon'/>
              </div>
              <div className="input-box">
                <input type="text" className="input" placeholder="Email" value={inscription.email} name='email' onChange={handleChangeInscrip} required/>
                <FaEnvelope className='icon'/>
              </div>
              <div className="input-box">
                <input type="password" className="input" placeholder="Mots de passe" value={inscription.mdp} name='mdp' onChange={handleChangeInscrip} required/>
                <FaLock className='icon'/>
              </div>
              <div className="input-box">
                <input type="tel" className="input" placeholder="Téléphone" name='tel' value={inscription.tel} onChange={handleChangeInscrip} required/>
                <FaPhone className='icon'/>
              </div>
              <div className='select-box'>
                <label>Vous etes :</label>
                <input type='radio' name='statut' value="propi" onChange={handleChangeInscrip}/><label>Propriètaire</label>
                <input type='radio' name='statut'value="loca" onChange={handleChangeInscrip}/><label>Locataire</label>
              </div>
              <button type='submit' className='connexion-button'>Inscription
              </button>
              <div className="inscription-link">
                <p>Vous avez un compte ? <a href='// eslint-disable-next-line#' onClick={connexionLink}>Connectez-vous</a></p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Connexion;
