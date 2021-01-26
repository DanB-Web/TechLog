import React from 'react';
import { useState, useEffect, FC } from 'react';
import { withRouter, useLocation, RouteComponentProps } from 'react-router-dom';
import animations from '../Utils/animations';
import { IReport } from '../Utils/interfaces';
import SearchTags from './SearchTags';
import './Form.css';

interface FormProps {
  formSubmit : (title:string, searchTags:string[], description:string, steps:string[], pics: File[]) => void,
  formPatch: (title:string, searchTags:string[], description:string, steps:string[]) => void,
  form: IReport
}

//Note formSubmit comes from NewReport.js, and formPatch from EditReport.js
const Form : FC<FormProps & RouteComponentProps> = ( { formSubmit, formPatch, form, history } ) => {
  
  const [formData, setFormData] = useState<IReport>(form)
  const [step, setStep] = useState<string>('');
  const [tag, setTag] = useState<string>('');
  const location = useLocation();
  const addTag = (tag: string) => {
    setFormData(prevState => {
      const tags = [...prevState.tags]
      tags.push(tag);
      return {...prevState, tags};
    })
  }

  const removeTag = (tag: string) => {
    setFormData(prevState => {
      const tags = prevState.tags.filter(t => t !== tag )
      return {...prevState, tags};
    })
  }

  const handleFormChange = (event: React.FormEvent<HTMLFormElement>) => {
    const target = event.target as HTMLInputElement;
    const name = target.name;
    if (name === 'title' || name === 'description') {
      setFormData({...formData, [name]: target.value})
    } else if ( target.type === 'checkbox') {
      target.checked ? addTag(target.value) : removeTag(target.value)
    } else if (name.startsWith('file')) {
      if (target.validity.valid && target.files) {
        setFormData({...formData, [name]: target.files![0]})
      }
    }
  }

  //Form submit handler
  const formHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {title, tags, description, steps} = formData;
    //Baisc form validation
    if (title === '' || tags.length === 0 || description === '') {
      alert('Missing fields!');
      return;
    }
    
    const pics: File[] = ['file1', 'file2', 'file3'].map(filename => {
      if (formData[filename]) return formData[filename];
    }).filter(x => x);

    //Check what route currently on - if new, formSubmit, and if edit, formPatch
    if (location.pathname === '/new') await formSubmit(title, tags, description, steps, pics)
    else {await formPatch(title, tags, description, steps)}
    history.push('/search');
  }

  //Appends custom tags to DOM and updates state
  const customTagHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    addTag(tag);
    setTag('');
  }

  //Add steps to DOM and updates state
  const addStepHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (step !== '') {
      setFormData(prevState => {
        const steps = [...prevState.steps]
        steps.push(step);
        return {...prevState, steps};
      })
      setStep('');
    }
  }

  const removeStep = (idx: number) => {
    setFormData(prevState => {
      const steps = [...prevState.steps]
      steps.splice(idx,1);
      return {...prevState, steps};
    })
  }

  useEffect(()=>{
    //Run form animations on render
    animations.formAnimations();
  },[]);

  return (
    <form className="form__container" onSubmit={formHandler} onChange={handleFormChange} spellCheck="false">

      <div className="report__title">
          <label>Report Title</label>
          <input 
            id="report__title__input"
            name="title"
            onChange={()=>{}}
            type="text"
            data-testid="title"
            value={formData.title}
          />
      </div>

      <SearchTags
        tag={tag}
        setTag={setTag}
        tags={formData.tags}
        customTagHandler={customTagHandler}
        removeTag={removeTag}
      />

      <div className="report__description">
        <label>Description</label>
        <textarea 
          id="report__description__input" 
          rows={10} cols={30} 
          name="description"
          onChange={() => {}}
          value={formData.description} 
          data-testid="description"
        />
      </div>

      <div className="report__steps">
          <label>Steps</label>
          <div className="report__steps__input">
            <input 
              id="add__step" type="text"  
              data-testid="step-input" value={step} 
              onChange={(e : React.ChangeEvent<HTMLInputElement>) => setStep(e.target.value)}
            />
            <button onClick={addStepHandler}  data-testid="add-step">ADD STEP</button>
          </div>
          <ul id="report__steps__hook">
            {formData.steps.map((step, index) =>
              <li key={index} data-testid={`step-${index}`} className="report__steps-li" onClick={() => removeStep(index)}>
                {step}
              </li>)
            }
          </ul>
      </div>

      {location.pathname === '/new' &&
      <div className="report__uploads">
            <label>Upload Pictures</label>
            <input type="file" className="pics" name='file1' accept='.png, .jpg, .jpeg'></input>
            <input type="file" className="pics" name='file2' accept='.png, .jpg, .jpeg'></input>
            <input type="file" className="pics" name='file3' accept='.png, .jpg, .jpeg'></input>
      </div>}

      <input className="report__submit__btn" type="submit" value="SUBMIT" data-testid="submit-form"/>

    </form>
  )
}

export default withRouter(Form);
