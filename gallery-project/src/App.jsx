import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cards from './components/Cards';

const App = () => {
  const [userData, setUserData]= useState([]);
  const [index,setIndex] =useState(1);

  const getData= async()=>{
    const response=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=10`)
    setUserData(response.data)
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData= <h3 className='text-gray-500 text-lg font-bold absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2'>LOADING...</h3>
  if(userData.length>0){
    printUserData=userData.map(function(elem,idx){
      return <div key={idx}>
        <Cards elem={elem}/>
      </div>
    })
  }


  return (
    <div className="bg-black h-screen overflow-auto p-4 text-white">
      {/* <button 
      onClick={getData}
       className=' bg-green-500  active:scale-95 px-4 py-2 mb-3 rounded-2xl'>get data</button> */}
      <div className="flex h-[82%] flex-wrap gap-5">
        {printUserData}
      </div>
      <div className=" flex justify-center items-center p-4 gap-4">
        <button className='bg-amber-400 text-black text-lg font-semibold rounded px-2 py-1 cursor-pointer active:scale-95 ' 
        onClick={()=>{
          if(index>1){
            setUserData([])
            setIndex(index-1)
          }          
        }}
        >
          Prev
        </button>
        <h4>Page:{index}</h4>
        <button className='bg-amber-400 text-black text-lg font-semibold rounded px-2 py-1 cursor-pointer active:scale-95 '
        onClick={()=>{
          setUserData([])
          setIndex(index+1)
        }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;