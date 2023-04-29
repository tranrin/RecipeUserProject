import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import styled from 'styled-components';

function Recipe() {
    let params =useParams();
    const [details,setDetails] = useState({});
    const [detailBuocNau, setdetailBuocNau] = useState({});
    const [detailsNL,setDetailsNL] = useState({})
    const [activeTab,setActiveTab] = useState("instructions");
    // const fetchDetails = async () =>{
    //     const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
    //     const detailData = await data.json();
    //     setDetails(detailData) 
    //     console.log('vv',detailData.extendedIngredients)
    // }
    const fetchDetails = async () =>{
        const data = await fetch(`https://localhost:44396/api/GetCongThucByID/GetCongThucByID/${params.name}`)
        const detailData = await data.json();
        console.log('url ->', detailData[0].url)
        setDetails(detailData) 
        console.log('haha',detailData)
    }

    const fetchBuocNau = async () =>{
        const data = await fetch(`https://localhost:44396/api/BuocNau/BuocNauGet/${params.name}`)
        const detailData = await data.json();
        console.log('aaa', detailData)
        setdetailBuocNau(detailData)
    }
    const fetchNguyenLieu = async () =>{
        const data = await fetch(`https://localhost:44396/api/GetNguyenLieuByCongThuc/GetNguyenLieubyCongThuc/${params.name}`)
        const detailData = await data.json();
        console.log('hhh', detailData)
        setDetailsNL(detailData)
    }
    // const fetchCountLike = async () => {
    //     const data = await fetch()
    // }

    useEffect(()=>{
        fetchDetails();
        fetchBuocNau();
        fetchNguyenLieu();
    },[params.name])

    let a = document.getElementById('Chinhga')

    const Tym = () => {
        // if(a.contains('filled')==true)
        // {

        // }
        console.log('aaaa1', a)
        // console.log('aaaa123', a.contains('filled'))


    }

    
  return (
    <DetailWrapper>
        <div >  
            <h2>{details[0]?.tenCongThuc}</h2>
            {/* <img> src={details.}</img> */}
            <div className='DIVimg' style={{position: 'relative'}}>
                <img src={details[0]?.url} 
                style={{
                    position: 'relative',
                    
                    }}/>
                <div className='hide' style={{position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)"}}>
                    <span style={{fontSize: '50px', marginRight: '35px'}} class="material-symbols-outlined">
                        favorite
                    </span>     
                    <span style={{fontSize: '50px'}} class="material-symbols-outlined filled">
                        thumb_up
                    </span>
                </div>
            </div>
            
        </div>
        <Info>
                <Button className={activeTab === 'instructions' ? "active": ""} 
                onClick={()=>{ setActiveTab("instructions") }}>
                    Bước nấu ăn
                </Button>
                <Button className={activeTab === 'ingredients' ? "active" : ""} onClick={()=>{setActiveTab("ingredients")}}
                >
                    Nguyên Liệu
                </Button>
                {activeTab ===  'instructions' && (
                <div>
                {/* <h3 dangerouslySetInnerHTML={{__html: details.summary}} ></h3> */}
                <h3 dangerouslySetInnerHTML={{__html: detailBuocNau[0]?.moTa}} ></h3>
                {/* <h3 dangerouslySetInnerHTML={{__html: details.instructions}} ></h3> */}
                </div>
                )}
                {activeTab === 'ingredients' && (
                       <ul>
                       {detailsNL?.map((ingredient) => {
                         return <li key={ingredient?.id}>{ingredient?.tenNguyenLieu} : {ingredient?.soLuong} {ingredient?.donVi}</li>
})}
                        </ul>
                    )}
              
        </Info>
    </DetailWrapper>
  )
}
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    
    .active{
        background: linear-gradient(35deg,#494949,#313131);
        color: white;
    }
    h2{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
    img{
        max-width: 390px;
       
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    margin-right: 2rem; 
    font-weight: 600;

`
const Info= styled.div`
    margin-left: 5rem;
`
export default Recipe