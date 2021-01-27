import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './styles.css';

import {
  FiStar,
  FiTrash2
} from  'react-icons/fi';

import {
  BiPlanet
} from  'react-icons/bi';

function Starships(props : any) {
  const [ships, setShips] = useState<any>([]);
  const [favShips, setFavShips] = useState<any>([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/starships/').then(response => {
      setShips(response.data.results);
    })
  }, []);

  const addToFav = useCallback((newFavorite: string) => {
    if (favShips.indexOf(newFavorite) < 0) {
      setFavShips((favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite ]);
    }
  }, [favShips]);

  const removeFromFav = useCallback((oldFavorite: string) => {
    setFavShips(
      (favPrevValue: string[]) => favPrevValue.filter(value => value !== oldFavorite)
    );
  }, []);

  return (
    <div>
      <div className="title">
        {props.title ? props.title : 'Star Wars React Ships'}
        {ships.length === 0 && <><br />Loading...</>}
      </div>
      
      <div className="favorite-box-ships">
          <span className="favorite-box-label">Favorites Starships:</span>
          {favShips.map((favorite: string) => 
            <span className="favorite-item" key={favorite}>{favorite}
              <button
                className="remove-favorite-button"
                onClick={() => { removeFromFav(favorite); }}
              >
                <FiTrash2 size="15px" title="Remove from favorites."/>
              </button>
            </span>
          )}
          {favShips.length === 0 && <span> - </span>}
      </div>

      <div className="ships-box">
        {ships.map((p: any) =>
          <div className="ships" key={p.name}>
            {favShips.indexOf(p.name) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFav(p.name); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="ships-attribute">
              <span>name:</span> {p.name}
            </div>
            
            <div className="ships-attribute">
              <span>model:</span> {p.model}
            </div>

            <div className="ships-attribute">
              <span>manufacturer:</span> {p.manufacturer}
            </div>

            <div className="ships-attribute">
              <span>cost_in_credits:</span> {p.cost_in_credits}
            </div>

            <div className="ships-attribute">
              <span>length:</span> {p.length}
            </div>

            <div className="ships-attribute">
              <span>max_atmosphering_speed:</span> {p.max_atmosphering_speed}
            </div>

            <div className="ships-link-list">
              <span><BiPlanet /> Pilots</span>
              {p.pilots.length === 0 && <div>Nothing</div>}
              {p.pilots.map((pilots: any) =>
                <div key={pilots}><a href={pilots}>{pilots}</a></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Starships;