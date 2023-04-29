import{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function Searched() {
    let params = useParams();
    const [searchedRecipes, setSearchedRecipes] = useState({});
    console.log('haha12344',searchedRecipes)
    const getSearched = async(name) =>{
        const data = await fetch(`https://localhost:44396/api/GetCongThucByTen/GetCongThucByTen/${name}`) 
        const recipes = await data.json();
        if(recipes[0].id!= null)

            setSearchedRecipes(recipes)

        console.log('123hah', recipes)
    }
    useEffect(()=>{
        getSearched(params.search)
    },[params.search])
  return (
    <Grid>
        {searchedRecipes?.map((item)=>{
            return(
                <Card key={item.id}>
                      <Link to={'/recipe/' + item?.id}>
                      <img src={item?.url} ></img>
                      <h4>{item?.tenCongThuc}</h4>
                      </Link>

            </Card>
            )

        })}
    </Grid>
  )
}
const Grid = styled.div`
display: Grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;
`;
const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;
}
a{
    text-decoration: none;
}
h4{
    text-align: center;
    padding: 1rem;

}
`


export default Searched