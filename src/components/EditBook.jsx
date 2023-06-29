import React, {  useState } from 'react'
import './Modal.css'
import axios from 'axios'

const EditBook = ({ onClose, title, author, year, language, pages, country, link, id,setFlag }) => {
  const [auth, setAuth] = useState(author)
  const [countr, setCountr] = useState(country)
  const [lang, setLang] = useState(language)
  const [lin, setLin] = useState(link)
  const [pag, setPag] = useState(pages)
  const [yr, setYr] = useState(year)
  const [ttle, setTtle] = useState(title)

  function handleClose(e) {
    if (e.target.id === 'editModal') {
      onClose()
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    // if (
    //   auth.trim() === '' ||
    //   countr.trim() === '' ||
    //   lin.trim() === '' ||
    //   lang.trim() === '' ||
    //   pag.trim() === '' ||
    //   yr.trim() === '' ||
    //   ttle.trim() === '') return;

    axios.put(`http://68.178.162.203:8080/application-test-v1.1/books/${id}`, {
      author: auth,
      country: countr,
      language: lang,
      link: lin,
      pages: pag,
      title: ttle,
      year: yr,
    }).then(res=>{
      console.log(res.data);
      console.log(res.data.message)
      setFlag((prev) => !prev)
    }).catch(err=>{
      console.log(err.response.data.message)
    })

    setAuth('')
    setCountr('')
    setLang('')
    setLin('')
    setPag('')
    setYr('')
    setTtle('')
    onClose()
  }
  return (
    <div id='editModal' onClick={handleClose} className="modal"  >
      <div className="modal-content">
        <form onSubmit={handleSubmit} >
          Edit {title} :
          <label >author</label><input value={auth} type="text" onChange={e => setAuth(e.target.value)} /> <br />
          <label >country</label><input value={countr} type="text" onChange={e => setCountr(e.target.value)} /> <br />
          <label >language</label><input value={lang} type="text" onChange={e => setLang(e.target.value)} /> <br />
          <label >link</label><input value={lin} type="text" onChange={e => setLin(e.target.value)} /> <br />
          <label >pages</label><input value={pag} type="text" onChange={e => setPag(e.target.value)} /> <br />
          <label >title</label><input value={ttle} type="text" onChange={e => setTtle(e.target.value)} /> <br />
          <label >year</label><input value={yr} type="text" onChange={e => setYr(e.target.value)} /> <br />
          <button type='submit'>Edit</button>
          <button onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  )
}

export default EditBook
