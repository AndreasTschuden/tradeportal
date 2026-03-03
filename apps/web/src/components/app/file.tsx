"use client"
import { useState } from "react";

const FileInput = () => {

  type errorArray = { message: string, path: [ number, string ] }[]

  const [file, setFile] = useState();

  async function handleChange () {

      // const response = await fetch("/api/create-img-url", {
      //   method: "POST",
      //   body: JSON.stringify([{ name: "zeduardo-gorghetto-CS3WuMvmGfE-unsplash.jpg"/*gotten from db*/, folder: "products" },{ name: "zeduardo-gorghetto-CS3WuMvmGfE-unsplash.jpg", folder: "products" }]),
      //   headers: { "Content-Type": "application/json" },
      // });

      // const data = await response.json()
      // console.log(data)
      // if(data.error){
      // const obj : errorArray = JSON.parse(data.error); 
      // obj.map((err) => {
      //   console.log(err.message, "at place: "+ Number(err.path[0]+1))
      // })
      // }


      const presignedUrl = await fetch("/api/create-upload-img-url", {
        method: "POST",
        body: JSON.stringify([{ name: "1"+file?.name, folder: "products" },{ name: "2"+file?.name, folder: "products" }]),
        headers: { "Content-Type": "application/json" },
      });


      const data = await presignedUrl.json()
      console.log(data)
      if(data.error){
        const obj : errorArray = JSON.parse(data.error); 
        obj.map((err) => {
          console.log(err.message, "at place: "+ Number(err.path[0]+1))
        })
      }else{
        data.map(async (obj: {url: string}) => { //they can also upload other malicious files, but since they need to be a registered company to upload something, we could just threaten to sue
        const response = await fetch(obj.url, {
          method: "PUT",
          body: file, // raw File object
          headers: { "Content-Type": file.type },
        });
        })
      }
      
  }

  return (
  <form action={handleChange}>
  <input type="file" onChange={(event) => setFile(event.target.files?.[0])}/>
  <button type="submit">#</button>
  </form>
  );
};

export default FileInput;