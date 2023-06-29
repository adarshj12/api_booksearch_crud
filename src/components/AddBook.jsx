import React, { useRef } from 'react'
import './Modal.css'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const AddBook = ({ onClose, setFlag }) => {
    const authorRef = useRef()
    const countryRef = useRef()
    const languageRef = useRef()
    const linkRef = useRef()
    const pageRef = useRef()
    const yearRef = useRef()
    const titleRef = useRef()

    function handleClose(e) {
        if (e.target.id === 'editModal') {
            onClose()
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const authVal = authorRef.current.value;
        const countVal = countryRef.current.value;
        const langVal = languageRef.current.value;
        const linkVal = linkRef.current.value;
        const pageVal = pageRef.current.value;
        const yearVal = yearRef.current.value;
        const titleVal = titleRef.current.value;
        if (
            authVal.trim() === '' ||
            countVal.trim() === '' ||
            linkVal.trim() === '' ||
            langVal.trim() === '' ||
            pageVal.trim() === '' ||
            yearVal.trim() === '' ||
            titleVal.trim() === '') return;

        axios.post(`http://68.178.162.203:8080/application-test-v1.1/books`, {
            "title": titleVal,
            "author": authVal,
            "year": yearVal,
            "language": langVal,
            "country": countVal,
            "pages": pageVal,
            "link": linkVal
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            console.log({
                author: authVal,
                country: countVal,
                language: langVal,
                link: linkVal,
                pages: pageVal,
                title: titleVal,
                year: yearVal,
            })
            toast.success('book added')
            setFlag((prev) => !prev)
        }).catch(err => {
            console.log(err.response.data.message);
            toast.error(err.response.data.message)
            setFlag((prev) => !prev)
        })
        authorRef.current.value = '';
        countryRef.current.value = '';
        languageRef.current.value = '';
        linkRef.current.value = '';
        pageRef.current.value = '';
        yearRef.current.value = '';
        titleRef.current.value = '';
        onClose()
    }
    return (
        <div id='editModal' onClick={handleClose} className="modal">
            <div className="modal-content">
                <form onSubmit={handleSubmit} >
                    New Item :
                    <label >author</label><input type="text" ref={authorRef} /> <br />
                    {/* <label >id</label><input type="number" ref={idRef} /> <br /> */}
                    <label >country</label><input type="text" ref={countryRef} />  <br />
                    <label >language</label><input type="text" ref={languageRef} />  <br />
                    <label >link</label><input type="text" ref={linkRef} />  <br />
                    <label >pages</label><input type="text" ref={pageRef} />  <br />
                    <label >title</label><input type="text" ref={titleRef} />  <br />
                    <label >year</label><input type="text" ref={yearRef} /> <br />
                    <button type='submit'>add</button>
                    <button onClick={onClose}>Close</button>
                </form>
            </div>
            <Toaster />
        </div>
    )
}

export default AddBook
