import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'  //this is prop-type to import prop 
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>{  //this is  class base component 
    
    const [articles, setArticles] = useState([])  
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    


    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    } 


    const updateNews = async ()=> {   //we made a fuction here 
        props.setProgress(10);  //this is for loading bar 
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`; 
        setLoading(true)
        let data = await fetch(url); //we took data from url and wait for data 
        props.setProgress(30);
        let parsedData = await data.json()  //here data will convert into the json 
        props.setProgress(70);
        setArticles(parsedData.articles)  //yha se article set honge kyuki incially to article 0 hai 
        setTotalResults(parsedData.totalResults)   //yha totalResult set honge kyuki incially to total result 0 hai 
        setLoading(false)  
        props.setProgress(100);  //this is for loading bar 
    }


    useEffect(() => {  //useEffect use tab hota hai jab ek cheez update hone se dusre kuch or cheez thek ho
        //jab hm kese v category kolege to category khulne ke sath sath title change ho jayega jo wo category hai whi title hoga 
        document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;  
        updateNews(); //ye updateNews const updateNews wala hai it means ki pahle sab kuchh khali joga jese he open karehe updateNews star ho jayega oor usme jo v hai wooh sab start ho jayega
        //  eslint-disable-next-line
    }, [])

    const fetchMoreData = async () => {   //this is fetchMoreData we are using it for Infinitescroll
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1) 
        let data = await fetch(url);
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
      };
 
        return (
            <>
                <h1 className="text-center" style={{ margin: '35px 0px', marginTop: '90px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
                {loading && <Spinner />}
                <InfiniteScroll   // this is infinete scroll 
                    dataLength={articles.length}  
                    next={fetchMoreData}  
                    hasMore={articles.length !== totalResults}  
                    loader={<Spinner/>}
                > 
                    <div className="container">

                    <div className="row">
                        {articles.map((element) => {

                            return <div className="col-md-4" key={element.url}>   
                            {/* because we have to give a unique key so that why we took {element.url} */}
                                <NewsItem title={element.title ? element.title : ""} //ye isliye hai ager elemnt ka title nahi hai to error na aaye 
                                description={element.description ? element.description : ""} // ye isiye hai ager element ka description null nhi hai to null na aye 
                                imageUrl={element.urlToImage} 
                                newsUrl={element.url} 
                                author={element.author} 
                                date={element.publishedAt} 
                                source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div> 
                </InfiniteScroll>
            </>
        )
    
}



// function base component me default props and propTypes at the end likhte hai  

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

export default News




