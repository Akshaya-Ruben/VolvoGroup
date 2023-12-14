import React from 'react'
import styles from './BeerList.module.css'

type posts = {
    totalPages : number
    postsPerPage : number
    currentPage : number
    setCurrentPage : (page : number)=> void
}

const  BeerListPagination = ({totalPages , postsPerPage, currentPage, setCurrentPage} : posts ) => {
 
    let pages = []

    for(let i = 1; i<= Math.ceil(totalPages/postsPerPage); i++ ) {
     pages.push(i)
  }
  return (
    <div className={styles.pagination}>
     { pages.map((page , index)=>{
       return <button key={index} 
       onClick={()=> setCurrentPage(page)}>{page}</button>
     })}
    </div>
  )
}

export default BeerListPagination