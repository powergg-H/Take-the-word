import React,{memo} from 'react';
const tipStyle={
     position:"absolute",
     left:0,
     top:0,
     justContent:"center",
     alignItems:"center",
     background:"rgba(0,0,0,.5)",
     color:"#fff",
     zIndex:9999
}
const Tip =memo((props)=>{
    const {content="",position,visible} =props;
    return <div className="tip" style={{...tipStyle,...position,display:visible?'flex':'none'}}>
          {content}
    </div>
})

export default Tip;