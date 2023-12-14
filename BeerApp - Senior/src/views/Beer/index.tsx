import { useEffect, useState } from 'react';
import { Beer as IBeer } from '../../types';
import { fetchData } from './utils';
import { useParams } from 'react-router-dom';
import styles from './Beer.module.css'

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();

  // eslint-disable-next-line
  useEffect(fetchData.bind(this, setBeer, id), [id]);
console.log("beer-",beer)
  return (
    <div className={styles.BeerContainer}> 
    <div >  
       <h2>{beer?.name}</h2>
       <p> Type : {beer?.brewery_type}</p>
       <p> Address : {beer?.address_1}</p>
       <p> State : {beer?.state}</p>
       <p> Country : {beer?.country}</p>
       <p> Phone : {beer?.phone}</p>
       <p> Website : {beer?.website_url}</p>
     </div>          
   </div>
  );
};

export default Beer;
