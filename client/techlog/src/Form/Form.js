import React, { useState, useEffect, useRef } from 'react';

import { withRouter, useLocation } from 'react-router-dom';

import { formAnimations } from '../Utils/animations';

import FormSearchTags from './FormSearchTags';

import './Form.css';

//Note formSubmit comes from NewReport.js, and formPatch from EditReport.js
const Form = ( { formSubmit, formPatch, form, history } ) => {

  const [formContent, setFormContent] = useState({
    title: '',
    tags: [],
    searchTags: [],
    description: '',
    steps: [],
    pics: []
  });

  useEffect(() => {
    if (form) {
      setFormContent({
        ...form
      });
    }
  },[form])

  const tagInputRef = useRef();
  const stepInputRef = useRef();
  const formRef = useRef();

  const formValidator = () => {
    return !formContent.title || !formContent.description || !formContent.steps
  };

  
  // window.on("keydown", function(e){
  // if(e.keyCode === 13) {
  //     e.preventDefault();
  // }
  

  const handleFormEdit = (event, formElement) => {
    if (event.target.value.length < 1) return;
    setFormContent({
      ...formContent,
      [formElement]: event.target.value
    });
  }
  
  const location = useLocation(); // url ('/edit')

  //Form submit handler
  const formHandler = async (event) => {
    event.preventDefault();

    //Check what route currently on - if new, formSubmit, and if edit, formPatch
    const { title, searchTags, tags, description, steps, pics } = formContent;
    let collectedTags = [];
    if (searchTags) collectedTags.concat(searchTags);
    if (tags) collectedTags.concat(tags);
    if (location.pathname === '/new') await formSubmit(title, collectedTags, description, steps, pics);
    else if (location.pathname === '/edit') await formPatch(title, collectedTags, description, steps);
    
    //Reset tags state and redirect
    history.push('/search');
  }

  function addStepHandler(event) {
    event.preventDefault();
    if (formContent.steps){
      setFormContent({
        ...formContent,
        steps: [ ...formContent.steps, stepInputRef.current.value]
      });
    } else {
      setFormContent({
        ...formContent,
        steps: [stepInputRef.current.value]
      });
    }
    stepInputRef.current.value = '';
  }

  const customTagHandler = (event) => {
    if (tagInputRef.current.value < 1) return;
    event.preventDefault();
    if (formContent.searchTags) {
      setFormContent({
        ...formContent,
        searchTags: [ ...formContent.searchTags, tagInputRef.current.value]
      });
    } else {
      setFormContent({
        ...formContent,
        searchTags: [tagInputRef.current.value]
      });
    }
    tagInputRef.current.value = '';
  }

  const handleStepClick = (e, stepIndex) => {
    
    const filteredSteps = formContent.steps.filter((_, index) => index !== stepIndex)
    setFormContent({
      ...formContent,
      steps: filteredSteps
    })

  }

  const handleSearchTagClick = (e, tagIndex) => {
    if (formContent.searchTags) {
      const filteredTags = formContent.searchTags.filter((_, index) => index !== tagIndex)
      setFormContent({
        ...formContent,
        searchTags: filteredTags
      });
    }
  }

  const handlePresetTagClick = (e, tagIndex) => {
    if (formContent.tags) {
      const filteredTags = formContent.tags.filter((_, index) => index !== tagIndex)
      setFormContent({
        ...formContent,
        tags: filteredTags
      });
    }
  }
  

  useEffect(()=>{
    //Run form animations on render
    formAnimations();
  },[]);

  return (
    <form className="form__container" spellCheck="false" ref={formRef}>

      <div className="report__title">
          <label>Report Title</label>
          <input 
            id="report__title__input" 
            name="title" 
            type="text" 
            defaultValue={formContent ? formContent.title : ''}
            onChange={(e) => handleFormEdit(e, 'title')}
          >
          </input>
      </div>

      <FormSearchTags
        form={formContent}
        customTagHandler={customTagHandler}
        tagInputRef={tagInputRef}
        handleSearchTagClick={handleSearchTagClick}
        handlePresetTagClick={handlePresetTagClick}
      />

      <div className="report__description">
        <label>Description</label>
        <textarea 
          id="report__description__input" 
          rows="10" 
          cols="30" 
          defaultValue={formContent ? formContent.description : ''}
          onChange={(e) => handleFormEdit(e, 'description')}
        />
      </div>

      <div className="report__steps">
        <label htmlFor="add__step">Steps</label>
        <div className="report__steps__input">
          <input ref={stepInputRef} id="add__step" type="text"></input>
          <button onClick={addStepHandler}>ADD STEP</button>
        </div>
        <ul id="report__steps__hook">
          {formContent.steps && formContent.steps.map((step, i) => (
            <li key={i} onClick={(e) => handleStepClick(e, i)} className="report__steps-li">{step}</li>
            ))
          }
        </ul>
      </div>

      {location.pathname === '/new' &&
      <div className="report__uploads">
            <label>Upload Pictures</label>
            <input type="file" className="pics"></input>
            <input type="file" className="pics"></input>
            <input type="file" className="pics"></input>
      </div>}

      <input name="formSubmit" className="report__submit__btn" type="submit" value="SUBMIT" onClick={formHandler} disabled={formValidator()}/>

    </form>
  )
}

export default withRouter(Form);


