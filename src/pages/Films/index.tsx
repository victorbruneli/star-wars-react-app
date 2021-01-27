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

import {
  FaRedditAlien
} from  'react-icons/fa';

function Films(props : any) {
  const [films, setFilms] = useState<any>([]);
  const [fav, setFav] = useState<any>([]);

  useEffect(() => {
    axios.get('https://swapi.dev/api/films/').then(response => {
      setFilms(response.data.results);
    })
  }, []);

  const addToFav = useCallback((newFavorite: string) => {
    if (fav.indexOf(newFavorite) < 0) {
      setFav((favoritesPrevValue: string[]) => [ ...favoritesPrevValue, newFavorite ]);
    }
  }, [fav]);

  const removeFromFav = useCallback((oldFavorite: string) => {
    setFav(
      (favPrevValue: string[]) => favPrevValue.filter(value => value !== oldFavorite)
    );
  }, []);

  return (
    <div>
      <div className="title">
        {props.title ? props.title : 'Star Wars React Films'}
        {films.length === 0 && <><br />Loading...</>}
      </div>
      
      <div className="favorite-box-films">
          <span className="favorite-box-label">Favorites Films:</span>
          {fav.map((favorite: string) => 
            <span className="favorite-item" key={favorite}>{favorite}
              <button
                className="remove-favorite-button"
                onClick={() => { removeFromFav(favorite); }}
              >
                <FiTrash2 size="15px" title="Remove from favorites."/>
              </button>
            </span>
          )}
          {fav.length === 0 && <span> - </span>}
      </div>

      <div className="films-box">
        {films.map((p: any) =>
          <div className="films" key={p.title}>
            {fav.indexOf(p.title) < 0 &&
              <button
                className="favorite-button"
                type="button"
                onClick={() => { addToFav(p.title); }}
              >
                <FiStar></FiStar>
              </button>
            }

            <div className="people-attribute">
              <span>Title:</span> {p.title}
            </div>
            
            <div className="people-attribute">
              <span>episode_id:</span> {p.episode_id}
            </div>

            <div className="people-attribute">
              <span>opening_crawl:</span> {p.opening_crawl}
            </div>

            <div className="people-attribute">
              <span>director:</span> {p.director}
            </div>

            <div className="people-attribute">
              <span>producer:</span> {p.producer}
            </div>

            <div className="people-attribute">
              <span>release_date:</span> {p.release_date}
            </div>

            <div className="people-link-list">
              <span><BiPlanet /> Planets</span>
              {p.planets.length === 0 && <div>Nothing</div>}
              {p.planets.map((planet: any) =>
                <div key={planet}><a href={planet}>{planet}</a></div>
              )}
            </div>
            <div className="people-link-list">
              <span><FaRedditAlien/> Starships</span>
              {p.starships.length === 0 && <div>Nothing</div>}
              {p.starships.map((starship: any) =>
                <div key={starship}><a href={starship}>{starship}</a></div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Films;