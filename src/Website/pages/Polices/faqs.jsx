import React, { useEffect, useState } from 'react'
import { FiTrash } from 'react-icons/fi';
import { FaqService } from '../../../services/faqs';
import Loader from '../../components/loader';

export const Faqs = () => {
  const { getFaq, postFaq, deleteFaq } = FaqService();
  const [showAddButton, setShowAddButton] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [faqData, setFaqData] = useState({
    faqquestion: '',
    faqanswers: ''
  })

  const handleServiceDelete = (e, faqId) => {
    setIsLoading(true)
    e.preventDefault();
    // console.log("clicked")
    deleteFaq(faqId).then((res) => {
      fetchData()
    }).catch((res) => {
      console.log(res.data.data, 'error');
    }).finally(() => {
      setIsLoading(false)
    })
  }

  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = () => {
    getFaq().then((res) => {
      setFaqs(res.data.data)
    }).catch((err) => {
      console.log(err, 'error');
    })
  }

  const getInput = (e) => {
    setFaqData({ ...faqData, [e.target.name]: e.target.value })
  }

  const onFormSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    postFaq(faqData).then((res) => {
      fetchData();
      setShowAddButton(false)
      console.log(res, 'response');
    }).catch((res) => {
      console.log(res, 'error');
    }).finally(() => {
      setIsLoading(false)
    })
  }
  return (
    <section className='mainSection'>
      <div className="container">
        <div className="mainSectionWrapper">
          <div className="heading">
            <p>
              FAQS
            </p>
          </div>
          <div className="card cardForm">
            <div className="card-body">
              {
                isLoading
                  ?
                  <Loader />
                  :

                  <div className="accordion" id="accordionExample">

                    {
                      faqs.map((item, keyId) => (
                        <div className="accordion-item" key={keyId}>
                          <h2 className="accordion-header" id={`heading${keyId}`}>
                            <button className='accordionAbsoulteButton' onClick={(e) => handleServiceDelete(e, item._id)}>
                              <FiTrash />
                            </button>
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${keyId}`} aria-expanded="true" aria-controls={`collapse${keyId}`}>
                              {item.faqquestion}
                            </button>
                          </h2>
                          <div id={`collapse${keyId}`} className="accordion-collapse collapse " aria-labelledby={`heading${keyId}`} data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                              {item.faqanswers}
                            </div>
                          </div>
                        </div>
                      ))
                    }

                    {showAddButton &&
                      <form id='formFaq' onSubmit={onFormSubmit}>
                        <div className="newSectionOutter">
                          <div className="newSectionContent">
                            <p>Add Question</p>
                            <input type="text" name='faqquestion' onChange={getInput} required />
                          </div>
                          <div className="newSectionContent">
                            <p>Add Answer</p>
                            <input type="text" name='faqanswers' onChange={getInput} required />
                          </div>
                        </div>
                      </form>
                    }
                    <div className="addSectionButton">
                      {showAddButton &&
                        <button form="formFaq" type='submit'>Submit</button>
                      }
                      <button onClick={() => { setShowAddButton(true) }}>Add Section</button>
                    </div>
                  </div>
              }

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
