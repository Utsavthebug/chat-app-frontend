import React, { useRef } from 'react'
import { CloseIcon } from '../../../../svg'
import { useDispatch } from 'react-redux'
import { addFiles } from '../../../../features/chatSlice'
import { getFileType } from '../../../../utils/file'

const Add = () => {
    const inputRef = useRef(null)
    const dispatch = useDispatch()

    const filesHandler = (e) =>{
        let files = Array.from(e.target.files)

        files.forEach((file)=>{
            if(file.type!=="application/pdf" &&
            file.type!=="text/plain" && 
            file.type!=="application/msword" && 
            file.type!=="application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            file.type!=="application/vnd.openxmlformats-officedocument.presentationml.presentation" &&
            file.type!=="application/vnd.ms-powerpoint" && 
            file.type!=="application/vnd.rar" && 
            file.type!=="application/zip" &&
            file.type!=="audio/mpeg" && 
            file.type!=="audio/wav" &&
            file.type!=="image/png" &&
            file.type!=="image/jpeg" && 
            file.type!=="image/gif" && 
            file.type!=="image/webp" &&
            file.type!=="video/mp4" &&
            file.type!=="video/mpeg" && 
            file.type!=="video/webm"
            ){  
                files = files.filter((item)=> item.name!==file.name)
                return;
            } else if(file.size>1024*1024*10){
                files = files.filter((item)=> item.name!==file.name)
                return
            } else{
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload =(e)=>{
                    dispatch(addFiles({file:file,fileData:getFileType(file.type)==="IMAGE"?e.target.result:'',type:getFileType(file.type) }))
                }
            }
        })
    }
  return (
    <>  
      <div
      onClick={()=>inputRef.current.click()}
      className='w-15 mt-2 h-14 dark:border-white rounded-md items-center justify-center cursor-pointer'>
        <span className='rotate-45'>
            <CloseIcon className={"dark:fill-dark_svg_1"}/>
        </span>
    </div>

    <input type="file" 
    hidden
    multiple
    ref={inputRef}
    accept='application/*,text/plain,image/png,image/jpeg,image/gif,image/webp,video/mp4,video/mpeg,video/webm'
    onChange={filesHandler}
    />
    </>
  
  )
}

export default Add