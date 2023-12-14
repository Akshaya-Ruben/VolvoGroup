import { useEffect, useState } from 'react';
import { fetchData } from './utils';
import { Beer } from '../../types';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Checkbox, Paper, TextField, Link } from '@mui/material';
import styles from './Home.module.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Home = () => {
  const [beerList, setBeerList] = useState<Array<Beer>>([]);
  const localFavList = localStorage.getItem("items")
  const [favList, setFavList] = useState<Array<Beer>>(() => {
    return localFavList ? JSON.parse(localFavList) : []});


  useEffect(()=>{
    localStorage.setItem("items",JSON.stringify(favList))
  },[favList])

  // eslint-disable-next-line
  const getBeerList = () => {
    fetchData.bind(this, setBeerList)
  }
  useEffect( fetchData.bind(this, setBeerList) , [])
    const addToFav = (beer : Beer) => {
   if(!favList.some((favBeer)=>favBeer.id===beer.id)) {
    setFavList([...favList,beer ])
   }
 
  }  

 const removeAllFav = () => {
setFavList([])
}

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.BeerList}>
               <div className={styles.listHeader}>
                <Button variant='contained' onClick={getBeerList}>Reload list</Button>
              </div> 
              <ul className={styles.list}>
                <div className={styles.beerList}> 
                {beerList.map((beer, index) => (
                  <li key={index.toString()}>
               <div className={styles.BeerContainer}>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                    <span className={styles.fav} onClick={()=>addToFav(beer)}> <FavoriteBorderIcon/></span>
                    </div>
                  </li>
                ))}
                 </div> 
              </ul>
            </div>
          </Paper>

          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Saved items</h3>
                <Button variant='contained' size='small' onClick={removeAllFav}>
                  Remove all items
                </Button>
              </div>
              <ul className={styles.list}>
                {favList.map((beer, index) => (
                  <li key={index.toString()}>
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!favList.length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
