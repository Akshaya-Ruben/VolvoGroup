import { useEffect, useState, ChangeEvent } from 'react';
import { Beer } from '../../types';
import { fetchData } from './utils';
import { Avatar, List, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import SportsBar from '@mui/icons-material/SportsBar';
import { useNavigate } from 'react-router-dom';
import styles from "./BeerList.module.css"
import { TextField } from '@mui/material';
import { getBeerList, searchBeerList } from '../../api';
import handle from '../../utils/error';
import BeerListPagination from './BeerListPagination';

const BeerList = () => {
  const navigate = useNavigate();
  const [beerList, setBeerList] = useState<Array<Beer>>([]);

  const [searchField, setSearchField] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(9)

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPosts = beerList.slice(firstPostIndex,lastPostIndex)

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeerList)
    
  , []);

   useEffect(()=>{
    const fetchSearchData =  async() => {
     try {
      if(searchField) {
        const  response = await searchBeerList(searchField)
        setBeerList(response.data)
      }
      else {
        const response = await getBeerList()
        setBeerList(response.data)
      }
     } 
      catch (error)
      {
        handle(error)
      }
    }
    fetchSearchData()
    
   },[searchField])
  
  
   const onSearchChange = (event : ChangeEvent<HTMLInputElement>) : void=> {
  const searchFieldString = event.target.value.toLocaleLowerCase();
  setSearchField(searchFieldString);
   }
  

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);


  return (
    <article>
      <section>
        <header>
          <div className={styles.PageTitle}>Beer List</div>   
        </header>
        <main>
          <div className={styles.filter}>
          <TextField label='Filter...' variant='outlined' onChange={onSearchChange} />
          </div>
          <List>
          <div className={styles.BeerList}>
            {
              beerList && currentPosts.map((beer) => (
                <div className={styles.BeerContainer}>
                <ListItemButton key={beer.id} onClick={onBeerClick.bind(this, beer.id)}>
                  <ListItemText key={beer.id} primary={beer.name} secondary={beer.brewery_type} />
                </ListItemButton>
                   </div>
              ))}
              </div>
          </List>
        <BeerListPagination totalPages ={beerList.length} postsPerPage ={postPerPage} currentPage = {currentPage} setCurrentPage={setCurrentPage} />
        </main>
      </section>
    </article>
  );
};

export default BeerList;
