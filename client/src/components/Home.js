import React, { useEffect, useState } from "react";
import axios from 'axios'
function Home() {
  const [url, setUrl] = useState("")
  const [urlHistory, setUrlHistory] = useState()
  
  async function geturls(){
    try {
       const response = await axios.get("https://webscrap-zunj.onrender.com/api/urls",{withCredentials:true})
       setUrlHistory(response.data[0]?.domain)
    } catch (error) {
      alert(error)
    }
}

useEffect(()=>{
geturls()
},[])

  const getInsites = async(e)=>{
    e.preventDefault()
      try {
        const res = await axios.post("https://webscrap-zunj.onrender.com/api/geturlinsights",{url},{withCredentials:true})
        if(res.data?.massage){
          alert(res.data?.massage)
        }
       setUrl("")
       geturls()
       } catch (error) {
         alert(error)
       }
 }

 const handleUpdate = async(id)=>{
     try {
       const res = await axios.put(`https://webscrap-zunj.onrender.com/api/update/${id}`,{},{withCredentials:true})
       if(res.data.massage === "update"){
        geturls()
      }else{
        alert(res.data.massage)
      }
     } catch (error) {
      alert(error)
     }
 }
  
const handleDelete = async(id) =>{
  try {
    const resp = await axios.delete(`https://webscrap-zunj.onrender.com/api/delete/${id}`,{withCredentials:true})
    if(resp.data.massage === "removed"){
      geturls()
    }else{
      alert(resp.data.massage)
    }
    
  } catch (error) {
    alert(error)
  }
}
  return (
    <>
      <div className="container m-auto p-5 w-1/2 my-3">
        <h1 className=" mb-3 font-semibold text-center">Webpage Scraper</h1>

        <form onSubmit={getInsites}>
          <div className="flex justify-between">
            <input
              type={"Text"}
              name="url"
              value={url}
              onChange={e=>setUrl(e.target.value)}
              placeholder={"Enter Website URL"}
              className="py-1 outline-none border-b-2 w-4/5"
            />
            <button
              type={"submit"}
              className="p-2 font-medium bg-gray-500 text-white rounded-sm"
            >
              Get Insights
            </button>
          </div>
        </form>
      </div>
      <div className="container m-auto p-5 w-4/5">
        <table className="table-auto w-full">
          <thead className="bg-gray-500 text-white text-lg">
            <tr className="">
              <th className="p-1">Domain Name</th>
              <th className="p-1">Word Count</th>
              <th className="p-1">Favourite</th>
              <th className="p-1">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              urlHistory? urlHistory.map((url,index)=>{
           
           return <tr className=" border-b border-stone-400 text-stone-500 text-center" key={index}>
              <td className="p-1 text-lg ">
                  {url.name}
              </td>
              <td className="p-1 text-lg">{url.wordCount}</td>
              <td className="p-1 text-lg">{url.favourite}</td>

              <td className="p-1 text-lg">
              <i onClick={()=>handleUpdate(url._id)} className="uil uil-heart px-1 bg-stone-400 text-white mr-4 rounded-sm cursor-pointer"></i>
              <i onClick={()=>handleDelete(url._id)} className="uil uil-trash-alt px-1 bg-stone-400 text-white rounded-sm cursor-pointer"></i>
              </td>
            </tr>
            })
            :
            <tr className="text-center">
              <td></td>
              <td className="pt-5">Thier is no URL history</td>
            </tr>
           }
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Home;
