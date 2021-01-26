import * as React from 'react';
import './SearchTags.css'

interface SearchTagsProps {
  tag: string,
  setTag: (tag: string) => void,
  tags: string[],
  removeTag: (tag: string) => void,
  customTagHandler: (event: React.MouseEvent<HTMLButtonElement>) => void,
}

const SearchTags : React.FC<SearchTagsProps> = ({tag, setTag, removeTag, tags, customTagHandler}) => {

  return(
    <div className="report__search-tags">
      <div className="report__search-tags__fixed">
        <label>Search Tags</label>

        <p>Manufacturer</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          {
            ['Kystdesign', 'Schilling Robotics', 'Reach'].map(man =>      
              <div key={man} className="search-tag__fixed">
                <p>{man}</p>
                <input onChange={()=>{}} type="checkbox" className="search-tag__checkbox" value={man} checked={tags.includes(man)}/>
              </div>
              )
          }
        </div>
        
        <p>Item</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          {
            ['ROV', 'TMS', 'Winch', 'Sensor'].map(item => 
              <div key={item} className="search-tag__fixed">
                <p>{item}</p>
                <input onChange={()=>{}} type="checkbox" className="search-tag__checkbox" value={item} checked={tags.includes(item)}/>
              </div>
              )
          }
        </div>

        <p>Equipment</p>
        <hr></hr>
        <div className="search-tag__fixed__section">
          {
            ['Manipulator', 'Gyro', 'Altimeter', 'Motor', 'Pump'].map(equip => 
              <div key={equip} className="search-tag__fixed">
                <p>{equip}</p>
                <input onChange={()=>{}} type="checkbox" className="search-tag__checkbox" value={equip} checked={tags.includes(equip)}/>
              </div>
              )
          }
        </div>

      </div>

      <div className="report__search-tags__custom">
        {tags.length > 0 ? <label>Tags</label> : <label>Custom Tags</label>}
        <ul id="custom__tag__hook">{tags.length > 0  && tags.map((tag, index) =>
          <li key={index} className="search-tag__custom" onClick={() => removeTag(tag)}>#{tag}</li>)}
        </ul>
        <div className="report__search-tags__input">
          <input id="custom__tag__input" data-testid="custom-search-tag" name="custom__tag" type="text" value={tag} onChange={e => setTag(e.target.value)}/>
          <button onClick={customTagHandler}>ADD TAG</button>
        </div>
      </div>
    </div>
  )

}

export default SearchTags;
