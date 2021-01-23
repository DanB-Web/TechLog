import * as React from 'react';
import { useEffect } from 'react';
import { IReport } from '../Utils/interfaces';
import './SearchTags.css'


interface SearchTagsProps {
  form: IReport | undefined,
  customTagHandler: (event: {preventDefault : () => void}) => void,
}

const SearchTags : React.FC<SearchTagsProps> = ({form, customTagHandler}) => {

  //Event listener to remove tags
  useEffect( () => {
    document.querySelector('.report__search-tags')!.addEventListener('click', (event: any) => {
      if (event.target.tagName === 'LI') event.target.parentNode.removeChild(event.target);
    })},
  []);

  return(
    <div className="report__search-tags">
    {form ? null :

    <div className="report__search-tags__fixed">

    <label>Search Tags</label>

        <p>Manufacturer</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>Kystdesign</p>
            <input type="checkbox" className="search-tag__checkbox" value="kyst"/>
          </div>
          <div className="search-tag__fixed">
            <p>Schilling Robotics</p>
            <input type="checkbox" className="search-tag__checkbox" value="schilling"/>
          </div>
          <div className="search-tag__fixed">
            <p>Reach</p>
            <input type="checkbox" className="search-tag__checkbox" value="reach"/>
          </div>
        </div>

        <p>Item</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          <div className="search-tag__fixed">
            <p>ROV</p>
            <input type="checkbox" className="search-tag__checkbox" value="ROV"/>
          </div>
          <div className="search-tag__fixed">
            <p>TMS</p>
            <input type="checkbox" className="search-tag__checkbox" value="TMS"/>
          </div>
          <div className="search-tag__fixed">
            <p>Winch</p>
            <input type="checkbox" className="search-tag__checkbox" value="winch"/>
          </div>
          <div className="search-tag__fixed">
            <p>Sensor</p>
            <input type="checkbox" className="search-tag__checkbox" value="sensor"/>
          </div>
        </div>

        <p>Equipment</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
        <div className="search-tag__fixed">
            <p>Manipulator</p>
            <input type="checkbox" className="search-tag__checkbox" value="manipulator"/>
          </div>
          <div className="search-tag__fixed">
            <p>Gyro</p>
            <input type="checkbox" className="search-tag__checkbox" value="gyro"/>
          </div>
          <div className="search-tag__fixed">
            <p>Altimeter</p>
            <input type="checkbox" className="search-tag__checkbox" value="altimeter"/>
          </div>
          <div className="search-tag__fixed">
            <p>Motor</p>
            <input type="checkbox" className="search-tag__checkbox" value="motor"/>
          </div>
          <div className="search-tag__fixed">
            <p>Pump</p>
            <input type="checkbox" className="search-tag__checkbox" value="pump"/>
          </div>
        </div>

    </div>}

    <div className="report__search-tags__custom">
      {form ? <label>Tags</label> : <label>Custom Tags</label>}
      <ul id="custom__tag__hook">{form && form.tags.map((tag, index) =>
        <li key={index} className="search-tag__custom">#{tag}</li>)}
      </ul>
      <div className="report__search-tags__input">
        <input id="custom__tag__input" name="custom__tag" type="text"></input>
        <button onClick={customTagHandler}>ADD TAG</button>
      </div>
    </div>

  </div>
  )

}

export default SearchTags;
