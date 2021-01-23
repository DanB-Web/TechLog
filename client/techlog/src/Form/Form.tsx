import React from 'react';
import { useState, useEffect, FC } from 'react';
import { withRouter, useLocation, RouteComponentProps } from 'react-router-dom';

import { formAnimations } from '../Utils/animations';
import { IReport } from '../Utils/interfaces';

import SearchTags from './SearchTags';

import './Form.css';

// interface IForm {
//   title: string,
//   description: string,
//   steps: string[]
// }

interface FormProps {
  formSubmit : (title:string, searchTags:string[], description:string, steps:string[], pics:HTMLInputElement[]) => void,
  formPatch: (title:string, searchTags:string[], description:string, steps:string[]) => void,
  form?: IReport
}

//Note formSubmit comes from NewReport.js, and formPatch from EditReport.js
const Form : FC<FormProps & RouteComponentProps> = ( { formSubmit, formPatch, form, history } ) => {

  const [customTags, setCustomTags] = useState<string[]>([]);

  const location = useLocation();

    //Form submit handler
    const formHandler = async (event: { preventDefault: () => void; }) => {

      event.preventDefault();
      const title = String((document.getElementById('report__title__input') as unknown as HTMLInputElement)!.value);
      const searchTags = tagsHandler();
      const description = String((document.getElementById('report__description__input') as unknown as HTMLInputElement)!.value);
      const steps = stepsHandler();
      const pics: HTMLInputElement[] = [];
      document.querySelectorAll('.pics').forEach(el => pics.push(el as any));

      //Baisc form validation
      if (title === '' || searchTags.length === 0 || description === '') {
        alert('Missing fields!');
        return;
      }
      //Check what route currently on - if new, formSubmit, and if edit, formPatch
      if (location.pathname === '/new') await formSubmit(title, searchTags, description, steps, pics);
      else if (location.pathname === '/edit') await formPatch(title, searchTags, description, steps);

      //Reset tags state and redirect
      setCustomTags([]);
      history.push('/search');
    }

    //On form submit, merges checkbox tags and custom tags
    const tagsHandler = () => {

      let searchTags: string[] = [];

      //Make copy of current tags state
      const customTagsCopy = [...customTags];

      //get all populated checkboxes
      const checkBoxes = document.querySelectorAll('.search-tag__checkbox');
      checkBoxes.forEach(checkbox => {
        if ((checkbox as unknown as HTMLInputElement).checked)
          searchTags.push(String((checkbox as unknown as HTMLInputElement).value));
        }
      );

      //Get all rendered tags
      const renderedTagLI = document.querySelectorAll('.search-tag__custom');
      const renderedTags: string[] = [];
      renderedTagLI.forEach(value => renderedTags.push(value.innerHTML.substring(1)));
      //merge all tags
      searchTags = [...searchTags, ...customTagsCopy, ...renderedTags];

      return searchTags;
    }

    //Appends custom tags to DOM and updates state
    const customTagHandler = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
      const customTag : string = String((document.getElementById('custom__tag__input') as unknown as HTMLInputElement).value);
      if (!customTag) return;
      //Set tag state
      const customTagsCopy : string[]= [...customTags];
      customTagsCopy.push(customTag);
      setCustomTags(customTagsCopy);
      //Append new tag to DOM
      const newTag = document.createElement('li');
      newTag.textContent = `#${customTag}`;
      document.getElementById('custom__tag__hook')!.appendChild(newTag);
      (document.getElementById('custom__tag__input')! as unknown as HTMLInputElement).value = '' as any;
    }

    //Add steps to DOM and updates state
    const addStepHandler = (event: any) => {
      event.preventDefault();
      const customStep : string = String((document.getElementById('add__step')! as unknown as HTMLInputElement).value);
      if (customStep === '') return;
      const stepsHook = document.getElementById('report__steps__hook');
      const newStep = document.createElement('li');
      newStep.classList.add("report__steps-li");
      newStep.textContent = customStep;
      stepsHook!.appendChild(newStep);
      (document.getElementById('add__step')! as unknown as HTMLInputElement).value = '' as any;
    }

    const stepsHandler = () => {
      const steps: string[] = [];
      const stepsLi = document.querySelectorAll('.report__steps-li');
      stepsLi.forEach(step => steps.push(step.innerHTML));
      return steps;
    }

    //Event listener to remove steps from DOM
    useEffect( () => {
      document.querySelector('.report__steps')!.addEventListener('click', (event : any) => {
        if (event.target.tagName === 'LI') {
          event.target.parentNode.removeChild(event.target);
        }
      })},
    []);

    useEffect(()=>{
      //Run form animations on render
      formAnimations();
    },[]);

  return (
    <form className="form__container" onSubmit={formHandler} spellCheck="false">

      <div className="report__title">
          <label>Report Title</label>
          <input id="report__title__input"
                 name="title"
                 type="text"
                 data-testid="title"
                 defaultValue={form ? form.title : ''}>
          </input>
      </div>

      <SearchTags
        form={form}
        customTagHandler={customTagHandler}
      />

      <div className="report__description">
        <label>Description</label>
        <textarea id="report__description__input" rows={10} cols={30} defaultValue={form ? form.description : ''} data-testid="description"></textarea>
      </div>

      <div className="report__steps">
          <label>Steps</label>
          <div className="report__steps__input">
            <input id="add__step" type="text"  data-testid="step-input"></input>
            <button onClick={addStepHandler}  data-testid="add-step">ADD STEP</button>
          </div>
          <ul id="report__steps__hook">{form && form.steps.map((step, index) =>
          <li key={index}  data-testid={`step-${index}`} className="report__steps-li">{step}</li>)}</ul>
      </div>

      {location.pathname === '/new' &&
      <div className="report__uploads">
            <label>Upload Pictures</label>
            <input type="file" className="pics" accept='.png, .jpg, .jpeg'></input>
            <input type="file" className="pics" accept='.png, .jpg, .jpeg'></input>
            <input type="file" className="pics" accept='.png, .jpg, .jpeg'></input>
      </div>}

      <input className="report__submit__btn" type="submit" value="SUBMIT" data-testid="submit-form"/>

    </form>
  )
}

export default withRouter(Form);
